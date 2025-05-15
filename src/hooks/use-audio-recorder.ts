
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";

interface UseAudioRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  mimeType?: string;
}

export function useAudioRecorder({
  onRecordingComplete,
  mimeType: preferredMimeType,
}: UseAudioRecorderProps = {}) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async (): Promise<boolean> => {
    setIsLoading(true);
    audioChunksRef.current = [];
    
    try {
      // Start audio recording with OPTIMAL settings for best Whisper transcription results
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1, // Mono for better speech recognition
          sampleRate: 44100, // Higher sample rate for quality
        } 
      });
      
      // Use webm format with opus codec which works well with Whisper
      const mimeType = preferredMimeType || (MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus' 
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4');
      
      console.log(`Using MIME type: ${mimeType} for recording`);
      
      const recorder = new MediaRecorder(stream, { 
        mimeType,
        audioBitsPerSecond: 128000 // 128 kbps for good audio quality
      });
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("Recorded audio chunk of size:", event.data.size, "type:", event.data.type);
          audioChunksRef.current.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log("Recording stopped, chunks:", audioChunksRef.current.length, "blob size:", audioBlob.size, "type:", audioBlob.type);
        
        if (onRecordingComplete && audioBlob.size > 0) {
          onRecordingComplete(audioBlob);
        } else if (audioBlob.size === 0) {
          toast({
            title: "Recording Error",
            description: "No audio was recorded. Please check your microphone and try again.",
            variant: "destructive"
          });
        }
        
        setIsRecording(false);
      };
      
      // Request data every 500ms for more frequent chunks
      recorder.start(500);
      setMediaRecorder(recorder);
      setIsRecording(true);
      return true;
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    
    setIsRecording(false);
  };

  return {
    isRecording,
    isLoading,
    startRecording,
    stopRecording
  };
}
