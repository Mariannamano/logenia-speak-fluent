
// Follow this setup guide to integrate the Deno runtime into your Supabase project:
// https://docs.supabase.com/guides/functions/deno-runtime

// This is for Supabase Edge Function
// Make sure you add OPENAI_API_KEY to your Supabase secrets with:
// supabase secrets set OPENAI_API_KEY=<your_openai_api_key>

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://esm.sh/openai@4.17.0";

// Get the API key from environment variables
const apiKey = Deno.env.get("OPENAI_API_KEY");

if (!apiKey) {
  console.error("OPENAI_API_KEY is not set in environment variables");
}

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: apiKey,
});

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

    if (!audioData || typeof audioData !== 'string' || audioData.length < 100) {
      throw new Error("Invalid or missing audio data");
    }

    // If we have audioData, use Whisper for transcription
    let finalTranscript = transcript || "";
    let whisperTranscript = null;
    
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
        } catch (error) {
          console.error("Error converting base64 to bytes:", error);
          throw new Error("Failed to process audio data");
        }

        console.log("Converted audio bytes length:", audioBytes.length);

        if (audioBytes.length === 0) {
          throw new Error("Empty audio data after conversion");
        }

        // Create file object for OpenAI
        const file = new File([audioBytes], "audio.webm", { type: "audio/webm" });

        console.log("Created file object with size:", file.size);

        if (file.size === 0) {
          throw new Error("Empty audio file created");
        }

        // Use OpenAI's Whisper model for accurate transcription
        const transcription = await openai.audio.transcriptions.create({
          file,
          model: "whisper-1",
        });

        console.log("Got transcription from Whisper:", transcription.text.substring(0, 100) + "...");
        whisperTranscript = transcription.text;
        
        // Use Whisper transcript if it's longer than the provided transcript
        if (!finalTranscript || whisperTranscript.length > finalTranscript.length) {
          finalTranscript = whisperTranscript;
        }
      }
    } catch (whisperError) {
      console.error("Error with Whisper transcription:", whisperError);
      // Continue with the original transcript if Whisper fails
    }

    // If we don't have any transcript, return an error
    if (!finalTranscript || finalTranscript.trim().length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "No transcript available for analysis",
          transcript: "",
          feedback: {
            fillerWords: [],
            clarity: 0,
            pace: "good",
            structure: 0,
            suggestions: ["Could not analyze your speech. Please try again and speak clearly."],
            summary: "No speech was detected. Please try speaking louder or check your microphone."
          }
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200, // Return 200 even for this case so the frontend can handle it
        }
      );
    }

    console.log("Sending final transcript for analysis:", finalTranscript.substring(0, 100) + "...");

    // Generate AI feedback on the transcript
    const feedbackResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional speech coach focused on helping users improve their spoken English in professional settings.
          
          Analyze the transcript strictly based on its content. Do not infer or invent details beyond what the user said.
          Do not guess how the user spoke, do not assume emotional tone or intent, and do not fabricate examples 
          unless they appear in the transcription.
          
          Your analysis should include:
          
          1. Filler Word Count - Count only the actual filler words (e.g., "um," "uh," "like," "you know") 
             that appear in the transcript. List each word and how many times it was used.
          2. Pacing & Fluency - Identify any signs of rushed or hesitant phrasing visible in the transcription.
             Only comment if this is evident in the actual words.
          3. Clarity & Structure - Evaluate whether the ideas are logically structured and easy to follow.
          4. Improvement Suggestions - Give 1-2 specific, practical tips based ONLY on the actual transcript.
             If the text is already clear and fluent, say so.
          
          Format your response as JSON with these fields:
          - fillerWords: Array of objects with {word: string, count: number}
          - clarity: number from 0-100
          - pace: "too slow", "good", or "too fast"
          - structure: number from 0-100 
          - suggestions: Array of suggestion strings
          - summary: Brief text summary of the analysis, ending with an encouraging statement.`
        },
        {
          role: "user",
          content: finalTranscript
        }
      ],
      response_format: { type: "json_object" }
    });

    const feedback = JSON.parse(feedbackResponse.choices[0].message.content);
    console.log("Got feedback:", JSON.stringify(feedback).substring(0, 100) + "...");

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
  } catch (error) {
    console.error("Error processing request:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        transcript: "",
        feedback: {
          fillerWords: [],
          clarity: 0,
          pace: "good",
          structure: 0,
          suggestions: ["Error analyzing your speech: " + errorMessage + ". Please try again."],
          summary: "There was an error analyzing your speech. Please try again with a clearer recording."
        }
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200, // Return 200 so frontend can handle it
      }
    );
  }
});
