
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
