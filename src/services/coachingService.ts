
import axios from 'axios';

// Using Vite's import.meta.env instead of process.env
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000';

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

// Speech analysis feedback from AI
export interface SpeechAnalysis {
  fillerWords: { word: string; count: number }[];
  clarity: number;
  pace: string; // "too slow", "good", or "too fast"
  structure: number;
  suggestions: string[];
  summary: string;
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

// Improved function to analyze recording with AI
export async function analyzeRecording(
  audioBlob: Blob,
  transcript: string
): Promise<{ transcript: string; feedback: SpeechAnalysis }> {
  try {
    console.log("AnalyzeRecording called with audioBlob size:", audioBlob.size, "type:", audioBlob.type, "and transcript:", transcript);
    
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error("Empty audio recording");
    }
    
    // Create a mock feedback if we can't process the audio
    // This is a fallback in case the server analysis fails
    const createMockFeedback = (): SpeechAnalysis => {
      // Extract potential filler words from transcript
      const fillerWords = ["um", "uh", "like", "you know", "sort of", "kind of", "basically", "actually", "literally"];
      const fillerCounts: {word: string; count: number}[] = [];
      
      fillerWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = transcript.match(regex);
        if (matches && matches.length > 0) {
          fillerCounts.push({ word, count: matches.length });
        }
      });
      
      return {
        fillerWords: fillerCounts,
        clarity: 65, // Default moderate clarity
        pace: "good",
        structure: 70,
        suggestions: [
          "Try to reduce filler words by pausing instead.",
          "Practice speaking more slowly and deliberately to improve clarity."
        ],
        summary: "Analysis was completed based on transcript only. You used some filler words that could be reduced. Keep practicing your speaking skills!"
      };
    };
    
    // Convert blob to base64 with improved error handling
    const audioBase64Promise = new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert audio to base64"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("FileReader error"));
      };
      
      reader.readAsDataURL(audioBlob);
    });
    
    const audioBase64 = await audioBase64Promise;
    console.log("Converted audio to base64, length:", audioBase64.length);
    
    if (!audioBase64 || audioBase64.length < 100) {
      console.warn("Invalid audio data, using mock feedback");
      return {
        transcript,
        feedback: createMockFeedback()
      };
    }
    
    // Call the Supabase Edge Function
    const functionUrl = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1/generate-ai-summary';
    console.log("Calling Supabase function at:", functionUrl);
    
    const response = await axios.post(functionUrl, {
      audioData: audioBase64,
      transcript
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000 // 60 second timeout for long processing
    });
    
    console.log("Response from Supabase function:", response.data);
    
    if (!response.data || !response.data.feedback) {
      console.warn("Invalid response from Supabase function, using mock feedback");
      return {
        transcript,
        feedback: createMockFeedback()
      };
    }
    
    return response.data;
  } catch (error) {
    console.error("Error analyzing recording:", error);
    
    // Provide more specific error information to help debugging
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);
    
    // Generate mock feedback based on transcript as fallback
    const mockFeedback = {
      fillerWords: [],
      clarity: 50,
      pace: "good", 
      structure: 50,
      suggestions: [
        "We could only analyze the basic transcript.", 
        "Try speaking clearly and directly into the microphone."
      ],
      summary: `We analyzed your basic transcript. Try speaking more clearly next time.`
    };
    
    // Return the mock feedback with the transcript
    return {
      transcript,
      feedback: mockFeedback
    };
  }
}
