
// Follow this setup guide to integrate the Deno runtime into your Supabase project:
// https://docs.supabase.com/guides/functions/deno-runtime

// This is for Supabase Edge Function
// Make sure you add OPENAI_API_KEY to your Supabase secrets with:
// supabase secrets set OPENAI_API_KEY=<your_openai_api_key>

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://esm.sh/openai@4.17.0";

// Get the API key from environment variables
const apiKey = Deno.env.get("OPENAI_API_KEY");

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: apiKey,
});

serve(async (req) => {
  try {
    // Parse the request body
    const { audioData, transcript } = await req.json();

    // If we have audioData, use Whisper for transcription
    let finalTranscript = transcript;
    if (audioData) {
      // Convert base64 to Uint8Array if necessary
      const audioBytes = audioData.startsWith("data:audio")
        ? Uint8Array.from(atob(audioData.split(",")[1]), (c) => c.charCodeAt(0))
        : Uint8Array.from(atob(audioData), (c) => c.charCodeAt(0));

      // Create file object for OpenAI
      const file = new File([audioBytes], "audio.webm", { type: "audio/webm" });

      // Use OpenAI's Whisper model for accurate transcription
      const transcription = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
      });

      finalTranscript = transcription.text;
    }

    // Generate AI feedback on the transcript
    const feedbackResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional speech coach. Analyze the following transcript for:
          1. Filler words (um, uh, like, you know, etc.)
          2. Speech clarity and pace
          3. Suggestions for improvement
          
          Provide specific, actionable feedback. Focus on the most important 2-3 issues.
          Format your response as JSON with these fields:
          - fillerWords: Array of objects with {word: string, count: number}
          - clarity: number from 0-100
          - pace: "too slow", "good", or "too fast"
          - suggestions: Array of suggestion strings
          - summary: Brief text summary of the analysis`
        },
        {
          role: "user",
          content: finalTranscript
        }
      ],
      response_format: { type: "json_object" }
    });

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
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
