
// This file already exists but we need to update the SpeechAnalysis type to fix type errors

export interface FeedbackItem {
  type: "filler" | "grammar" | "vocabulary" | "clarity" | "pace" | "structure";
  message: string;
  timestamp?: number;
  wordIndex?: number;
  confidence?: number;
}

export interface SpeechAnalysis {
  fillerWords: { word: string; count: number; }[];
  clarity: number;
  pace: "too_slow" | "slow" | "good" | "fast" | "too_fast";
  structure: number;
  suggestions: string[];
  summary: string;
}

// This function detects filler words in real-time during speaking
export async function getRealtimeFeedback(text: string): Promise<FeedbackItem[]> {
  const fillerWords = ["um", "uh", "like", "you know", "actually", "basically", "literally", "sort of", "kind of", "so"];
  const feedback: FeedbackItem[] = [];
  
  // Simple detection - in production this would use more sophisticated NLP
  const lowerText = text.toLowerCase();
  
  fillerWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = lowerText.match(regex);
    
    if (matches) {
      feedback.push({
        type: "filler",
        content: `You used "${word}" ${matches.length} time${matches.length === 1 ? '' : 's'}`
      });
    }
  });
  
  // Add some coaching advice for long responses
  const wordCount = text.split(" ").length;
  if (wordCount > 30) {
    feedback.push({
      type: "followup",
      content: "Try to be more concise with your answers"
    });
  }
  
  return feedback;
}

// This function sends the recorded audio to the backend for analysis
export async function analyzeRecording(audioBlob: Blob, transcript: string, culturalContext = "united-states"): Promise<{transcript: string, feedback: SpeechAnalysis}> {
  try {
    // For demo purposes, we'll simulate the API call with mock data
    console.log(`Analyzing ${audioBlob.size} bytes of audio with cultural context: ${culturalContext}`);
    
    // In a production app, you would send the audio to a server for analysis
    // const formData = new FormData();
    // formData.append("audio", audioBlob);
    // formData.append("transcript", transcript);
    // formData.append("culturalContext", culturalContext);
    
    // const response = await axios.post("/api/analyze-speech", formData);
    // return response.data;
    
    // For now, return mock data
    const mockFillerWords = [
      { word: "um", count: 3 },
      { word: "like", count: 5 },
      { word: "you know", count: 2 }
    ];
    
    // Simulate different feedback based on cultural context
    let paceFeedback: "too_slow" | "slow" | "good" | "fast" | "too_fast" = "good";
    let suggestions = [];
    let summary = "";
    
    switch (culturalContext) {
      case "japan":
        paceFeedback = "fast";
        suggestions = [
          "Consider adding more thoughtful pauses between points",
          "Your direct style may come across as abrupt in a Japanese context",
          "Try to be less explicit with criticism or disagreement"
        ];
        summary = "Your speech was clear but would benefit from a more measured pace and indirect communication style typical in Japanese business contexts.";
        break;
      case "spain":
        paceFeedback = "good";
        suggestions = [
          "Add more expressiveness to your delivery",
          "Use more hand gestures and vocal variation",
          "Personal anecdotes would strengthen your connection"
        ];
        summary = "Your points were well-structured but could be delivered with more passion and expressiveness valued in Spanish communication.";
        break;
      case "germany":
        paceFeedback = "good";
        suggestions = [
          "Add more specific data points to support your claims",
          "Structure your argument more systematically",
          "Be more direct with your recommendations"
        ];
        summary = "Your speech was clear but would benefit from more precision and structured reasoning typical in German professional communication.";
        break;
      case "india":
        paceFeedback = "fast";
        suggestions = [
          "Include more context before stating your main point",
          "Build more rapport through shared values or experiences",
          "Consider a more storytelling approach to convey key messages"
        ];
        summary = "Your communication style is direct and efficient but could benefit from more contextual framing and relationship-building elements valued in Indian business conversations.";
        break;
      default: // united-states
        paceFeedback = "good";
        suggestions = [
          "Be more concise with your main points",
          "Eliminate filler words like 'um' and 'like'",
          "Use more direct calls to action"
        ];
        summary = "Your speech was clear but could be more impactful with fewer filler words and more direct messaging typical in American business contexts.";
    }
    
    // This simulates the delay of an API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      transcript: transcript.length > 20 ? transcript : "This is a simulated transcript of your speech.",
      feedback: {
        fillerWords: mockFillerWords,
        clarity: 75,
        pace: paceFeedback,
        structure: 80,
        suggestions,
        summary
      }
    };
  } catch (error) {
    console.error("Error analyzing recording:", error);
    throw new Error("Failed to analyze recording. Please try again.");
  }
}
