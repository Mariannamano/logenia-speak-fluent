
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set in environment variables");
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audioData } = await req.json();

    if (!audioData || audioData.length === 0) {
      throw new Error("Empty audio data provided");
    }

    console.log("Processing audio data of length:", audioData.length);

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

    // Create blob and form data for Whisper API
    const blob = new Blob([audioBytes], { type: "audio/webm" });
    // @ts-ignore
    const file = new File([blob], "audio.webm", { type: "audio/webm" });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");
    formData.append("language", "en");
    formData.append("response_format", "text");
    
    console.log("Created form data with blob size:", blob.size);
    
    // Use fetch to send to OpenAI Whisper API
    const whisperResponse = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
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
    let transcript;
    
    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = await whisperResponse.json();
      transcript = jsonResponse.text || "";
    } else {
      transcript = await whisperResponse.text();
    }
    
    console.log("Got transcription from Whisper:", transcript.substring(0, 100) + "...");

    return new Response(
      JSON.stringify({ transcript }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Transcription error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        transcript: ""
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Using 200 with error in body for client compatibility
      }
    );
  }
});
