
import { useState } from "react";
import { Scale } from "lucide-react";
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

export interface RegulatoryContext {
  id: string;
  name: string;
  region: string;
  description: string;
  keyFocus: string[];
}

const regulatoryContexts: RegulatoryContext[] = [
  {
    id: "sec-usa",
    name: "SEC (United States)",
    region: "North America",
    description: "Securities and Exchange Commission - Focus on investor protection and market integrity",
    keyFocus: ["Securities regulations", "AML/BSA compliance", "Consumer protection", "Market surveillance"]
  },
  {
    id: "sebi-india",
    name: "SEBI (India)",
    region: "Asia Pacific",
    description: "Securities and Exchange Board of India - Emphasis on retail investor protection",
    keyFocus: ["Capital market regulations", "Mutual fund oversight", "Digital payments", "Financial inclusion"]
  },
  {
    id: "mas-singapore",
    name: "MAS (Singapore)",
    region: "Asia Pacific",
    description: "Monetary Authority of Singapore - Innovation-friendly regulatory approach",
    keyFocus: ["Fintech sandbox", "Digital banking", "Crypto regulations", "Cross-border payments"]
  },
  {
    id: "fca-uk",
    name: "FCA (United Kingdom)",
    region: "Europe",
    description: "Financial Conduct Authority - Consumer protection and market conduct focus",
    keyFocus: ["Open banking", "Consumer duty", "Market conduct", "Innovation hub"]
  },
  {
    id: "dfsa-uae",
    name: "DFSA (UAE)",
    region: "Middle East",
    description: "Dubai Financial Services Authority - Islamic finance and innovation focus",
    keyFocus: ["Islamic finance", "Crypto assets", "Regulatory laboratory", "Prudential standards"]
  },
  {
    id: "fsca-south-africa",
    name: "FSCA (South Africa)",
    region: "Africa",
    description: "Financial Sector Conduct Authority - Financial inclusion and protection focus",
    keyFocus: ["Financial inclusion", "Consumer protection", "Crypto guidance", "Market conduct"]
  },
  {
    id: "bafin-germany",
    name: "BaFin (Germany)",
    region: "Europe",
    description: "Federal Financial Supervisory Authority - Strict prudential oversight",
    keyFocus: ["Banking supervision", "Insurance regulation", "Securities oversight", "Payment services"]
  }
];

interface RegulatoryContextSelectorProps {
  selectedContext: string;
  onContextChange: (contextId: string) => void;
}

const RegulatoryContextSelector = ({ 
  selectedContext, 
  onContextChange 
}: RegulatoryContextSelectorProps) => {
  const selectedContextObj = regulatoryContexts.find(c => c.id === selectedContext);
  
  return (
    <div className="space-y-2">
      <Label htmlFor="regulatory-context" className="flex items-center gap-2 text-lg">
        <Scale className="h-5 w-5" />
        <span>Regulatory Context</span>
      </Label>
      
      <Select value={selectedContext} onValueChange={onContextChange}>
        <SelectTrigger id="regulatory-context" className="w-full">
          <SelectValue placeholder="Select regulatory framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            {regulatoryContexts.filter(c => c.region === "North America").map((context) => (
              <SelectItem key={context.id} value={context.id}>
                {context.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            {regulatoryContexts.filter(c => c.region === "Europe").map((context) => (
              <SelectItem key={context.id} value={context.id}>
                {context.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia Pacific</SelectLabel>
            {regulatoryContexts.filter(c => c.region === "Asia Pacific").map((context) => (
              <SelectItem key={context.id} value={context.id}>
                {context.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Middle East</SelectLabel>
            {regulatoryContexts.filter(c => c.region === "Middle East").map((context) => (
              <SelectItem key={context.id} value={context.id}>
                {context.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Africa</SelectLabel>
            {regulatoryContexts.filter(c => c.region === "Africa").map((context) => (
              <SelectItem key={context.id} value={context.id}>
                {context.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {selectedContextObj && (
        <div className="space-y-2 mt-2">
          <p className="text-sm text-muted-foreground">
            {selectedContextObj.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedContextObj.keyFocus.map((focus, index) => (
              <span 
                key={index}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegulatoryContextSelector;
export { regulatoryContexts };
