
import axios from 'axios';

// Using Vite's import.meta.env instead of process.env
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000';

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

// This function would normally call an API, but for now we'll implement filler word detection locally
export async function getRealtimeFeedback(text: string): Promise<FeedbackItem[]> {
  try {
    // For demo purposes, we're detecting filler words locally
    // In a production app, this would call your backend API
    const fillerWords = ["um", "uh", "like", "you know", "sort of", "kind of", "basically", "actually", "literally", "so", "well", "I mean"];
    const feedback: FeedbackItem[] = [];
    
    // Convert text to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase();
    
    // Check for filler words
    fillerWords.forEach(word => {
      if (lowerText.includes(word)) {
        feedback.push({
          type: "filler",
          content: `You used the filler word "${word}". Try to be more confident in your speech.`
        });
      }
    });
    
    // Add a follow-up suggestion if we found filler words
    if (feedback.length > 0) {
      feedback.push({
        type: "followup",
        content: "Try pausing instead of using filler words. Silence is better than fillers."
      });
    }
    
    return feedback;
  } catch (error) {
    console.error("Error fetching real-time feedback:", error);
    return [];
  }
}

export function setupSpeechRecognition(): SpeechRecognition | null {
  if (!('webkitSpeechRecognition' in window)) {
    console.error('Speech Recognition is not supported in this browser.');
    return null;
  }

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  return recognition;
}
