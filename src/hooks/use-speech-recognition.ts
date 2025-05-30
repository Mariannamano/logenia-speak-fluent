
import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseSpeechRecognitionProps {
  onTranscriptChange?: (transcript: string) => void;
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
}

export function useSpeechRecognition({
  onTranscriptChange,
  continuous = true,
  interimResults = true,
  lang = 'en-US'
}: UseSpeechRecognitionProps = {}) {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser.');
      toast({
        title: "Error",
        description: 'Speech recognition is not supported in your browser.',
        variant: "destructive"
      });
      return false;
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    try {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.interimResults = interimResults;
      recognitionRef.current.lang = lang;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(event.error);
        setIsListening(false);
      };
      
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
        
        const currentTranscript = transcript + ' ' + finalTranscript;
        setTranscript(currentTranscript);
        
        if (onTranscriptChange) {
          onTranscriptChange(currentTranscript + ' ' + interimTranscript);
        }
      };
      
      recognitionRef.current.start();
      return true;
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError('Error starting speech recognition');
      toast({
        title: "Error",
        description: 'Error starting speech recognition',
        variant: "destructive"
      });
      return false;
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  const resetTranscript = () => {
    setTranscript('');
  };
  
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}
