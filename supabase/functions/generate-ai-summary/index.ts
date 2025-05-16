
// Follow this setup guide to integrate the Deno runtime into your Supabase project:
// https://docs.supabase.com/guides/functions/deno-runtime

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { handleRequest } from "./handlers/requestHandler.ts";
import { corsHeaders } from "./utils/corsHeaders.ts";

// Get the API key from environment variables
const apiKey = Deno.env.get("OPENAI_API_KEY");

console.log("Edge function starting. API key exists:", !!apiKey);
console.log("API key first 4 chars:", apiKey ? apiKey.substring(0, 4) : "NULL");

if (!apiKey) {
  console.error("OPENAI_API_KEY is not set in environment variables");
}

serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    
    return await handleRequest(req, apiKey);
  } catch (error) {
    console.error("Unhandled error in server:", error);
    
    // Create fallback feedback for unhandled errors
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
        error: error instanceof Error ? error.message : "Unknown error",
        transcript: "",
        feedback: fallbackFeedback
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  }
});
