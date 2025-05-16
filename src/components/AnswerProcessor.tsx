
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RecordingControl from "@/components/RecordingControl";
import { useAnswerProcessor } from "@/hooks/use-answer-processor";
import { toast } from "@/hooks/use-toast";
import FeedbackPanel from "@/components/FeedbackPanel";
import TranscriptDisplay from "@/components/practice/TranscriptDisplay";

const AnswerProcessor = () => {
  const [transcript, setTranscript] = useState("");
  const [hasRecording, setHasRecording] = useState(false);
  
  const { 
    isProcessing, 
    currentStep,
    analysis,
    processAnswer,
    reset
  } = useAnswerProcessor({
    onTranscriptComplete: (newTranscript) => {
      setTranscript(newTranscript);
      toast({
        title: "Transcription Complete",
        description: "Now analyzing your response..."
      });
    },
    onAnalysisComplete: () => {
      toast({
        title: "Analysis Complete",
        description: "Your feedback is ready to review."
      });
    },
    onError: (error) => {
      console.error("Answer processing error:", error);
    }
  });

  const handleRecordingComplete = async (audioBlob: Blob, initialTranscript: string) => {
    setHasRecording(true);
    setTranscript(initialTranscript);
    
    // Process the recording through the pipeline
    await processAnswer(audioBlob, initialTranscript);
  };

  const handleReset = () => {
    reset();
    setTranscript("");
    setHasRecording(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Record Your Answer</CardTitle>
          <CardDescription>
            Speak your answer clearly. We'll analyze it and provide feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecordingControl 
            onRecordingComplete={handleRecordingComplete}
            maxDuration={120}
          />
          
          {currentStep !== "idle" && (
            <div className="mt-4">
              <p className="text-sm font-medium">
                Status: {currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
                {isProcessing && 
                  <span className="ml-2 inline-block animate-pulse">
                    ...
                  </span>
                }
              </p>
            </div>
          )}
          
          {hasRecording && transcript && (
            <div className="mt-4">
              <Button onClick={handleReset} variant="outline" size="sm">
                Reset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {hasRecording && transcript && (
        <TranscriptDisplay 
          transcript={transcript} 
          hasRecording={true} 
        />
      )}
      
      {analysis && (
        <FeedbackPanel 
          analysis={analysis.feedback} 
          isLoading={false} 
        />
      )}
    </div>
  );
};

export default AnswerProcessor;
