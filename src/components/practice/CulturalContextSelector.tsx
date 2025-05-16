
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface CultureOption {
  id: string;
  name: string;
  description: string;
}

const cultures: CultureOption[] = [
  {
    id: "united-states",
    name: "United States",
    description: "Emphasizes brevity, clarity, and direct communication."
  },
  {
    id: "japan",
    name: "Japan",
    description: "Values thoughtful pauses, indirect communication, and group harmony."
  },
  {
    id: "spain",
    name: "Spain",
    description: "Appreciates expressive delivery with animated gestures and tone variations."
  },
  {
    id: "germany",
    name: "Germany",
    description: "Focuses on precision, thoroughness, and structured communication."
  },
  {
    id: "india",
    name: "India",
    description: "Balances storytelling, respect-based communication, and contextual details."
  }
];

interface CulturalContextSelectorProps {
  selectedCulture: string;
  onCultureChange: (cultureId: string) => void;
}

const CulturalContextSelector = ({ 
  selectedCulture, 
  onCultureChange 
}: CulturalContextSelectorProps) => {
  // Find the selected culture object for displaying description
  const selectedCultureObj = cultures.find(c => c.id === selectedCulture);
  
  return (
    <div className="space-y-2">
      <Label htmlFor="cultural-context" className="flex items-center gap-2 text-lg">
        <Globe className="h-5 w-5" />
        <span>Cultural Context</span>
      </Label>
      
      <Select value={selectedCulture} onValueChange={onCultureChange}>
        <SelectTrigger id="cultural-context" className="w-full">
          <SelectValue placeholder="Select cultural context" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cultural Context</SelectLabel>
            {cultures.map((culture) => (
              <SelectItem key={culture.id} value={culture.id}>
                {culture.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {selectedCultureObj && (
        <p className="text-sm text-muted-foreground mt-1">
          {selectedCultureObj.description}
        </p>
      )}
    </div>
  );
};

export default CulturalContextSelector;
export { cultures };
