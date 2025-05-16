
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

// Improved function to analyze recording with cultural context
export async function analyzeRecording(
  audioBlob: Blob,
  transcript: string,
  culturalContext: string = "united-states"
): Promise<{ transcript: string; feedback: SpeechAnalysis }> {
  try {
    console.log("AnalyzeRecording called with audioBlob size:", audioBlob.size, "type:", audioBlob.type, "transcript:", transcript, "and cultural context:", culturalContext);
    
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error("Empty audio recording");
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
    
    // Step 1: Call the transcription function to get better transcript
    let finalTranscript = transcript;
    try {
      const transcriptionUrl = "https://jzizfplvrpnzuucurwlw.functions.supabase.co/transcribe-audio";
      console.log("Calling transcription function at:", transcriptionUrl);
      
      const transcriptionResponse = await axios.post(transcriptionUrl, {
        audioData: audioBase64
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout for transcription
      });
      
      if (transcriptionResponse.data && transcriptionResponse.data.transcript) {
        finalTranscript = transcriptionResponse.data.transcript;
        console.log("Got improved transcript:", finalTranscript.substring(0, 100) + "...");
      }
    } catch (transcriptionError) {
      console.error("Transcription error:", transcriptionError);
      // Continue with the browser transcript if Whisper fails
    }
    
    // Step 2: Call the feedback function with the best transcript we have and cultural context
    const feedbackUrl = "https://jzizfplvrpnzuucurwlw.functions.supabase.co/generate-feedback";
    console.log("Calling feedback function at:", feedbackUrl, "with cultural context:", culturalContext);
    
    const feedbackResponse = await axios.post(feedbackUrl, {
      transcript: finalTranscript,
      culturalContext: culturalContext
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout for analysis
    });
    
    console.log("Response from feedback function:", feedbackResponse.data);
    
    if (!feedbackResponse.data) {
      throw new Error("No response from analysis function");
    }
    
    // If we got an error in the response
    if (feedbackResponse.data.error) {
      throw new Error(feedbackResponse.data.error);
    }
    
    return {
      transcript: finalTranscript,
      feedback: feedbackResponse.data.feedback
    };
  } catch (error) {
    console.error("Error analyzing recording:", error);
    throw error;
  }
}
