
// Follow this setup guide to integrate the Deno runtime into your Supabase project:
// https://docs.supabase.com/guides/functions/deno-runtime

// This is for Supabase Edge Function
// Make sure you add OPENAI_API_KEY to your Supabase secrets with:
// supabase secrets set OPENAI_API_KEY=<your_openai_api_key>

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Get the API key from environment variables
const apiKey = Deno.env.get("OPENAI_API_KEY");

console.log("Edge function starting. API key exists:", !!apiKey);
console.log("API key first 4 chars:", apiKey ? apiKey.substring(0, 4) : "NULL");

if (!apiKey) {
  console.error("OPENAI_API_KEY is not set in environment variables");
}

serve(async (req) => {
  try {
    console.log("Function called with request");
    
    // Parse the request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      throw new Error("Invalid request body");
    }

    const { audioData, transcript } = requestBody;

    console.log("Received request with audioData length:", 
      audioData ? (typeof audioData === 'string' ? audioData.length : 'not a string') : 'no audio data');
    console.log("Received transcript:", transcript ? transcript.substring(0, 100) + "..." : 'no transcript');

    // Variable to hold the final transcript
    let finalTranscript = transcript || "";
    let whisperTranscript = null;

    // STEP 1: If we have audioData, use Whisper for transcription
    try {
      if (audioData && audioData.length > 0) {
        // Check if the audioData is a valid base64 string
        if (!audioData.startsWith("data:audio") && !audioData.includes("base64")) {
          throw new Error("Invalid audio data format");
        }

        // Convert base64 to Uint8Array
        let audioBytes;
        try {
          audioBytes = audioData.startsWith("data:audio")
            ? Uint8Array.from(atob(audioData.split(",")[1]), (c) => c.charCodeAt(0))
            : Uint8Array.from(atob(audioData), (c) => c.charCodeAt(0));
          
          console.log("Converted audio bytes length:", audioBytes.length);
        } catch (error) {
          console.error("Error converting base64 to bytes:", error);
          throw new Error("Failed to process audio data");
        }

        if (audioBytes.length === 0) {
          throw new Error("Empty audio data after conversion");
        }

        // Create blob and form data for Whisper API - FIXED
        const blob = new Blob([audioBytes], { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", blob, "audio.webm");
        formData.append("model", "whisper-1");
        formData.append("language", "en");
        formData.append("response_format", "text");
        
        console.log("Created form data with blob size:", blob.size);
        console.log("Before OpenAI API call. API key exists:", !!apiKey);
        console.log("API key first 4 chars:", apiKey ? apiKey.substring(0, 4) : "NULL");
        
        try {
          // Use fetch directly instead of the SDK - FIXED
          const whisperResponse = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            body: formData,
          });
          
          if (!whisperResponse.ok) {
            const errorText = await whisperResponse.text();
            console.error("Whisper API error:", whisperResponse.status, errorText);
            throw new Error(`Whisper API error: ${whisperResponse.status} - ${errorText}`);
          }

          // Parse the response based on content-type
          const contentType = whisperResponse.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const jsonResponse = await whisperResponse.json();
            whisperTranscript = jsonResponse.text || "";
            console.log("Got JSON transcription from Whisper:", whisperTranscript);
          } else {
            // Plain text response
            whisperTranscript = await whisperResponse.text();
            console.log("Got plain text transcription from Whisper:", whisperTranscript);
          }
          
          // Always prefer Whisper transcript if available
          if (whisperTranscript && whisperTranscript.length > 0) {
            console.log("Using Whisper transcript as it's available");
            finalTranscript = whisperTranscript;
          }
        } catch (openaiError) {
          console.error("OpenAI API Error:", openaiError);
          console.error("Error details:", JSON.stringify(openaiError));
        }
      }
    } catch (whisperError) {
      console.error("Error with Whisper transcription:", whisperError);
      // Continue with the browser's transcript if Whisper fails
    }

    // More robust transcript checking
    if (!finalTranscript || finalTranscript.trim().length < 10) {
      console.error("Transcript is empty or too short — not sending to GPT");
      
      return new Response(
        JSON.stringify({ 
          error: "Transcript too short or empty. Please try again with a longer speech sample.",
          transcript: finalTranscript || "",
          feedback: {
            fillerWords: [],
            clarity: 50,
            pace: "good",
            structure: 50,
            suggestions: ["Your speech was too short to analyze. Please speak for at least a few sentences."],
            summary: "We need more speech content to provide meaningful feedback. Try recording again and speaking for longer."
          }
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    console.log("Sending final transcript for analysis:", finalTranscript.substring(0, 100) + "...");

    // STEP 2: Generate AI feedback on the transcript using GPT-4o
    try {
      console.log("Sending to GPT:", finalTranscript);
      
      // Use fetch directly instead of the SDK for consistency - FIXED
      const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: `You are a professional speech coach. Output ONLY valid JSON matching:

{
  "fillerWords": [
    { "word": "<string>", "count": <integer> }
  ],
  "clarity": <integer 0–100>,
  "pace": "<too slow|good|too fast>",
  "structure": <integer 0–100>,
  "suggestions": [
    "<string>",
    "<string>"
  ],
  "summary": "<string ending with encouragement>"
}` },
            { role: "user", content: finalTranscript }
          ]
        }),
      });
      
      if (!gptResponse.ok) {
        const errorText = await gptResponse.text();
        console.error("GPT API error:", gptResponse.status, errorText);
        throw new Error(`GPT API error: ${gptResponse.status} - ${errorText}`);
      }
      
      const gptData = await gptResponse.json();
      console.log("GPT Response received:", 
        gptData.choices && gptData.choices[0] ? 
        gptData.choices[0].message.content.substring(0, 100) + "..." : 
        "No valid response content");
      
      // Safely parse JSON with error handling - FIXED
      let feedback;
      try {
        feedback = JSON.parse(gptData.choices[0].message.content);
        
        // Validate feedback structure
        if (!feedback.fillerWords || !Array.isArray(feedback.fillerWords) || 
            typeof feedback.clarity !== 'number' || 
            typeof feedback.pace !== 'string' || 
            typeof feedback.structure !== 'number' || 
            !Array.isArray(feedback.suggestions) || 
            typeof feedback.summary !== 'string') {
          throw new Error("Invalid feedback format");
        }
        
        console.log("Successfully parsed feedback:", JSON.stringify(feedback).substring(0, 100) + "...");
      } catch (parseError) {
        console.error("Error parsing GPT response:", parseError);
        console.error("Raw GPT content:", gptData.choices[0].message.content);
        
        // Provide fallback feedback
        feedback = {
          fillerWords: [],
          clarity: 60,
          pace: "good",
          structure: 60,
          suggestions: ["Try to be more specific and detailed in your speech.", "Practice with a clearer structure."],
          summary: "Your speech was analyzed, but we had trouble processing the full AI feedback. Keep practicing!"
        };
      }

      // Return the transcript and feedback
      return new Response(
        JSON.stringify({
          transcript: finalTranscript,
          feedback
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    } catch (gptError) {
      console.error("Error with GPT analysis:", gptError);
      throw new Error("Failed to analyze speech with GPT: " + gptError.message);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Create fallback feedback
    const fallbackFeedback = {
      fillerWords: [],
      clarity: 50,
      pace: "good",
      structure: 50,
      suggestions: ["There was an error analyzing your speech. Please try again with a clearer recording."],
      summary: "We couldn't fully analyze your speech. Try speaking clearly into your microphone and ensure you have a good internet connection."
    };
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        transcript: "",
        feedback: fallbackFeedback
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  }
});
