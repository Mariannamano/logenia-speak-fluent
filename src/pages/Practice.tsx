
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeedbackPanel from "@/components/FeedbackPanel";
import RealtimeFeedback from "@/components/RealtimeFeedback";
import { Card, CardContent } from "@/components/ui/card";
import PracticeHeader from "@/components/practice/PracticeHeader";
import PracticeControls from "@/components/practice/PracticeControls";
import { analyzeRecording, SpeechAnalysis } from "@/services/coachingService";
import { toast } from "@/hooks/use-toast";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

const Practice = () => {
  const location = useLocation();
  const [hasRecording, setHasRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [completeTranscript, setCompleteTranscript] = useState("");
  const [realtimeFeedback, setRealtimeFeedback] = useState<FeedbackItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [enableRealtimeCoaching, setEnableRealtimeCoaching] = useState(true);
  const [fillerWordCount, setFillerWordCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [speechAnalysis, setSpeechAnalysis] = useState<SpeechAnalysis | undefined>(undefined);
  const [initialCategory, setInitialCategory] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  // Extract category from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    if (category) {
      setInitialCategory(category);
      console.log("Initial category set from URL:", category);
    }
  }, [location.search]);
  
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
      
      // Send recording for AI analysis
      const result = await analyzeRecording(audioBlob, transcript);
      
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
  
  const handleTranscriptUpdate = (transcript: string) => {
    setCurrentTranscript(transcript);
    console.log("Updated transcript:", transcript);
  };
  
  const handleFeedbackUpdate = (feedback: FeedbackItem[]) => {
    // Count filler word feedback items
    const newFillerWords = feedback.filter(item => item.type === "filler").length;
    if (newFillerWords > 0) {
      setFillerWordCount(prev => prev + newFillerWords);
    }
    
    setRealtimeFeedback(feedback);
    setShowFeedback(true);
    
    // Hide feedback after 8 seconds
    setTimeout(() => {
      setShowFeedback(false);
    }, 8000);
  };
  
  // Check browser compatibility on page load
  useEffect(() => {
    // Check for WebSpeechAPI and mediaDevices
    const supportsSpeechRecognition = 'webkitSpeechRecognition' in window;
    const supportsMediaDevices = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    
    if (!supportsSpeechRecognition || !supportsMediaDevices) {
      toast({
        title: "Browser Compatibility Issue",
        description: "Your browser doesn't fully support speech recognition. For the best experience, use Chrome, Edge, or Safari.",
        variant: "destructive"
      });
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          {/* Main Practice Area - Now centered and wider */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <PracticeHeader fillerWordCount={fillerWordCount} />
                
                <PracticeControls 
                  onRecordingComplete={handleRecordingComplete}
                  onTranscriptUpdate={handleTranscriptUpdate}
                  onFeedbackUpdate={handleFeedbackUpdate}
                  currentTranscript={currentTranscript}
                  enableRealtimeCoaching={enableRealtimeCoaching}
                  setEnableRealtimeCoaching={setEnableRealtimeCoaching}
                  hasRecording={hasRecording}
                  initialCategory={initialCategory}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Error message if analysis failed */}
          {analysisError && (
            <Card className="mb-8 border-destructive">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-destructive">Analysis Error</h3>
                <p className="text-base">{analysisError}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try recording again with a clearer voice, or check your microphone settings.
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Complete Transcript appears after recording */}
          {hasRecording && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Complete Transcript</h3>
                <div className="p-4 bg-fluent-100 dark:bg-fluent-800/40 rounded-md text-lg border border-fluent-200 dark:border-fluent-700/50">
                  {completeTranscript || "No transcript available"}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Feedback appears after recording */}
          {hasRecording && (
            <FeedbackPanel 
              analysis={speechAnalysis} 
              isLoading={isAnalyzing} 
            />
          )}
        </div>
      </main>
      
      {/* Real-time Feedback Component */}
      <RealtimeFeedback 
        feedback={realtimeFeedback} 
        isVisible={showFeedback} 
      />
      
      <Footer />
    </div>
  );
};

export default Practice;
