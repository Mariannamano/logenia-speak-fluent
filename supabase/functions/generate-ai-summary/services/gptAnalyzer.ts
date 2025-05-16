
/**
 * Analyzes the transcript with OpenAI's GPT-4o model
 */
export async function analyzeWithGPT(transcript: string, apiKey: string | undefined) {
  if (!apiKey) {
    throw new Error("Missing OpenAI API key for GPT analysis");
  }

  console.log("Sending to GPT:", transcript);
  
  // Use fetch to call OpenAI API
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
    return feedback;
  } catch (parseError) {
    console.error("Error parsing GPT response:", parseError);
    console.error("Raw GPT content:", gptData.choices[0].message.content);
    
    // Provide fallback feedback
    return {
      fillerWords: [],
      clarity: 60,
      pace: "good",
      structure: 60,
      suggestions: ["Try to be more specific and detailed in your speech.", "Practice with a clearer structure."],
      summary: "Your speech was analyzed, but we had trouble processing the full AI feedback. Keep practicing!"
    };
  }
}
