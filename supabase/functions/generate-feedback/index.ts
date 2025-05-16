
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set in environment variables");
}

// Cultural adaptations for different contexts
const culturalGuidelines = {
  "united-states": "In American culture, communication is typically direct, efficient, and action-oriented. " +
    "Prioritize brevity, clarity, and confident delivery. Filler words are generally perceived negatively. " +
    "Ideal speech pace is moderate to slightly fast. Structure should be clear with main points stated upfront.",

  "japan": "In Japanese culture, communication values thoughtfulness, harmony, and implicit understanding. " +
    "Pauses are considered thoughtful rather than awkward. A moderate to slower pace is appropriate. " + 
    "Some filler words may be acceptable as they show consideration. Structure should build context before conclusions. " +
    "Directness should be balanced with politeness and maintaining group harmony.",
  
  "spain": "In Spanish culture, communication is often passionate, expressive, and relationship-oriented. " +
    "Animated delivery with varied tone and gestures is appreciated. A moderate to faster pace is common. " +
    "Some filler words or repetition for emphasis is tolerated. Structure can be flexible and storytelling " +
    "is valued. Expressiveness and emotional connection are important.",
  
  "germany": "In German culture, communication values precision, thoroughness, and factual content. " +
    "Be detailed, logical, and well-prepared. A moderate, measured pace is appropriate. " +
    "Minimal filler words are expected. Structure should be highly organized with clear supporting evidence. " +
    "Directness is appreciated when backed by expertise or data.",
  
  "india": "In Indian culture, communication often balances directness with contextual storytelling. " +
    "A moderate pace with rhetorical flourishes is common. Some repetition for emphasis is acceptable. " +
    "Structure should establish relationships and context before addressing core points. " +
    "Respect-oriented phrasing is important, especially with senior colleagues."
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, culturalContext = "united-states" } = await req.json();

    if (!transcript || transcript.trim().length < 10) {
      throw new Error("Transcript is too short or empty");
    }

    console.log("Processing transcript:", transcript.substring(0, 100) + "...");
    console.log("Using cultural context:", culturalContext);
    
    // Get the cultural guideline for the selected context or default to US
    const cultureGuideline = culturalGuidelines[culturalContext as keyof typeof culturalGuidelines] || 
                             culturalGuidelines["united-states"];
    
    // Use fetch to call OpenAI API
    const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `You are a professional speech coach with expertise in cross-cultural communication.
          
${cultureGuideline}

Based on these cultural norms, analyze the speech transcript and output ONLY valid JSON matching:

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
          { role: "user", content: transcript }
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
    
    // Safely parse JSON with error handling
    try {
      const feedback = JSON.parse(gptData.choices[0].message.content);
      
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
      return new Response(
        JSON.stringify({ feedback }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } catch (parseError) {
      console.error("Error parsing GPT response:", parseError);
      console.error("Raw GPT content:", gptData.choices[0].message.content);
      
      // Provide fallback feedback
      return new Response(
        JSON.stringify({
          feedback: {
            fillerWords: [],
            clarity: 60,
            pace: "good",
            structure: 60,
            suggestions: ["Try to be more specific and detailed in your speech.", "Practice with a clearer structure."],
            summary: "Your speech was analyzed, but we had trouble processing the full AI feedback. Keep practicing!"
          }
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Feedback generation error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        feedback: {
          fillerWords: [],
          clarity: 50,
          pace: "good",
          structure: 50,
          suggestions: ["There was an error analyzing your speech. Please try again with a clearer recording."],
          summary: "We couldn't fully analyze your speech. Try speaking clearly into your microphone and ensure you have a good internet connection."
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  }
});
