
import { parseRequest } from "./parseRequest.ts";
import { processAudio } from "../services/audioProcessor.ts";
import { analyzeWithGPT } from "../services/gptAnalyzer.ts";
import { corsHeaders } from "../utils/corsHeaders.ts";

export async function handleRequest(req: Request, apiKey: string | undefined) {
  // Parse the request body
  const { audioData, transcript } = await parseRequest(req);

  // Variable to hold the final transcript
  let finalTranscript = transcript || "";
  let whisperTranscript = null;

  // STEP 1: If we have audioData, use Whisper for transcription
  if (audioData && audioData.length > 0) {
    try {
      whisperTranscript = await processAudio(audioData, apiKey);
      
      // Always prefer Whisper transcript if available
      if (whisperTranscript && whisperTranscript.length > 0) {
        console.log("Using Whisper transcript as it's available");
        finalTranscript = whisperTranscript;
      }
    } catch (whisperError) {
      console.error("Error with Whisper transcription:", whisperError);
      // Continue with the browser's transcript if Whisper fails
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
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  }

  console.log("Sending final transcript for analysis:", finalTranscript.substring(0, 100) + "...");

  // STEP 2: Generate AI feedback on the transcript using GPT-4o
  try {
    const feedback = await analyzeWithGPT(finalTranscript, apiKey);

    // Return the transcript and feedback
    return new Response(
      JSON.stringify({
        transcript: finalTranscript,
        feedback
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (gptError) {
    console.error("Error with GPT analysis:", gptError);
    throw new Error("Failed to analyze speech with GPT: " + gptError.message);
  }
}
