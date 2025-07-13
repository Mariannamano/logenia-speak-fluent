import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CultureOption {
  id: string;
  name: string;
  description: string;
}

const cultures: CultureOption[] = [
  {
    id: "american",
    name: "🇺🇸 American",
    description: "Direct, informal, confident communication style"
  },
  {
    id: "british",
    name: "🇬🇧 British",
    description: "Polite, understated, with subtle humor"
  },
  {
    id: "japanese",
    name: "🇯🇵 Japanese",
    description: "Respectful, humble, indirect communication"
  },
  {
    id: "german",
    name: "🇩🇪 German",
    description: "Precise, formal, structured approach"
  },
  {
    id: "spanish",
    name: "🇪🇸 Spanish",
    description: "Warm, expressive, relationship-focused"
  },
  {
    id: "french",
    name: "🇫🇷 French",
    description: "Elegant, sophisticated, debate-oriented"
  },
  {
    id: "australian",
    name: "🇦🇺 Australian",
    description: "Casual, straightforward, friendly approach"
  },
  {
    id: "canadian",
    name: "🇨🇦 Canadian",
    description: "Polite, inclusive, diplomatic style"
  }
];

interface CulturalContextSelectorProps {
  selectedCulture: string;
  onCultureChange: (cultureId: string) => void;
}

const CulturalContextSelector = ({ selectedCulture, onCultureChange }: CulturalContextSelectorProps) => {
  const selectedCultureData = cultures.find(c => c.id === selectedCulture);

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-lg">
        <Globe className="h-5 w-5" />
        Cultural Context
      </Label>
      
      <Select value={selectedCulture} onValueChange={onCultureChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a cultural communication style" />
        </SelectTrigger>
        <SelectContent>
          {cultures.map((culture) => (
            <SelectItem key={culture.id} value={culture.id}>
              <div className="flex flex-col items-start">
                <span className="font-medium">{culture.name}</span>
                <span className="text-xs text-muted-foreground">{culture.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedCultureData && (
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
          <strong>{selectedCultureData.name}:</strong> {selectedCultureData.description}
        </div>
      )}
    </div>
  );
};

export default CulturalContextSelector;
export { cultures };
export type { CultureOption };