
import { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { getRealtimeFeedback } from "@/services/coachingService";
import { toast } from "@/hooks/use-toast";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

interface UseRecordingProps {
  maxDuration?: number;
  onTranscriptUpdate?: (transcript: string) => void;
  onFeedbackUpdate?: (feedback: FeedbackItem[]) => void;
  onRecordingComplete?: (audioBlob: Blob, transcript: string) => void;
  enableRealtimeFeedback?: boolean;
}

export function useRecording({
  maxDuration = 60,
  onTranscriptUpdate,
  onFeedbackUpdate,
  onRecordingComplete,
  enableRealtimeFeedback = true
}: UseRecordingProps = {}) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const feedbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedTextRef = useRef<string>("");

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    onTranscriptChange: (newTranscript) => {
      if (onTranscriptUpdate) {
        onTranscriptUpdate(newTranscript);
      }
    }
  });

  // Process feedback at intervals when recording
  useEffect(() => {
    if (isListening && enableRealtimeFeedback) {
      // Set up interval to process feedback every 3 seconds
      feedbackIntervalRef.current = setInterval(async () => {
        // Only process if we have new content
        if (transcript && transcript !== lastProcessedTextRef.current) {
          const newContent = transcript.substring(lastProcessedTextRef.current.length).trim();
          if (newContent.split(' ').length > 3) { // Only process if we have enough new words
            const feedback = await getRealtimeFeedback(newContent);
            lastProcessedTextRef.current = transcript;
            
            if (onFeedbackUpdate && feedback.length > 0) {
              onFeedbackUpdate(feedback);
            }
          }
        }
      }, 3000);
    }
    
    return () => {
      if (feedbackIntervalRef.current) {
        clearInterval(feedbackIntervalRef.current);
      }
    };
  }, [isListening, enableRealtimeFeedback, onFeedbackUpdate, transcript]);

  // Track recording time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isListening) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          setProgress((newTime / maxDuration) * 100);
          
          if (newTime >= maxDuration) {
            handleStopRecording();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isListening, maxDuration]);

  const handleStartRecording = async () => {
    setIsLoading(true);
    resetTranscript();
    lastProcessedTextRef.current = "";
    
    try {
      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        setAudioChunks(chunks => [...chunks, event.data]);
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob, transcript);
        }
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks([]);
      setElapsedTime(0);
      setProgress(0);
      
      // Start speech recognition
      const started = startListening();
      if (started) {
        toast({
          title: "Recording started",
          description: "Speak clearly and we'll detect any filler words you use."
        });
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    
    stopListening();
    
    // Clear feedback interval
    if (feedbackIntervalRef.current) {
      clearInterval(feedbackIntervalRef.current);
    }
    
    toast({
      title: "Recording completed",
      description: "Your speech has been analyzed for filler words."
    });
  };

  return {
    transcript,
    isListening,
    progress,
    elapsedTime,
    isLoading,
    handleStartRecording,
    handleStopRecording
  };
}
