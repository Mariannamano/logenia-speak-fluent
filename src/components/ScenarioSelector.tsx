
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export interface Scenario {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
}

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  selectedScenario: Scenario | null;
  onScenarioChange: (scenario: Scenario) => void;
}

const ScenarioSelector = ({
  scenarios,
  selectedScenario,
  onScenarioChange,
}: ScenarioSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="h-4 w-4" />
        <Label>Select Practice Scenario</Label>
      </div>
      
      <Select
        value={selectedScenario?.id || ""}
        onValueChange={(value) => {
          const selected = scenarios.find(s => s.id === value);
          if (selected) onScenarioChange(selected);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a scenario to practice" />
        </SelectTrigger>
        <SelectContent>
          {scenarios.map((scenario) => (
            <SelectItem key={scenario.id} value={scenario.id}>
              {scenario.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedScenario && (
        <Card className="mt-4 bg-muted/50">
          <CardContent className="pt-4">
            <h4 className="font-medium mb-1">{selectedScenario.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{selectedScenario.description}</p>
            <div className="bg-background p-3 rounded-md border">
              <Label className="text-xs">Your prompt:</Label>
              <p className="text-sm mt-1">{selectedScenario.prompt}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScenarioSelector;
