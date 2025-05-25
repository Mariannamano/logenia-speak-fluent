
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
  region: string;
  description: string;
  fintechFocus: string;
}

const cultures: CultureOption[] = [
  {
    id: "united-states",
    name: "United States",
    region: "North America",
    description: "Direct, efficiency-focused communication with emphasis on individual achievement and quick decision-making.",
    fintechFocus: "Focuses on disruption, scalability, and investor-driven metrics in fintech communication."
  },
  {
    id: "united-kingdom",
    name: "United Kingdom", 
    region: "Europe",
    description: "Diplomatic yet direct communication with strong emphasis on regulatory compliance and tradition.",
    fintechFocus: "Balances innovation with regulatory prudence, values established financial protocols."
  },
  {
    id: "germany",
    name: "Germany",
    region: "Europe", 
    description: "Precise, detail-oriented communication with thorough preparation and risk-averse approach.",
    fintechFocus: "Emphasizes technical precision, regulatory compliance, and systematic risk assessment in fintech."
  },
  {
    id: "singapore",
    name: "Singapore",
    region: "Asia Pacific",
    description: "Multicultural communication style blending Eastern respect with Western directness.",
    fintechFocus: "Hub mentality - positions fintech solutions for regional expansion and regulatory innovation."
  },
  {
    id: "india",
    name: "India",
    region: "Asia Pacific",
    description: "Relationship-focused communication with respect for hierarchy and detailed explanations.",
    fintechFocus: "Emphasizes financial inclusion, scalability for large populations, and cost-effectiveness."
  },
  {
    id: "china",
    name: "China",
    region: "Asia Pacific",
    description: "Context-rich communication with emphasis on long-term relationships and consensus-building.",
    fintechFocus: "Super-app ecosystem thinking, integration of financial services with daily life platforms."
  },
  {
    id: "japan",
    name: "Japan",
    region: "Asia Pacific",
    description: "Indirect, consensus-driven communication with high attention to detail and group harmony.",
    fintechFocus: "Values incremental innovation, customer service excellence, and integration with traditional systems."
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    region: "Middle East",
    description: "Formal, relationship-based communication with respect for hierarchy and Islamic principles.",
    fintechFocus: "Emphasizes Sharia-compliant fintech solutions and bridge between East and West markets."
  },
  {
    id: "south-africa",
    name: "South Africa",
    region: "Africa",
    description: "Ubuntu-influenced communication emphasizing community, inclusion, and collaborative problem-solving.",
    fintechFocus: "Focus on financial inclusion, mobile-first solutions, and addressing socioeconomic challenges."
  },
  {
    id: "nigeria",
    name: "Nigeria",
    region: "Africa",
    description: "Expressive, community-oriented communication with emphasis on relationships and collective benefit.",
    fintechFocus: "Mobile payments innovation, cross-border remittances, and financial access for underserved populations."
  },
  {
    id: "brazil",
    name: "Brazil",
    region: "Latin America",
    description: "Warm, relationship-focused communication with flexible approach to time and process.",
    fintechFocus: "Emphasizes financial inclusion, digital banking adoption, and PIX-style instant payment innovations."
  },
  {
    id: "mexico",
    name: "Mexico",
    region: "Latin America", 
    description: "Respectful, family-oriented communication with emphasis on personal connections and trust.",
    fintechFocus: "Cross-border fintech solutions, remittances, and serving unbanked populations."
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
            <SelectLabel>North America</SelectLabel>
            {cultures.filter(c => c.region === "North America").map((culture) => (
              <SelectItem key={culture.id} value={culture.id}>
                {culture.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            {cultures.filter(c => c.region === "Europe").map((culture) => (
              <SelectItem key={culture.id} value={culture.id}>
                {culture.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia Pacific</SelectLabel>
            {cultures.filter(c => c.region === "Asia Pacific").map((culture) => (
              <SelectItem key={culture.id} value={culture.id}>
                {culture.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Middle East</SelectLabel>
            {cultures.filter(c => c.region === "Middle East").map((culture) => (
              <SelectItem key={culture.id} value={culture.id}>
                {culture.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Africa</SelectLabel>
            {cultures.filter(c => c.region === "Africa").map((culture) => (
              <SelectItem key={culture.id} value={culture.id}>
                {culture.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Latin America</SelectLabel>
            {cultures.filter(c => c.region === "Latin America").map((culture) => (
              <SelectItem key={culture.id} value={culture.id}>
                {culture.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {selectedCultureObj && (
        <div className="space-y-2 mt-2">
          <p className="text-sm text-muted-foreground">
            {selectedCultureObj.description}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
              Fintech Context: {selectedCultureObj.fintechFocus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalContextSelector;
export { cultures };
