
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeedbackPanel from "@/components/FeedbackPanel";
import RealtimeFeedback from "@/components/RealtimeFeedback";
import { Card, CardContent } from "@/components/ui/card";
import PracticeHeader from "@/components/practice/PracticeHeader";
import PracticeControls from "@/components/practice/PracticeControls";
import PracticeSidebar from "@/components/practice/PracticeSidebar";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

const Practice = () => {
  const [hasRecording, setHasRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [realtimeFeedback, setRealtimeFeedback] = useState<FeedbackItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [enableRealtimeCoaching, setEnableRealtimeCoaching] = useState(true);
  const [fillerWordCount, setFillerWordCount] = useState(0);
  
  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log("Recording completed:", audioBlob);
    setHasRecording(true);
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Practice Area */}
            <div className="flex-1">
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <PracticeHeader fillerWordCount={fillerWordCount} />
                    
                    <PracticeControls 
                      onRecordingComplete={handleRecordingComplete}
                      onTranscriptUpdate={handleTranscriptUpdate}
                      onFeedbackUpdate={handleFeedbackUpdate}
                      currentTranscript={currentTranscript}
                      enableRealtimeCoaching={enableRealtimeCoaching}
                      setEnableRealtimeCoaching={setEnableRealtimeCoaching}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Feedback appears after recording */}
              {hasRecording && (
                <FeedbackPanel />
              )}
            </div>
            
            {/* Right Column - Tips */}
            <div className="lg:w-1/3 space-y-6">
              <PracticeSidebar />
            </div>
          </div>
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
