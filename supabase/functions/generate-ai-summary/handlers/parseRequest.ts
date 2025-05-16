
export async function parseRequest(req: Request): Promise<{ audioData: string, transcript: string }> {
  try {
    const requestBody = await req.json();
    const { audioData, transcript } = requestBody;

    console.log("Received request with audioData length:", 
      audioData ? (typeof audioData === 'string' ? audioData.length : 'not a string') : 'no audio data');
    console.log("Received transcript:", transcript ? transcript.substring(0, 100) + "..." : 'no transcript');

    return { audioData, transcript };
  } catch (error) {
    console.error("Error parsing request body:", error);
    throw new Error("Invalid request body");
  }
}
