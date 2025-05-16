
import { Card } from "@/components/ui/card";
import AnalysisError from "@/components/practice/AnalysisError";
import TranscriptDisplay from "@/components/practice/TranscriptDisplay";
import FeedbackPanel from "@/components/FeedbackPanel";
import { SpeechAnalysis } from "@/services/coachingService";

interface PracticeAnalysisProps {
  hasRecording: boolean;
  completeTranscript: string;
  analysisError: string | null;
  speechAnalysis: SpeechAnalysis | undefined;
  isAnalyzing: boolean;
  culturalContext: string;
}

const PracticeAnalysis = ({
  hasRecording,
  completeTranscript,
  analysisError,
  speechAnalysis,
  isAnalyzing,
  culturalContext
}: PracticeAnalysisProps) => {
  if (!hasRecording) return null;
  
  return (
    <>
      {/* Error message if analysis failed */}
      <AnalysisError error={analysisError} />
      
      {/* Complete Transcript appears after recording */}
      <TranscriptDisplay 
        transcript={completeTranscript} 
        hasRecording={true} 
      />
      
      {/* Feedback appears after recording */}
      <div id="feedback-panel-container" className="mb-8">
        <FeedbackPanel 
          analysis={speechAnalysis} 
          isLoading={isAnalyzing} 
          culturalContext={culturalContext}
        />
      </div>
    </>
  );
};

export default PracticeAnalysis;
