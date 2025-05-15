
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CultureTipCard from "@/components/CultureTipCard";
import { BookOpen, Search, BookIcon, Download } from "lucide-react";

const Resources = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Learning Resources</h1>
            <p className="text-muted-foreground">
              Expand your knowledge with our curated resources for better communication
            </p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                className="pl-10" 
                placeholder="Search resources..." 
              />
            </div>
          </div>
          
          <Tabs defaultValue="cultural-tips">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 mb-6">
              <TabsTrigger value="cultural-tips">Cultural Tips</TabsTrigger>
              <TabsTrigger value="phrase-guides">Phrase Guides</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cultural-tips" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CultureTipCard
                  region="North America"
                  title="Business Communication in the US"
                  description="Communication norms in American corporate settings."
                  doTips={[
                    "Be direct and get to the point quickly",
                    "Use active voice in your statements",
                    "Share your opinions confidently",
                    "Address people by their first names"
                  ]}
                  dontTips={[
                    "Be overly formal or hierarchical",
                    "Speak in a roundabout way",
                    "Avoid eye contact during conversations",
                    "Be afraid to ask clarifying questions"
                  ]}
                />
                
                <CultureTipCard
                  region="Japan"
                  title="Business Communication in Japan"
                  description="Navigating Japanese business etiquette."
                  doTips={[
                    "Be respectful of hierarchy and titles",
                    "Use polite, indirect phrasing",
                    "Allow for silence in conversations",
                    "Exchange business cards with both hands"
                  ]}
                  dontTips={[
                    "Rush straight to business matters",
                    "Be overly direct with criticism",
                    "Interrupt while others are speaking",
                    "Use casual language with seniors"
                  ]}
                />
                
                <CultureTipCard
                  region="European Union"
                  title="Business Communication in Europe"
                  description="Working effectively with European colleagues."
                  doTips={[
                    "Appreciate regional differences within Europe",
                    "Take time for relationship building",
                    "Be prepared for longer meetings",
                    "Use proper titles until invited to use first names"
                  ]}
                  dontTips={[
                    "Assume all European cultures are the same",
                    "Rush through pleasantries",
                    "Focus only on data without context",
                    "Use slang or American idioms excessively"
                  ]}
                />
                
                <CultureTipCard
                  region="India"
                  title="Business Communication in India"
                  description="Effective communication in Indian business contexts."
                  doTips={[
                    "Build relationships before focusing on tasks",
                    "Be flexible with schedules and deadlines",
                    "Use respectful titles like Sir/Madam",
                    "Understand indirect communication styles"
                  ]}
                  dontTips={[
                    "Be rigidly time-focused in all situations",
                    "Deliver criticism directly in group settings",
                    "Dismiss relationship-building as unimportant",
                    "Force quick decisions without consultation"
                  ]}
                />
                
                <CultureTipCard
                  region="Middle East"
                  title="Business Communication in the Middle East"
                  description="Cultural nuances for Middle Eastern business contexts."
                  doTips={[
                    "Invest time in personal relationships",
                    "Show respect for local customs and traditions",
                    "Be patient with decision-making processes",
                    "Appreciate the importance of hospitality"
                  ]}
                  dontTips={[
                    "Rush business discussions",
                    "Schedule meetings during prayer times",
                    "Use aggressive negotiation tactics",
                    "Ignore cultural and religious contexts"
                  ]}
                />
                
                <CultureTipCard
                  region="China"
                  title="Business Communication in China"
                  description="Navigating Chinese business relationships."
                  doTips={[
                    "Respect hierarchy and seniority",
                    "Practice patience in negotiations",
                    "Understand the concept of 'face' (mianzi)",
                    "Accept business cards with both hands"
                  ]}
                  dontTips={[
                    "Discuss sensitive political topics",
                    "Force quick decisions or public commitments",
                    "Ignore hierarchy in meetings or seating",
                    "Be overly casual in formal settings"
                  ]}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="phrase-guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BookIcon className="h-5 w-5 text-logenia-500" />
                      <CardTitle>Meeting Phrases</CardTitle>
                    </div>
                    <CardDescription>
                      Useful phrases for business meetings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <PhraseCategory 
                      title="Starting a Meeting" 
                      phrases={[
                        "Let's get started with today's agenda.",
                        "I'd like to welcome everyone to our meeting.",
                        "Thank you all for joining us today.",
                        "Before we begin, let me quickly introduce myself.",
                      ]}
                    />
                    
                    <PhraseCategory 
                      title="Sharing Ideas" 
                      phrases={[
                        "I'd like to suggest an alternative approach.",
                        "From my perspective, we should consider...",
                        "Building on what [Name] said, I think...",
                        "Let me share my thoughts on this matter.",
                      ]}
                    />
                    
                    <PhraseCategory 
                      title="When You Need Time" 
                      phrases={[
                        "Let me gather my thoughts for a moment.",
                        "That's an interesting question. Let me think about it.",
                        "I'd like to consider that point further.",
                        "Could you give me a moment to organize my response?",
                      ]}
                    />
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Full Phrase Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BookIcon className="h-5 w-5 text-logenia-500" />
                      <CardTitle>Presentation Phrases</CardTitle>
                    </div>
                    <CardDescription>
                      Smooth your presentations with these phrases
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <PhraseCategory 
                      title="Introduction" 
                      phrases={[
                        "Today, I'll be discussing three key aspects of...",
                        "I'm pleased to present our findings on...",
                        "The purpose of today's presentation is to...",
                        "By the end of this talk, you'll understand how...",
                      ]}
                    />
                    
                    <PhraseCategory 
                      title="Transitions" 
                      phrases={[
                        "Now, let's move on to the next point...",
                        "Having covered X, I'd like to turn to Y...",
                        "This brings us to the important issue of...",
                        "Let me shift our focus to another aspect...",
                      ]}
                    />
                    
                    <PhraseCategory 
                      title="Handling Questions" 
                      phrases={[
                        "That's a great question. Let me address that.",
                        "I appreciate you bringing that up. In my view...",
                        "Let me make sure I understand your question correctly.",
                        "I'd be happy to elaborate on that point.",
                      ]}
                    />
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Full Phrase Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface PhraseCategoryProps {
  title: string;
  phrases: string[];
}

const PhraseCategory = ({ title, phrases }: PhraseCategoryProps) => {
  return (
    <div>
      <h4 className="font-medium text-sm mb-2">{title}</h4>
      <ul className="space-y-1.5">
        {phrases.map((phrase, index) => (
          <li key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-logenia-200 dark:border-logenia-800">
            "{phrase}"
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
