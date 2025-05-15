
import ProgressBar from "./recording/ProgressBar";
import RecordingButtons from "./recording/RecordingButtons";
import { useRecording } from "@/hooks/use-recording";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

interface RecordingControlProps {
  onRecordingComplete?: (audioBlob: Blob, transcript: string) => void;
  maxDuration?: number; // in seconds
  onTranscriptUpdate?: (transcript: string) => void;
  onFeedbackUpdate?: (feedback: FeedbackItem[]) => void;
  enableRealtimeFeedback?: boolean;
}

const RecordingControl = ({ 
  onRecordingComplete, 
  maxDuration = 60,
  onTranscriptUpdate,
  onFeedbackUpdate,
  enableRealtimeFeedback = true
}: RecordingControlProps) => {
  // Check for browser compatibility
  useEffect(() => {
    // Check if audio recording is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Browser Compatibility Issue",
        description: "Your browser doesn't support audio recording. Please use Chrome, Edge, or Safari.",
        variant: "destructive"
      });
    }
  }, []);

  // Use our custom recording hook
  const {
    transcript,
    isListening,
    progress,
    elapsedTime,
    isLoading,
    handleStartRecording,
    handleStopRecording
  } = useRecording({
    maxDuration,
    onTranscriptUpdate,
    onFeedbackUpdate,
    onRecordingComplete: (audioBlob: Blob, transcript: string) => {
      console.log("RecordingControl - Recording complete, audioBlob size:", audioBlob.size, "type:", audioBlob.type);
      if (onRecordingComplete) {
        if (audioBlob.size > 0) {
          toast({
            title: "Processing recording",
            description: "Analyzing your speech with AI...",
          });
          onRecordingComplete(audioBlob, transcript);
        } else {
          toast({
            title: "Recording Error",
            description: "No audio was recorded. Please check your microphone and try again.",
            variant: "destructive"
          });
        }
      }
    },
    enableRealtimeFeedback
  });

  return (
    <div className="flex flex-col gap-4">
      <ProgressBar 
        progress={progress} 
        elapsedTime={elapsedTime} 
        maxDuration={maxDuration} 
      />
      
      <RecordingButtons 
        isRecording={isListening} 
        isLoading={isLoading} 
        onStartRecording={handleStartRecording} 
        onStopRecording={handleStopRecording} 
      />
    </div>
  );
};

export default RecordingControl;
