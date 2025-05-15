
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

// Improved function to analyze recording with OpenAI Whisper and GPT-4o
export async function analyzeRecording(
  audioBlob: Blob,
  transcript: string
): Promise<{ transcript: string; feedback: SpeechAnalysis }> {
  try {
    console.log("AnalyzeRecording called with audioBlob size:", audioBlob.size, "type:", audioBlob.type, "and transcript:", transcript);
    
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error("Empty audio recording");
    }
    
    // Validate transcript
    if (!transcript || transcript.trim().length < 10) {
      console.error("Transcript is too short or empty:", transcript);
      // Continue anyway since we might get a better transcript from Whisper
    }
    
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
      console.warn("Invalid audio data");
      throw new Error("Invalid audio data");
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
    
    if (!response.data) {
      throw new Error("No response from analysis function");
    }
    
    // If we got an error in the response
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    return response.data;
  } catch (error) {
    console.error("Error analyzing recording:", error);
    throw error;
  }
}
