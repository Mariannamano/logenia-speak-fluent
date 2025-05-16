
import { useRef, useEffect } from "react";
import { getRealtimeFeedback } from "@/services/coachingService";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

interface UseRealtimeFeedbackProps {
  isActive: boolean;
  transcript: string;
  onFeedbackUpdate?: (feedback: FeedbackItem[]) => void;
}

export function useRealtimeFeedback({
  isActive,
  transcript,
  onFeedbackUpdate
}: UseRealtimeFeedbackProps) {
  const feedbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedTextRef = useRef<string>("");
  
  // Process feedback at intervals when recording
  useEffect(() => {
    if (isActive) {
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
      }, 3000);
    }
    
    return () => {
      if (feedbackIntervalRef.current) {
        clearInterval(feedbackIntervalRef.current);
      }
    };
  }, [isActive, onFeedbackUpdate, transcript]);

  const resetFeedback = () => {
    lastProcessedTextRef.current = "";
    if (feedbackIntervalRef.current) {
      clearInterval(feedbackIntervalRef.current);
      feedbackIntervalRef.current = null;
    }
  };

  return {
    resetFeedback
  };
}
