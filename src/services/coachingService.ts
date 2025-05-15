
import { toast } from "sonner";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

const OPENAI_API_KEY = "your-openai-api-key"; // Note: In production, this should be stored securely

export async function getRealtimeFeedback(transcriptChunk: string): Promise<FeedbackItem[]> {
  if (!transcriptChunk.trim()) return [];
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a real-time communication coach for non-native English speakers.
            Analyze the provided transcript chunk and give exactly TWO pieces of feedback:
            1. One filler word feedback (if any filler words like "um", "like", "you know" are detected)
            2. One follow-up phrase suggestion
            
            Format your response in JSON only:
            {
              "feedback": [
                {"type": "filler", "content": "Replace 'like' in 'I was like thinking' → 'I was thinking'"},
                {"type": "followup", "content": "Try: 'Let me walk you through an example.'"}
              ]
            }
            
            If no filler words are detected, provide only the follow-up suggestion.
            Keep feedback concise and encouraging. Don't include any other text in your response.`
          },
          {
            role: "user",
            content: transcriptChunk
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    if (data.error) {
      console.error("OpenAI API error:", data.error);
      return [];
    }
    
    try {
      const parsedContent = JSON.parse(data.choices[0].message.content);
      return parsedContent.feedback || [];
    } catch (e) {
      console.error("Failed to parse OpenAI response:", e);
      return [];
    }
  } catch (error) {
    console.error("Error getting feedback:", error);
    return [];
  }
}

// Speech recognition utils
export function setupSpeechRecognition(): SpeechRecognition | null {
  if (!("webkitSpeechRecognition" in window)) {
    toast.error("Speech recognition is not supported in your browser.");
    return null;
  }

  // @ts-ignore - WebSpeech API TypeScript definitions
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  
  return recognition;
}
