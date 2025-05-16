
/**
 * Processes audio data with OpenAI's Whisper API
 */
export async function processAudio(audioData: string, apiKey: string | undefined): Promise<string | null> {
  if (!apiKey) {
    console.error("Missing OpenAI API key for Whisper");
    return null;
  }

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
  const formData = new FormData();
 // @ts-ignore
const file = new File([blob], "audio.webm", { type: "audio/webm" });
formData.append("file", file);
  formData.append("model", "whisper-1");
  formData.append("language", "en");
  formData.append("response_format", "text");
  
  console.log("Created form data with blob size:", blob.size);
  console.log("Before OpenAI API call. API key exists:", !!apiKey);
  
  try {
    // Use fetch directly instead of the SDK
    const whisperResponse = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = await whisperResponse.json();
      const transcript = jsonResponse.text || "";
      console.log("Got JSON transcription from Whisper:", transcript);
      return transcript;
    } else {
      // Plain text response
      const transcript = await whisperResponse.text();
      console.log("Got plain text transcription from Whisper:", transcript);
      return transcript;
    }
  } catch (openaiError) {
    console.error("OpenAI API Error:", openaiError);
    console.error("Error details:", JSON.stringify(openaiError));
    return null;
  }
}
