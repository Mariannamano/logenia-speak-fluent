
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
      throw new Error("Invalid request body: " + (error instanceof Error ? error.message : String(error)));
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
          throw new Error("Invalid audio data format: Audio data must be a base64-encoded string with data URI prefix");
        }

        // Convert base64 to Uint8Array
        let audioBytes;
        try {
          audioBytes = audioData.startsWith("data:audio")
            ? Uint8Array.from(atob(audioData.split(",")[1]), (c) => c.charCodeAt(0))
            : Uint8Array.from(atob(audioData), (c) => c.charCodeAt(0));
        } catch (error) {
          console.error("Error converting base64 to bytes:", error);
          throw new Error("Failed to process audio data: " + (error instanceof Error ? error.message : String(error)));
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

        try {
          // Use OpenAI's Whisper model for accurate transcription
          const transcription = await openai.audio.transcriptions.create({
            file,
            model: "whisper-1",
            language: "en",
            response_format: "text",
          });

          console.log("Got transcription from Whisper:", transcription);
          whisperTranscript = transcription.text || transcription;
          
          // Always prefer Whisper transcript if available
          if (whisperTranscript && whisperTranscript.length > 0) {
            console.log("Using Whisper transcript as it's available");
            finalTranscript = whisperTranscript;
          }
        } catch (whisperSpecificError) {
          console.error("Whisper API specific error:", whisperSpecificError);
          throw new Error("Error transcribing audio with Whisper API: " + 
            (whisperSpecificError instanceof Error ? whisperSpecificError.message : String(whisperSpecificError)));
        }
      }
    } catch (whisperError) {
      console.error("Error with Whisper transcription:", whisperError);
      // Continue with the browser's transcript if Whisper fails
      if (!finalTranscript || finalTranscript.trim().length < 10) {
        throw new Error("Whisper transcription failed and browser transcript is too short: " + 
          (whisperError instanceof Error ? whisperError.message : String(whisperError)));
      }
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

      console.log("GPT Response received:", feedbackResponse.choices[0].message.content.substring(0, 100) + "...");
      const feedback = JSON.parse(feedbackResponse.choices[0].message.content);

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
      throw new Error("Failed to analyze speech with GPT: " + 
        (gptError instanceof Error ? gptError.message : String(gptError)));
    }
  } catch (error) {
    console.error("Error processing request:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Create fallback feedback with more detailed error information
    const fallbackFeedback = {
      fillerWords: [],
      clarity: 50,
      pace: "good",
      structure: 50,
      suggestions: [`There was an error analyzing your speech: ${errorMessage}. Please try again.`],
      summary: "We encountered an issue during analysis. This might be due to API connectivity issues or invalid audio data. Please try again with a clearer recording."
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
