
import { useState, useEffect, useRef } from "react";

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
  const requestIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  
  // Use requestAnimationFrame for smoother timer updates
  useEffect(() => {
    if (!isActive) {
      // Reset timer when not active
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
        requestIdRef.current = null;
      }
      setElapsedTime(0);
      setProgress(0);
      startTimeRef.current = null;
      lastUpdateTimeRef.current = 0;
      return;
    }
    
    // Initialize start time
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
      lastUpdateTimeRef.current = performance.now();
    }
    
    // Animation frame callback with throttling for smoother updates
    const updateTimer = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        lastUpdateTimeRef.current = timestamp;
      }
      
      const elapsedMs = timestamp - startTimeRef.current;
      const elapsedSeconds = Math.floor(elapsedMs / 1000);
      
      // Update UI only when the value changes or every 100ms for smoother updates
      if (elapsedSeconds !== Math.floor((lastUpdateTimeRef.current - startTimeRef.current) / 1000) || 
          timestamp - lastUpdateTimeRef.current > 100) {
        
        setElapsedTime(elapsedSeconds);
        setProgress((elapsedSeconds / maxDuration) * 100);
        lastUpdateTimeRef.current = timestamp;
        
        if (elapsedSeconds >= maxDuration && onTimerComplete) {
          onTimerComplete();
          return; // Stop the loop
        }
      }
      
      // Continue the animation loop
      requestIdRef.current = requestAnimationFrame(updateTimer);
    };
    
    // Start the animation loop
    requestIdRef.current = requestAnimationFrame(updateTimer);
    
    // Clean up on unmount or when isActive changes
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [isActive, maxDuration, onTimerComplete]);

  const resetTimer = () => {
    if (requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current);
      requestIdRef.current = null;
    }
    setElapsedTime(0);
    setProgress(0);
    startTimeRef.current = null;
    lastUpdateTimeRef.current = 0;
  };

  return {
    elapsedTime,
    progress,
    resetTimer
  };
}
