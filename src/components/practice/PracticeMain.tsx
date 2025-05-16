
import { Card, CardContent } from "@/components/ui/card";
import PracticeHeader from "@/components/practice/PracticeHeader";
import PracticeControls from "@/components/practice/PracticeControls";
import { FeedbackItem } from "@/services/coachingService";

interface PracticeMainProps {
  fillerWordCount: number;
  onRecordingComplete: (audioBlob: Blob, transcript: string) => void;
  onTranscriptUpdate: (transcript: string) => void;
  onFeedbackUpdate: (feedback: FeedbackItem[]) => void;
  onDurationUpdate: (durationInSeconds: number) => void;
  currentTranscript: string;
  enableRealtimeCoaching: boolean;
  setEnableRealtimeCoaching: (enabled: boolean) => void;
  hasRecording: boolean;
  initialCategory: string | null;
  culturalContext: string;
  onCultureChange: (cultureId: string) => void;
}

const PracticeMain = ({
  fillerWordCount,
  onRecordingComplete,
  onTranscriptUpdate,
  onFeedbackUpdate,
  onDurationUpdate,
  currentTranscript,
  enableRealtimeCoaching,
  setEnableRealtimeCoaching,
  hasRecording,
  initialCategory,
  culturalContext,
  onCultureChange
}: PracticeMainProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <PracticeHeader fillerWordCount={fillerWordCount} />
          
          <PracticeControls 
            onRecordingComplete={onRecordingComplete}
            onTranscriptUpdate={onTranscriptUpdate}
            onFeedbackUpdate={onFeedbackUpdate}
            onDurationUpdate={onDurationUpdate}
            currentTranscript={currentTranscript}
            enableRealtimeCoaching={enableRealtimeCoaching}
            setEnableRealtimeCoaching={setEnableRealtimeCoaching}
            hasRecording={hasRecording}
            initialCategory={initialCategory}
            culturalContext={culturalContext}
            onCultureChange={onCultureChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeMain;
