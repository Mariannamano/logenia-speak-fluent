
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mic } from "lucide-react";
import RecordingControl from "@/components/RecordingControl";
import ScenarioSelector, { Scenario } from "@/components/ScenarioSelector";
import { fintechCategories } from "@/data/fintechScenarios";
import { useToast } from "@/hooks/use-toast";
import CulturalContextSelector from "./CulturalContextSelector";
import RegulatoryContextSelector from "./RegulatoryContextSelector";

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
  culturalContext: string;
  onCultureChange: (culture: string) => void;
  regulatoryContext: string;
  onRegulatoryChange: (context: string) => void;
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
  culturalContext,
  onCultureChange,
  regulatoryContext,
  onRegulatoryChange,
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

  const handleCultureChange = (cultureId: string) => {
    onCultureChange(cultureId);
    toast({
      title: "Cultural Context Updated",
      description: `Feedback will now be tailored for ${cultureId.replace("-", " ")} communication norms.`,
    });
  };

  const handleRegulatoryChange = (contextId: string) => {
    onRegulatoryChange(contextId);
    toast({
      title: "Regulatory Context Updated", 
      description: `Scenarios will now reflect ${contextId.toUpperCase()} regulatory framework.`,
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
        categories={fintechCategories}
        selectedScenario={selectedScenario}
        onScenarioChange={handleScenarioChange}
        initialCategory={initialCategory}
      />
      
      {/* Context Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CulturalContextSelector
          selectedCulture={culturalContext}
          onCultureChange={handleCultureChange}
        />
        
        <RegulatoryContextSelector
          selectedContext={regulatoryContext}
          onContextChange={handleRegulatoryChange}
        />
      </div>
      
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
