
import ProgressBar from "./recording/ProgressBar";
import RecordingButtons from "./recording/RecordingButtons";
import { useRecording } from "@/hooks/use-recording";

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
      if (onRecordingComplete) {
        onRecordingComplete(audioBlob, transcript);
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
