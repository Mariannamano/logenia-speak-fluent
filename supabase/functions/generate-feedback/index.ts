
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set in environment variables");
}

// Cultural adaptations for different contexts
const culturalGuidelines = {
  "american": "In American culture, communication is typically direct, efficient, and action-oriented. " +
    "Prioritize brevity, clarity, and confident delivery. Filler words are generally perceived negatively. " +
    "Ideal speech pace is moderate to slightly fast. Structure should be clear with main points stated upfront. " +
    "IMPORTANT: Make explicit references to American communication style in your feedback summary and suggestions.",

  "british": "In British culture, communication values politeness, understatement, and subtle humor. " +
    "Indirect criticism and diplomatic language are preferred. A measured pace with proper pronunciation is valued. " + 
    "Some hesitation can show thoughtfulness. Structure should be well-organized and respectful. " +
    "IMPORTANT: Make explicit references to British communication style in your feedback summary and suggestions.",

  "japanese": "In Japanese culture, communication values thoughtfulness, harmony, and implicit understanding. " +
    "Pauses are considered thoughtful rather than awkward. A moderate to slower pace is appropriate. " + 
    "Some filler words may be acceptable as they show consideration. Structure should build context before conclusions. " +
    "Directness should be balanced with politeness and maintaining group harmony. " +
    "IMPORTANT: Make explicit references to Japanese communication style in your feedback summary and suggestions.",
  
  "german": "In German culture, communication values precision, thoroughness, and factual content. " +
    "Be detailed, logical, and well-prepared. A moderate, measured pace is appropriate. " +
    "Minimal filler words are expected. Structure should be highly organized with clear supporting evidence. " +
    "Directness is appreciated when backed by expertise or data. " +
    "IMPORTANT: Make explicit references to German communication style in your feedback summary and suggestions.",
  
  "spanish": "In Spanish culture, communication is often passionate, expressive, and relationship-oriented. " +
    "Animated delivery with varied tone and gestures is appreciated. A moderate to faster pace is common. " +
    "Some filler words or repetition for emphasis is tolerated. Structure can be flexible and storytelling " +
    "is valued. Expressiveness and emotional connection are important. " +
    "IMPORTANT: Make explicit references to Spanish communication style in your feedback summary and suggestions.",

  "french": "In French culture, communication values elegance, sophistication, and intellectual discourse. " +
    "Well-structured arguments with logical flow are appreciated. A measured pace with clear articulation is expected. " +
    "Minimal filler words and precise vocabulary are valued. Debate-oriented and analytical approach is common. " +
    "IMPORTANT: Make explicit references to French communication style in your feedback summary and suggestions.",

  "australian": "In Australian culture, communication is casual, straightforward, and friendly. " +
    "Authenticity and directness are valued over formality. A relaxed pace with natural delivery is preferred. " +
    "Some informal language and casual filler words are acceptable. Structure can be flexible but should be clear. " +
    "IMPORTANT: Make explicit references to Australian communication style in your feedback summary and suggestions.",

  "canadian": "In Canadian culture, communication is polite, inclusive, and diplomatic. " +
    "Consensus-building and consideration for others are important. A moderate pace with clear pronunciation is valued. " +
    "Minimal filler words while maintaining politeness. Structure should be organized and respectful. " +
    "IMPORTANT: Make explicit references to Canadian communication style in your feedback summary and suggestions."
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, culturalContext = "american" } = await req.json();

    if (!transcript || transcript.trim().length < 10) {
      throw new Error("Transcript is too short or empty");
    }

    console.log("Processing transcript:", transcript.substring(0, 100) + "...");
    console.log("Using cultural context:", culturalContext);
    
    // Get the cultural guideline for the selected context or default to American
    const cultureGuideline = culturalGuidelines[culturalContext as keyof typeof culturalGuidelines] || 
                             culturalGuidelines["american"];
    
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

In every section of your feedback, specifically mention how your feedback relates to ${culturalContext} communication norms.

Based on these cultural norms, analyze the speech transcript and output ONLY valid JSON matching:

{
  "fillerWords": [
    { "word": "<string>", "count": <integer> }
  ],
  "clarity": <integer 0–100>,
  "pace": "<too slow|good|too fast>",
  "structure": <integer 0–100>,
  "suggestions": [
    "<string that explicitly references ${culturalContext} communication standards>",
    "<string that explicitly references ${culturalContext} communication standards>"
  ],
  "summary": "<string that includes explicit references to ${culturalContext} communication norms and ends with encouragement>"
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
      
      // Provide fallback feedback with cultural context references
      const cultureName = culturalContext.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      return new Response(
        JSON.stringify({
          feedback: {
            fillerWords: [],
            clarity: 60,
            pace: "good",
            structure: 60,
            suggestions: [
              `For effective ${cultureName} communication, try to be more specific and detailed in your speech.`,
              `Consider adapting your pace to better match ${cultureName} expectations for professional speech.`
            ],
            summary: `Your speech was analyzed using ${cultureName} communication standards. While we had trouble processing the full AI feedback, the structure and clarity could be improved to better align with ${cultureName} communication norms. Keep practicing with these cultural expectations in mind!`
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
    
    // Get culture name from context ID for the fallback message
    const culturalContext = (await req.json())?.culturalContext || "united-states";
    const cultureName = culturalContext.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        feedback: {
          fillerWords: [],
          clarity: 50,
          pace: "good",
          structure: 50,
          suggestions: [
            `There was an error analyzing your speech against ${cultureName} communication standards. Please try again with a clearer recording.`,
            `For ${cultureName} speaking contexts, ensure you're speaking clearly and at an appropriate pace.`
          ],
          summary: `We couldn't fully analyze your speech using ${cultureName} communication norms. Try speaking clearly into your microphone and ensure you have a good internet connection. Remember that different cultures have different expectations for effective communication.`
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  }
});
