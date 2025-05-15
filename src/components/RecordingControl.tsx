
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Mic, Square, ArrowRight, Loader2 } from "lucide-react";

interface RecordingControlProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  maxDuration?: number; // in seconds
}

const RecordingControl = ({ 
  onRecordingComplete, 
  maxDuration = 60 
}: RecordingControlProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
