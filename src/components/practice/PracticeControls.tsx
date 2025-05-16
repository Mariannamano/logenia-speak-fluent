
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecordingControl from "@/components/RecordingControl";
import ScenarioSelector from "@/components/ScenarioSelector";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import CulturalContextSelector from "@/components/practice/CulturalContextSelector";

interface PracticeControlsProps {
  onRecordingComplete: (audioBlob: Blob, transcript: string) => void;
  onTranscriptUpdate?: (transcript: string) => void;
  onFeedbackUpdate?: (feedback: any[]) => void;
  onDurationUpdate?: (durationInSeconds: number) => void;
  currentTranscript: string;
  enableRealtimeCoaching: boolean;
  setEnableRealtimeCoaching: (enabled: boolean) => void;
  hasRecording: boolean;
  initialCategory: string | null;
  culturalContext: string;
  onCultureChange: (cultureId: string) => void;
}

const PracticeControls = ({
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
  onCultureChange,
}: PracticeControlsProps) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(initialCategory);
  
  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    console.log("Selected scenario:", scenarioId);
  };
  
  const handleDurationUpdate = (elapsedTime: number) => {
    if (onDurationUpdate) {
      onDurationUpdate(elapsedTime);
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={selectedScenario ? "scenario" : "free"} className="space-y-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="free">Free Practice</TabsTrigger>
          <TabsTrigger value="scenario">Guided Scenario</TabsTrigger>
        </TabsList>
        
        <TabsContent value="free" className="space-y-4">
          <div className="text-muted-foreground">
            Practice any speech, presentation, or mock interview. Speak clearly into your microphone, and we'll provide instant feedback on filler words and speech patterns.
          </div>
          
          <div className="flex flex-wrap items-center gap-4 py-2">
            <CulturalContextSelector 
              value={culturalContext} 
              onChange={onCultureChange}
            />
            
            <div className="flex items-center space-x-2">
              <Switch
                id="coaching-mode"
                checked={enableRealtimeCoaching}
                onCheckedChange={setEnableRealtimeCoaching}
              />
              <Label htmlFor="coaching-mode">Real-time coaching</Label>
            </div>
          </div>
          
          <RecordingControl 
            onRecordingComplete={onRecordingComplete}
            onTranscriptUpdate={onTranscriptUpdate}
            onFeedbackUpdate={onFeedbackUpdate}
            enableRealtimeFeedback={enableRealtimeCoaching}
            maxDuration={120}
            onDurationUpdate={handleDurationUpdate}
          />
        </TabsContent>
        
        <TabsContent value="scenario" className="space-y-4">
          <ScenarioSelector 
            initialCategory={initialCategory} 
            onScenarioChange={handleScenarioChange}
          />
          
          <div className="flex flex-wrap items-center gap-4 py-2">
            <CulturalContextSelector 
              value={culturalContext} 
              onChange={onCultureChange}
            />
            
            <div className="flex items-center space-x-2">
              <Switch
                id="coaching-mode-scenario"
                checked={enableRealtimeCoaching}
                onCheckedChange={setEnableRealtimeCoaching}
              />
              <Label htmlFor="coaching-mode-scenario">Real-time coaching</Label>
            </div>
          </div>
          
          <RecordingControl 
            onRecordingComplete={onRecordingComplete}
            onTranscriptUpdate={onTranscriptUpdate}
            onFeedbackUpdate={onFeedbackUpdate}
            enableRealtimeFeedback={enableRealtimeCoaching}
            maxDuration={120}
            onDurationUpdate={handleDurationUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeControls;
