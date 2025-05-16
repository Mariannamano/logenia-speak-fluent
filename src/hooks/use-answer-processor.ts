import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AnswerAnalysis {
  transcript: string;
  feedback: {
    fillerWords: { word: string; count: number }[];
    clarity: number;
    pace: string;
    structure: number;
    suggestions: string[];
    summary: string;
  };
}

interface UseAnswerProcessorOptions {
  onTranscriptComplete?: (transcript: string) => void;
  onAnalysisComplete?: (analysis: AnswerAnalysis) => void;
  onError?: (error: Error) => void;
}

export function useAnswerProcessor({
  onTranscriptComplete,
  onAnalysisComplete,
  onError
}: UseAnswerProcessorOptions = {}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState<AnswerAnalysis | null>(null);
  const [currentStep, setCurrentStep] = useState<"idle" | "transcribing" | "analyzing" | "complete" | "error">("idle");

  // Convert blob to base64
  const blobToBase64 = useCallback((blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert blob to base64"));
        }
      };
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsDataURL(blob);
    });
  }, []);

  // Process audio through Whisper API via Supabase Edge Function
  const transcribeAudio = useCallback(async (audioBlob: Blob): Promise<string> => {
    try {
      console.log("Converting audio blob to base64, size:", audioBlob.size, "type:", audioBlob.type);
      const audioBase64 = await blobToBase64(audioBlob);
      
      if (!audioBase64 || audioBase64.length < 100) {
        throw new Error("Invalid audio data");
      }
      
      // Call the Supabase Edge Function for transcription
      const functionUrl = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1/generate-ai-summary';
      console.log("Calling transcription function:", functionUrl);
      
      // Use Supabase Function invoke if using client, or direct fetch if in Edge Function
      const { data, error } = await supabase.functions.invoke("generate-ai-summary", {
        body: { 
          audioData: audioBase64,
          transcript: "" // Initial empty transcript (Whisper will generate one)
        }
      });
      
      if (error) {
        console.error("Transcription function error:", error);
        throw new Error(`Transcription failed: ${error.message}`);
      }
      
      if (!data || !data.transcript) {
        throw new Error("No transcript returned from transcription service");
      }
      
      console.log("Transcription complete:", data.transcript.substring(0, 50) + "...");
      return data.transcript;
    } catch (error) {
      console.error("Error transcribing audio:", error);
      throw error;
    }
  }, [blobToBase64]);

  // Process the complete answer pipeline
  const processAnswer = useCallback(async (audioBlob: Blob, initialTranscript: string = ""): Promise<AnswerAnalysis | null> => {
    setIsProcessing(true);
    setCurrentStep("transcribing");
    
    try {
      // Start with any initial transcript (e.g. from browser's speech recognition)
      let finalTranscript = initialTranscript;
      
      // If we have audio data and it's valid, transcribe it
      if (audioBlob && audioBlob.size > 0) {
        try {
          // Use Whisper API for better transcription
          finalTranscript = await transcribeAudio(audioBlob);
          setTranscript(finalTranscript);
          
          // Notify of transcript completion
          if (onTranscriptComplete) {
            onTranscriptComplete(finalTranscript);
          }
        } catch (transcriptError) {
          console.error("Transcription error:", transcriptError);
          
          // If Whisper failed but we have an initial transcript, use that as a fallback
          if (!finalTranscript) {
            throw transcriptError; // No usable transcript at all
          }
          
          // Otherwise continue with the initial transcript
          toast({
            title: "Transcription Issue",
            description: "Using basic transcript as fallback. Quality may be reduced.",
            variant: "destructive"
          });
        }
      } else if (!finalTranscript) {
        throw new Error("No audio or transcript provided");
      }
      
      // Move to analysis step
      setCurrentStep("analyzing");
      
      // Get the analysis data from the Edge Function
      // Note: We're reusing the generate-ai-summary function which returns both transcript and feedback
      const { data, error } = await supabase.functions.invoke("generate-ai-summary", {
        body: { 
          transcript: finalTranscript,
          // We're sending an empty audioData since we already have the transcript
          audioData: "" 
        }
      });
      
      if (error) {
        console.error("Analysis function error:", error);
        throw new Error(`Analysis failed: ${error.message}`);
      }
      
      if (!data || !data.feedback) {
        throw new Error("No analysis data returned");
      }
      
      // Store and return the complete analysis
      const completeAnalysis: AnswerAnalysis = {
        transcript: finalTranscript,
        feedback: data.feedback
      };
      
      setAnalysis(completeAnalysis);
      setCurrentStep("complete");
      
      // Notify of analysis completion
      if (onAnalysisComplete) {
        onAnalysisComplete(completeAnalysis);
      }
      
      return completeAnalysis;
    } catch (error) {
      console.error("Error in answer processing pipeline:", error);
      setCurrentStep("error");
      
      if (onError && error instanceof Error) {
        onError(error);
      }
      
      toast({
        title: "Processing Error",
        description: error instanceof Error ? error.message : "Unknown error processing your answer",
        variant: "destructive"
      });
      
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [transcribeAudio, onTranscriptComplete, onAnalysisComplete, onError]);

  // Reset the processor state
  const reset = useCallback(() => {
    setIsProcessing(false);
    setTranscript("");
    setAnalysis(null);
    setCurrentStep("idle");
  }, []);

  return {
    isProcessing,
    currentStep,
    transcript,
    analysis,
    processAnswer,
    reset
  };
}
