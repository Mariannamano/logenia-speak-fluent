
import { useState, useEffect } from "react";

interface UseRecordingTimerProps {
  isActive: boolean;
  maxDuration: number;
  onTimerComplete?: () => void;
}

export function useRecordingTimer({
  isActive,
  maxDuration,
  onTimerComplete
}: UseRecordingTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);

  // Track recording time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          setProgress((newTime / maxDuration) * 100);
          
          if (newTime >= maxDuration && onTimerComplete) {
            onTimerComplete();
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      setElapsedTime(0);
      setProgress(0);
    }
    
    return () => clearInterval(interval);
  }, [isActive, maxDuration, onTimerComplete]);

  const resetTimer = () => {
    setElapsedTime(0);
    setProgress(0);
  };

  return {
    elapsedTime,
    progress,
    resetTimer
  };
}
