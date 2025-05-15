
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Mic, Square, ArrowRight, Loader2 } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { getRealtimeFeedback } from "@/services/coachingService";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

interface RecordingControlProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
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
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const feedbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedTextRef = useRef<string>("");

  // Use our custom speech recognition hook
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
      }, 3000); // Process every 3 seconds
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
          onRecordingComplete(audioBlob);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          {isListening ? 'Listening for filler words...' : 'Ready to detect filler words'}
        </div>
        <div className="text-sm">
          {formatTime(elapsedTime)} / {formatTime(maxDuration)}
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-center gap-4">
        {!isListening ? (
          <Button 
            onClick={handleStartRecording} 
            disabled={isLoading}
            size="lg"
            className="bg-logenia-500 hover:bg-logenia-600 px-8"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Mic className="h-5 w-5 mr-2" />
            )}
            Start Speaking
          </Button>
        ) : (
          <>
            <Button 
              onClick={handleStopRecording}
              variant="destructive"
              size="lg"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
            <Button 
              onClick={handleStopRecording} 
              size="lg"
              className="bg-logenia-500 hover:bg-logenia-600"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Complete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecordingControl;
