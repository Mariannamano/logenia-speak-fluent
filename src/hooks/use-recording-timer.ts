
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
      return;
    }
    
    // Initialize start time
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }
    
    // Animation frame callback
    const updateTimer = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsedMs = timestamp - startTimeRef.current;
      const elapsedSeconds = Math.floor(elapsedMs / 1000);
      
      setElapsedTime(elapsedSeconds);
      setProgress((elapsedSeconds / maxDuration) * 100);
      
      if (elapsedSeconds >= maxDuration && onTimerComplete) {
        onTimerComplete();
        return; // Stop the loop
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
  };

  return {
    elapsedTime,
    progress,
    resetTimer
  };
}
