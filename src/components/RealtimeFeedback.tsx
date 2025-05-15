
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight } from "lucide-react";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

interface RealtimeFeedbackProps {
  feedback: FeedbackItem[];
  isVisible: boolean;
}

const RealtimeFeedback: React.FC<RealtimeFeedbackProps> = ({
  feedback,
  isVisible,
}) => {
  if (!isVisible || feedback.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50 transition-opacity duration-300" 
         style={{ opacity: isVisible ? 1 : 0 }}>
      <Alert className="bg-white/90 backdrop-blur-sm border-logenia-500 shadow-md">
        <AlertTitle className="text-logenia-600 flex items-center gap-2">
          <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
          Feedback
        </AlertTitle>
        <AlertDescription className="space-y-2 pt-2">
          {feedback.map((item, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              {item.type === "filler" ? (
                <span className="text-amber-600 font-medium flex-shrink-0">Filler:</span>
              ) : (
                <span className="text-green-600 font-medium flex-shrink-0">Follow-up:</span>
              )}
              <span>{item.content}</span>
            </div>
          ))}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default RealtimeFeedback;
