
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Info, Clock, VolumeIcon } from "lucide-react";

// This is a mock component that would display feedback
// In a real app, this would receive actual analysis data
const FeedbackPanel = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Speech Analysis
          <Badge variant="outline" className="ml-2">
            <Info className="h-3.5 w-3.5 mr-1" />
            Draft
          </Badge>
        </CardTitle>
        <CardDescription>
          Review your speech performance and areas for improvement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard 
                title="Clarity" 
                value="85%" 
                description="Clear pronunciation" 
                icon={<CheckCircle className="text-green-500" />} 
              />
              <StatCard 
                title="Pacing" 
                value="122" 
                description="Words per minute" 
                icon={<Clock className="text-amber-500" />} 
              />
              <StatCard 
                title="Filler Words" 
                value="7" 
                description="Detected in speech" 
                icon={<AlertCircle className="text-red-500" />} 
              />
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Summary</h4>
              <p className="text-sm text-muted-foreground">
                Your speech was generally clear with good pronunciation. You maintained a moderate pace that was easy to follow.
                Consider reducing the use of filler words like "um" and "you know" that appeared 7 times in your recording.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="space-y-4 mt-4">
              <section>
                <h4 className="font-medium mb-2 flex items-center">
                  <VolumeIcon className="h-4 w-4 mr-2 text-logenia-500" />
                  Pronunciation Issues
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>"Specifically" - pronounced as "spesi-fi-cly"</li>
                  <li>"Development" - stress on wrong syllable</li>
                </ul>
              </section>
              
              <section>
                <h4 className="font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  Pacing Analysis
                </h4>
                <p className="text-sm text-muted-foreground ml-4">
                  Your pace varied between 110-140 words per minute. Ideal range for presentations is 120-150 wpm.
                  You slowed down appropriately when explaining complex concepts.
                </p>
              </section>
              
              <section>
                <h4 className="font-medium mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Filler Words
                </h4>
                <div className="flex gap-2 flex-wrap ml-4">
                  <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                    "um" (4)
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                    "like" (2)
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                    "you know" (1)
                  </Badge>
                </div>
              </section>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <div className="space-y-4 mt-4">
              <h4 className="font-medium mb-2">Improvement Suggestions</h4>
              
              <div className="space-y-3">
                <SuggestionItem 
                  title="Practice Specific Pronunciation"
                  description="Focus on pronouncing 'specifically' with all syllables clear - 'spe-ci-fi-cal-ly'"
                  priority="high"
                />
                
                <SuggestionItem 
                  title="Reduce Filler Words"
                  description="Replace 'um' with a brief pause instead. When you feel the urge to say 'um', try to remain silent instead."
                  priority="high"
                />
                
                <SuggestionItem 
                  title="Sentence Structure for Clarity"
                  description="Use shorter sentences when explaining technical concepts. Your longer sentences can be difficult to follow."
                  priority="medium"
                />
                
                <SuggestionItem 
                  title="Cultural Context Tip"
                  description="For international audiences, your pace is appropriate, but consider adding more pauses between key points."
                  priority="low"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="h-5 w-5">{icon}</div>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

interface SuggestionItemProps {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

const SuggestionItem = ({ title, description, priority }: SuggestionItemProps) => {
  const getPriorityBadge = () => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Suggestion</Badge>;
    }
  };
  
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <h5 className="font-medium">{title}</h5>
        {getPriorityBadge()}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default FeedbackPanel;
