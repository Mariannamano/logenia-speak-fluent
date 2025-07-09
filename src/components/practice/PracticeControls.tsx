
import { useState, useEffect } from "react";
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
  onRecordingComplete: (audioBlob: Blob, transcript: string) => void;
  onTranscriptUpdate: (transcript: string) => void;
  onFeedbackUpdate: (feedback: FeedbackItem[]) => void;
  currentTranscript: string;
  enableRealtimeCoaching: boolean;
  setEnableRealtimeCoaching: (enabled: boolean) => void;
  hasRecording?: boolean;
  initialCategory?: string | null;
}

const PracticeControls = ({
  onRecordingComplete,
  onTranscriptUpdate,
  onFeedbackUpdate,
  currentTranscript,
  enableRealtimeCoaching,
  setEnableRealtimeCoaching,
  hasRecording = false,
  initialCategory = null,
}: PracticeControlsProps) => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
      console.log("Setting initial category in PracticeControls:", initialCategory);
    }
  }, [initialCategory]);

  const handleScenarioChange = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    toast({
      title: "Scenario Selected",
      description: `Now practicing: ${scenario.title}`,
    });
  };

  const handleRecordingComplete = (audioBlob: Blob, transcript: string) => {
    console.log("PracticeControls - Recording completed, forwarding to parent. Blob size:", audioBlob.size);
    onRecordingComplete(audioBlob, transcript);
  };

  return (
    <div className="space-y-4">
      {/* Scenario Selector */}
      <ScenarioSelector 
        categories={practiceCategories}
        selectedScenario={selectedScenario}
        onScenarioChange={handleScenarioChange}
        initialCategory={initialCategory}
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
          onRecordingComplete={handleRecordingComplete}
          onTranscriptUpdate={onTranscriptUpdate}
          onFeedbackUpdate={onFeedbackUpdate}
          enableRealtimeFeedback={enableRealtimeCoaching}
          maxDuration={120}
        />
      </div>
      
      {currentTranscript && !hasRecording && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-700/50">
          <Label className="text-sm text-muted-foreground">Live Transcript</Label>
          <p className="text-base mt-1">{currentTranscript}</p>
        </div>
      )}
    </div>
  );
};

export default PracticeControls;
