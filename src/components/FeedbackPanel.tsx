
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Info, Clock, VolumeIcon, BarChart, Globe } from "lucide-react";
import { SpeechAnalysis } from "@/services/coachingService";
import { cultures } from "@/components/practice/CulturalContextSelector";

interface FeedbackPanelProps {
  analysis?: SpeechAnalysis;
  isLoading?: boolean;
  culturalContext?: string;
}

const FeedbackPanel = ({ analysis, isLoading = false, culturalContext = "united-states" }: FeedbackPanelProps) => {
  // Find the culture object for the current context
  const currentCulture = cultures.find(c => c.id === culturalContext) || cultures[0];
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            Analyzing your speech...
          </CardTitle>
          <CardDescription className="text-lg">
            Our AI is analyzing your speech patterns and preparing feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-logenia-500"></div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl">
          <span className="flex items-center gap-2">
            Speech Analysis
            <Badge variant="outline" className="ml-2">
              <Info className="h-3.5 w-3.5 mr-1" />
              AI Coach
            </Badge>
          </span>
          
          {/* Cultural context badge */}
          <Badge variant="outline" className="bg-muted/50">
            <Globe className="h-3.5 w-3.5 mr-1" />
            {currentCulture.name} Context
          </Badge>
        </CardTitle>
        <CardDescription className="text-lg">
          Review your speech performance based on {currentCulture.name} communication norms
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
                value={`${analysis.clarity}%`} 
                description="Clear pronunciation" 
                icon={analysis.clarity > 70 ? 
                  <CheckCircle className="text-green-500" /> : 
                  <AlertCircle className="text-amber-500" />} 
              />
              <StatCard 
                title="Pacing" 
                value={analysis.pace} 
                description={`For ${currentCulture.name} style`}
                icon={<Clock className={analysis.pace === "good" ? "text-green-500" : "text-amber-500"} />} 
              />
              <StatCard 
                title="Structure" 
                value={`${analysis.structure}%`} 
                description="Logical flow" 
                icon={<BarChart className={analysis.structure > 70 ? "text-green-500" : "text-amber-500"} />} 
              />
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-lg flex items-center gap-2">
                <span>Cultural Context Feedback</span>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </h4>
              <div className="p-4 border rounded-md bg-muted/20">
                <p className="text-base">
                  <span className="font-medium">{currentCulture.name} communication norms:</span> {currentCulture.description}
                </p>
              </div>
              <h4 className="font-medium mb-2 mt-4 text-lg">Summary</h4>
              <p className="text-base text-muted-foreground">
                {analysis.summary}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="space-y-4 mt-4">
              {analysis.fillerWords.length > 0 && (
                <section>
                  <h4 className="font-medium mb-2 flex items-center text-lg">
                    <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                    Filler Words
                    <span className="text-sm font-normal ml-2 text-muted-foreground">
                      (Based on {currentCulture.name} standards)
                    </span>
                  </h4>
                  <div className="flex gap-2 flex-wrap ml-4">
                    {analysis.fillerWords.map((item, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-base py-2"
                      >
                        "{item.word}" ({item.count})
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-2 ml-4 text-base text-muted-foreground">
                    {currentCulture.id === "japan" ? 
                      "In Japanese communication, some pauses and fillers can indicate thoughtfulness, but excessive use may still distract listeners." :
                      currentCulture.id === "spain" ? 
                      "In Spanish communication, some filler words can add expressiveness, but clarity should still be maintained." :
                      currentCulture.id === "germany" ? 
                      "In German communication, precision is valued, and filler words should be minimized for clarity." :
                      currentCulture.id === "india" ? 
                      "In Indian communication, some repetition for emphasis is acceptable, but excessive fillers may reduce impact." :
                      "Try to replace these words with brief pauses to sound more confident and clear."}
                  </p>
                </section>
              )}
              
              <section>
                <h4 className="font-medium mb-2 flex items-center text-lg">
                  <VolumeIcon className="h-4 w-4 mr-2 text-purple-500" />
                  Clarity Analysis
                </h4>
                <div className="ml-4 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                      <div 
                        className="bg-purple-600 h-4 rounded-full" 
                        style={{ width: `${analysis.clarity}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-base font-medium">{analysis.clarity}%</span>
                  </div>
                </div>
                <p className="text-base text-muted-foreground mt-2 ml-4">
                  {analysis.clarity > 80 
                    ? `Your speech was very clear and easy to understand, aligning well with ${currentCulture.name} communication expectations.`
                    : analysis.clarity > 60
                      ? `Your speech was generally clear with room for improvement. In ${currentCulture.name} contexts, ${currentCulture.id === "united-states" ? "brevity and directness are" : currentCulture.id === "japan" ? "thoughtful delivery is" : currentCulture.id === "spain" ? "expressiveness is" : currentCulture.id === "germany" ? "precision and thoroughness are" : "balance of detail and respect are"} appreciated.`
                      : `Focus on speaking more clearly to meet ${currentCulture.name} communication expectations by ${currentCulture.id === "united-states" ? "being direct and concise" : currentCulture.id === "japan" ? "being measured and considerate" : currentCulture.id === "spain" ? "being engaging but clear" : currentCulture.id === "germany" ? "being precise and thorough" : "balancing context with core points"}.`}
                </p>
              </section>
              
              <section>
                <h4 className="font-medium mb-2 flex items-center text-lg">
                  <BarChart className="h-4 w-4 mr-2 text-blue-500" />
                  Structure Analysis
                </h4>
                <div className="ml-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-4 rounded-full" 
                        style={{ width: `${analysis.structure}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-base font-medium">{analysis.structure}%</span>
                  </div>
                </div>
                <p className="text-base text-muted-foreground mt-2 ml-4">
                  {analysis.structure > 80 
                    ? `Your ideas were well-structured and flowed logically, meeting ${currentCulture.name} expectations for ${currentCulture.id === "united-states" ? "direct and organized" : currentCulture.id === "japan" ? "thoughtful and harmonious" : currentCulture.id === "spain" ? "engaging and flowing" : currentCulture.id === "germany" ? "precise and thorough" : "contextual and respectful"} communication.`
                    : analysis.structure > 60
                      ? `Your structure was decent but could be more ${currentCulture.id === "united-states" ? "direct and concise" : currentCulture.id === "japan" ? "building context before conclusions" : currentCulture.id === "spain" ? "expressive with good flow" : currentCulture.id === "germany" ? "logically organized with supporting evidence" : "balanced between context and core points"}.`
                      : `Try organizing your thoughts with a ${currentCulture.id === "united-states" ? "clearer beginning, middle, and end with main points upfront" : currentCulture.id === "japan" ? "more contextual introduction that builds to your conclusions" : currentCulture.id === "spain" ? "more engaging narrative structure with emotional connection" : currentCulture.id === "germany" ? "more logical sequence with clear supporting evidence" : "better balance of contextual information and core message"}.`}
                </p>
              </section>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <div className="space-y-4 mt-4">
              <h4 className="font-medium mb-2 text-lg">Improvement Suggestions</h4>
              <div className="p-3 bg-muted/30 rounded-md mb-4">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Suggestions are tailored to {currentCulture.name} communication style
                </p>
              </div>
              <div className="space-y-3">
                {analysis.suggestions.map((suggestion, index) => (
                  <SuggestionItem 
                    key={index}
                    title={`Suggestion ${index + 1}`}
                    description={suggestion}
                    priority={index === 0 ? "high" : "medium"}
                  />
                ))}
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
        <h3 className="text-base font-medium">{title}</h3>
        <div className="h-5 w-5">{icon}</div>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
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
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Focus Area</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">Consider This</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Suggestion</Badge>;
    }
  };
  
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h5 className="font-medium text-base">{title}</h5>
        {getPriorityBadge()}
      </div>
      <p className="text-base text-muted-foreground mt-2">{description}</p>
    </div>
  );
};

export default FeedbackPanel;
