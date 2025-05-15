
import React, { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Book, MessageSquare, Presentation } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Scenario {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
}

export interface ScenarioCategory {
  id: string;
  name: string;
  description: string;
  scenarios: Scenario[];
}

interface ScenarioSelectorProps {
  categories: ScenarioCategory[];
  selectedScenario: Scenario | null;
  onScenarioChange: (scenario: Scenario) => void;
  initialCategory?: string | null;
}

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case "professional":
      return <Briefcase className="h-4 w-4" />;
    case "storytelling":
      return <Book className="h-4 w-4" />;
    case "opinions":
      return <MessageSquare className="h-4 w-4" />;
    case "presenting":
      return <Presentation className="h-4 w-4" />;
    default:
      return <Book className="h-4 w-4" />;
  }
};

const getCategoryShortName = (categoryId: string) => {
  switch (categoryId) {
    case "professional":
      return "Work";
    case "storytelling":
      return "Story";
    case "opinions":
      return "Debate";
    case "presenting":
      return "Present";
    default:
      return categoryId;
  }
};

const ScenarioSelector = ({
  categories,
  selectedScenario,
  onScenarioChange,
  initialCategory = null,
}: ScenarioSelectorProps) => {
  // Find the default category
  const defaultCategory = initialCategory && categories.find(cat => cat.id === initialCategory)
    ? initialCategory 
    : categories[0]?.id || "";
    
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // Update active category when initialCategory changes
  useEffect(() => {
    if (initialCategory && categories.some(cat => cat.id === initialCategory)) {
      setActiveCategory(initialCategory);
      console.log("Setting active category in ScenarioSelector:", initialCategory);
    }
  }, [initialCategory, categories]);

  const currentCategory = categories.find(cat => cat.id === activeCategory) || categories[0];
  const scenarios = currentCategory?.scenarios || [];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        {getCategoryIcon(activeCategory)}
        <Label>Select Practice Scenario</Label>
      </div>
      
      <Tabs 
        value={activeCategory} 
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <ScrollArea className="w-full pb-2">
          <TabsList className="grid grid-cols-4 w-full">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="flex items-center gap-2"
              >
                {getCategoryIcon(cat.id)}
                <span className="hidden sm:inline">{cat.name.split(' ')[0]}</span>
                <span className="sm:hidden">
                  {getCategoryShortName(cat.id)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>
        
        {categories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="mt-4">
            <Card className="bg-muted/30">
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {cat.description}
                </p>
                
                <Select
                  value={selectedScenario?.id || ""}
                  onValueChange={(value) => {
                    const selected = cat.scenarios.find(s => s.id === value);
                    if (selected) onScenarioChange(selected);
                  }}
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Choose a scenario to practice" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-[200px]">
                      <SelectGroup>
                        <SelectLabel>{cat.name}</SelectLabel>
                        {cat.scenarios.map((scenario) => (
                          <SelectItem key={scenario.id} value={scenario.id}>
                            {scenario.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {selectedScenario && (
        <Card className="mt-4 bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium">{selectedScenario.title}</h4>
              <Badge variant="outline">{selectedScenario.category}</Badge>
            </div>
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
