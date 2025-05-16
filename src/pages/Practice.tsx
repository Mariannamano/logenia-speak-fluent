
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RealtimeFeedback from "@/components/RealtimeFeedback";
import PracticeContent from "@/components/practice/PracticeContent";
import { toast } from "@/hooks/use-toast";
import { FeedbackItem } from "@/services/coachingService";

const Practice = () => {
  const location = useLocation();
  const [initialCategory, setInitialCategory] = useState<string | null>(null);
  const [realtimeFeedback, setRealtimeFeedback] = useState<FeedbackItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Extract category from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    if (category) {
      setInitialCategory(category);
      console.log("Initial category set from URL:", category);
    }
  }, [location.search]);
  
  const handleFeedbackUpdate = (feedback: FeedbackItem[]) => {
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
        <PracticeContent 
          initialCategory={initialCategory}
          onFeedbackUpdate={handleFeedbackUpdate}
        />
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
