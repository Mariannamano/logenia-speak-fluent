
import { useState } from "react";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { useRecordingTimer } from "@/hooks/use-recording-timer";
import { useRealtimeFeedback } from "@/hooks/use-realtime-feedback";
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
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);

  // Speech recognition hook
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

  // Audio recorder hook
  const { 
    isRecording, 
    isLoading, 
    startRecording: startAudioRecording, 
    stopRecording: stopAudioRecording 
  } = useAudioRecorder({
    onRecordingComplete: (audioBlob) => {
      if (onRecordingComplete) {
        onRecordingComplete(audioBlob, transcript);
      }
    }
  });

  // Timer hook
  const { 
    elapsedTime, 
    progress, 
    resetTimer 
  } = useRecordingTimer({
    isActive: isListening,
    maxDuration,
    onTimerComplete: handleStopRecording
  });

  // Feedback hook
  const { resetFeedback } = useRealtimeFeedback({
    isActive: isListening && enableRealtimeFeedback,
    transcript,
    onFeedbackUpdate
  });

  // Handlers
  async function handleStartRecording() {
    resetTranscript();
    resetFeedback();
    resetTimer();
    setAudioChunks([]);
    
    const audioStarted = await startAudioRecording();
    
    if (audioStarted) {
      // Start speech recognition
      const speechStarted = startListening();
      if (speechStarted) {
        toast({
          title: "Recording started",
          description: "Speak clearly and we'll analyze your speech with AI."
        });
      }
    }
  }

  function handleStopRecording() {
    stopAudioRecording();
    stopListening();
    resetFeedback();
    
    toast({
      title: "Recording completed",
      description: "Your speech will now be analyzed with OpenAI."
    });
  }

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
