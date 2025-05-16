
import { useState, useEffect } from "react";
import PracticeMain from "@/components/practice/PracticeMain";
import PracticeAnalysis from "@/components/practice/PracticeAnalysis";
import { SpeechAnalysis, analyzeRecording, FeedbackItem } from "@/services/coachingService";
import { toast } from "@/hooks/use-toast";
import { usePracticeStats } from "@/hooks/use-practice-stats";

interface PracticeContentProps {
  initialCategory: string | null;
  onFeedbackUpdate: (feedback: FeedbackItem[]) => void;
}

const PracticeContent = ({ initialCategory, onFeedbackUpdate }: PracticeContentProps) => {
  const [hasRecording, setHasRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [completeTranscript, setCompleteTranscript] = useState("");
  const [enableRealtimeCoaching, setEnableRealtimeCoaching] = useState(true);
  const [fillerWordCount, setFillerWordCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [speechAnalysis, setSpeechAnalysis] = useState<SpeechAnalysis | undefined>(undefined);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [culturalContext, setCulturalContext] = useState("united-states"); // Default to US
  const [recordingDuration, setRecordingDuration] = useState(0);
  const { recordPracticeSession } = usePracticeStats();
  
  const handleTranscriptUpdate = (transcript: string) => {
    setCurrentTranscript(transcript);
    console.log("Updated transcript:", transcript);
  };
  
  const handleRecordingComplete = async (audioBlob: Blob, transcript: string) => {
    console.log("Recording completed. Audio blob size:", audioBlob.size, "type:", audioBlob.type);
    
    if (!audioBlob || audioBlob.size === 0) {
      toast({
        title: "Recording Error",
        description: "No audio was recorded. Please check your microphone and try again.",
        variant: "destructive"
      });
      return;
    }
    
    setHasRecording(true);
    setCompleteTranscript(transcript || "No transcript available. Please speak clearly.");
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    try {
      // Toast notification to let user know analysis is happening
      toast({
        title: "Analyzing your speech",
        description: "We're processing your recording to provide feedback..."
      });
      
      // Send recording for AI analysis with cultural context
      const result = await analyzeRecording(audioBlob, transcript, culturalContext);
      
      // Update transcript with potentially more accurate one from whisper
      if (result.transcript && result.transcript.length > 10) {
        setCompleteTranscript(result.transcript);
      }
      
      // Check for error information in the response
      if (result.feedback.suggestions[0]?.startsWith("Error analyzing")) {
        setAnalysisError(result.feedback.suggestions[0]);
        toast({
          title: "Analysis Issue",
          description: "There was a problem analyzing your recording. You can try recording again.",
          variant: "destructive"
        });
      } else {
        // Set the AI analysis results
        setSpeechAnalysis(result.feedback);
        
        // Update filler word count from AI analysis
        const totalFillerWords = result.feedback.fillerWords.reduce(
          (sum, item) => sum + item.count, 0
        );
        setFillerWordCount(prev => prev + totalFillerWords);
        
        // Record the completed practice session
        recordPracticeSession(recordingDuration);
        
        // Success notification
        toast({
          title: "Analysis complete",
          description: "Your speech feedback is ready to review."
        });
      }
    } catch (error) {
      console.error("Error analyzing recording:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setAnalysisError(errorMessage);
      
      // Create a fallback analysis
      const fallbackAnalysis: SpeechAnalysis = {
        fillerWords: [],
        clarity: 50,
        pace: "good", 
        structure: 50,
        suggestions: [
          "We could only analyze the basic transcript.", 
          "Try speaking clearly and directly into the microphone."
        ],
        summary: "We analyzed what we could from your speech. Try speaking more clearly next time."
      };
      
      setSpeechAnalysis(fallbackAnalysis);
      
      toast({
        title: "Analysis issue",
        description: "We had trouble analyzing your recording, but provided basic feedback.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleFeedbackUpdate = (feedback: FeedbackItem[]) => {
    // Count filler word feedback items
    const newFillerWords = feedback.filter(item => item.type === "filler").length;
    if (newFillerWords > 0) {
      setFillerWordCount(prev => prev + newFillerWords);
    }
    
    onFeedbackUpdate(feedback);
  };
  
  const handleCultureChange = (cultureId: string) => {
    setCulturalContext(cultureId);
    console.log("Cultural context updated to:", cultureId);
    
    // Add a toast notification to confirm the cultural context change
    const cultureName = cultureId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    toast({
      title: "Cultural Context Updated",
      description: `Feedback will now be tailored to ${cultureName} communication norms.`
    });
  };
  
  // Track the recording duration
  const handleDurationUpdate = (durationInSeconds: number) => {
    setRecordingDuration(durationInSeconds);
  };
  
  return (
    <div className="container px-4 md:px-6 max-w-4xl mx-auto">
      {/* Main Practice Area */}
      <PracticeMain
        fillerWordCount={fillerWordCount}
        onRecordingComplete={handleRecordingComplete}
        onTranscriptUpdate={handleTranscriptUpdate}
        onFeedbackUpdate={handleFeedbackUpdate}
        onDurationUpdate={handleDurationUpdate}
        currentTranscript={currentTranscript}
        enableRealtimeCoaching={enableRealtimeCoaching}
        setEnableRealtimeCoaching={setEnableRealtimeCoaching}
        hasRecording={hasRecording}
        initialCategory={initialCategory}
        culturalContext={culturalContext}
        onCultureChange={handleCultureChange}
      />
      
      {/* Analysis Area */}
      <PracticeAnalysis
        hasRecording={hasRecording}
        completeTranscript={completeTranscript}
        analysisError={analysisError}
        speechAnalysis={speechAnalysis}
        isAnalyzing={isAnalyzing}
        culturalContext={culturalContext}
      />
    </div>
  );
};

export default PracticeContent;
