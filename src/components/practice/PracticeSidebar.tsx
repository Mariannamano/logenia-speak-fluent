
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import CultureTipCard from "@/components/CultureTipCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PracticeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          Tips to Reduce Filler Words
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Label htmlFor="show-tips" className="text-sm font-normal">
            {isOpen ? "Hide Tips" : "Show Tips"}
          </Label>
          <Switch
            id="show-tips"
            checked={isOpen}
            onCheckedChange={setIsOpen}
            aria-label={isOpen ? "Hide tips" : "Show tips"}
          />
        </div>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full"
        >
          <CollapsibleContent 
            className={cn(
              "overflow-hidden transition-all",
              isOpen ? "animate-accordion-down" : "animate-accordion-up"
            )}
          >
            <CardContent className="space-y-4 pt-4">
              <Tabs defaultValue="tips">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                  <TabsTrigger value="common">Common Fillers</TabsTrigger>
                </TabsList>
                <TabsContent value="tips" className="space-y-4 mt-4">
                  <CultureTipCard
                    region="Speech Clarity"
                    title="Reducing Filler Words"
                    description="How to speak more clearly and confidently."
                    doTips={[
                      "Pause instead of using fillers - silence is powerful",
                      "Practice speaking more slowly and deliberately",
                      "Record yourself to become aware of your speech patterns"
                    ]}
                    dontTips={[
                      "Rush your speech when feeling nervous",
                      "Focus too much on fillers during important conversations",
                      "Be too hard on yourself - this takes practice"
                    ]}
                  />
                  
                  <CultureTipCard
                    region="Professional Speaking"
                    title="Confident Communication"
                    description="Techniques for authoritative speaking."
                    doTips={[
                      "Prepare key points before important conversations",
                      "Take a deep breath before responding to questions",
                      "Use purposeful pauses instead of fillers"
                    ]}
                    dontTips={[
                      "Fill silence with unnecessary words",
                      "Speak too quickly when nervous",
                      "Apologize repeatedly for verbal mistakes"
                    ]}
                  />
                </TabsContent>
                <TabsContent value="common">
                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Common Filler Words to Avoid</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>"Um" and "Uh" - The most common fillers</li>
                        <li>"Like" - Especially common in casual speech</li>
                        <li>"You know" - Often used when seeking agreement</li>
                        <li>"Actually" and "Basically" - Unnecessary qualifiers</li>
                        <li>"Sort of" and "Kind of" - Reduce your authority</li>
                        <li>"I mean" and "So" - Redundant transitions</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Why We Use Fillers</h3>
                      <p className="text-sm text-muted-foreground">
                        We often use filler words when our brain needs time to catch up with our mouth. 
                        They're verbal placeholders while we think about what to say next. Being aware of 
                        them is the first step to eliminating them.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </CardHeader>
    </Card>
  );
};

export default PracticeSidebar;
