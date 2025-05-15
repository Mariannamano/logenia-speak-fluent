
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mic } from "lucide-react";
import RecordingControl from "@/components/RecordingControl";
import ScenarioSelector, { Scenario } from "@/components/ScenarioSelector";
import { practiceCategories } from "@/data/practiceScenarios";
import { useToast } from "@/hooks/use-toast";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

interface PracticeControlsProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  onTranscriptUpdate: (transcript: string) => void;
  onFeedbackUpdate: (feedback: FeedbackItem[]) => void;
  currentTranscript: string;
  enableRealtimeCoaching: boolean;
  setEnableRealtimeCoaching: (enabled: boolean) => void;
  hasRecording?: boolean; // Add this prop
}

const PracticeControls = ({
  onRecordingComplete,
  onTranscriptUpdate,
  onFeedbackUpdate,
  currentTranscript,
  enableRealtimeCoaching,
  setEnableRealtimeCoaching,
  hasRecording = false, // Default to false
}: PracticeControlsProps) => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleScenarioChange = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    toast({
      title: "Scenario Selected",
      description: `Now practicing: ${scenario.title}`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Scenario Selector */}
      <ScenarioSelector 
        categories={practiceCategories}
        selectedScenario={selectedScenario}
        onScenarioChange={handleScenarioChange}
      />
      
      <div className="flex items-center justify-between">
        <Label htmlFor="enable-coaching" className="flex items-center gap-2 cursor-pointer text-lg">
          <span>Enable Real-time Coaching</span>
        </Label>
        <Switch 
          id="enable-coaching" 
          checked={enableRealtimeCoaching} 
          onCheckedChange={setEnableRealtimeCoaching}
        />
      </div>
      
      <div className="border-t pt-4">
        <Label className="mb-2 flex items-center gap-2 text-lg">
          <Mic className="h-5 w-5" />
          Start Speaking
        </Label>
        <RecordingControl 
          onRecordingComplete={onRecordingComplete}
          onTranscriptUpdate={onTranscriptUpdate}
          onFeedbackUpdate={onFeedbackUpdate}
          enableRealtimeFeedback={enableRealtimeCoaching}
          maxDuration={120}
        />
      </div>
      
      {currentTranscript && !hasRecording && (
        <div className="mt-4 p-4 bg-fluent-100 dark:bg-fluent-800/40 rounded-md border border-fluent-200 dark:border-fluent-700/50">
          <Label className="text-sm text-muted-foreground">Live Transcript</Label>
          <p className="text-base mt-1">{currentTranscript}</p>
        </div>
      )}
    </div>
  );
};

export default PracticeControls;
