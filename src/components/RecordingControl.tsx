
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Mic, Square, ArrowRight, Loader2 } from "lucide-react";
import { setupSpeechRecognition, getRealtimeFeedback } from "@/services/coachingService";

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
  enableRealtimeFeedback = false
}: RecordingControlProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const feedbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedTextRef = useRef<string>("");

  // Track WebSpeech recognition session
  useEffect(() => {
    if (isRecording && enableRealtimeFeedback) {
      recognitionRef.current = setupSpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          
          const currentTranscript = finalTranscript + ' ' + interimTranscript;
          setTranscript(prevTranscript => prevTranscript + ' ' + finalTranscript);
          
          if (onTranscriptUpdate) {
            onTranscriptUpdate(currentTranscript);
          }
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          toast.error("Speech recognition error. Please try again.");
        };
        
        recognitionRef.current.start();
        
        // Set up interval to process feedback every 5 seconds
        feedbackIntervalRef.current = setInterval(async () => {
          // Only process if we have new content
          if (transcript && transcript !== lastProcessedTextRef.current) {
            const newContent = transcript.substring(lastProcessedTextRef.current.length).trim();
            if (newContent.split(' ').length > 5) { // Only process if we have enough new words
              const feedback = await getRealtimeFeedback(newContent);
              lastProcessedTextRef.current = transcript;
              
              if (onFeedbackUpdate && feedback.length > 0) {
                onFeedbackUpdate(feedback);
              }
            }
          }
        }, 5000); // Process every 5 seconds
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (feedbackIntervalRef.current) {
        clearInterval(feedbackIntervalRef.current);
      }
    };
  }, [isRecording, enableRealtimeFeedback, onTranscriptUpdate, onFeedbackUpdate, transcript]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          setProgress((newTime / maxDuration) * 100);
          
          if (newTime >= maxDuration) {
            stopRecording();
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRecording, isPaused, maxDuration]);

  const startRecording = async () => {
    setIsLoading(true);
    setTranscript("");
    lastProcessedTextRef.current = "";
    
    try {
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
      setIsRecording(true);
      setAudioChunks([]);
      setElapsedTime(0);
      setProgress(0);
      toast.success("Recording started");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone. Please check permissions.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      
      // Stop speech recognition if active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Clear feedback interval
      if (feedbackIntervalRef.current) {
        clearInterval(feedbackIntervalRef.current);
      }
      
      setIsRecording(false);
      setIsPaused(false);
      toast.success("Recording completed!");
    }
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
          {isRecording ? 'Recording in progress' : 'Ready to record'}
        </div>
        <div className="text-sm">
          {formatTime(elapsedTime)} / {formatTime(maxDuration)}
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-center gap-4">
        {!isRecording ? (
          <Button 
            onClick={startRecording} 
            disabled={isLoading}
            size="lg"
            className="bg-logenia-500 hover:bg-logenia-600 px-8"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Mic className="h-5 w-5 mr-2" />
            )}
            Start Recording
          </Button>
        ) : (
          <>
            <Button 
              onClick={stopRecording}
              variant="destructive"
              size="lg"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
            <Button 
              onClick={stopRecording} 
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
