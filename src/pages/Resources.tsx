
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CultureTipCard from "@/components/CultureTipCard";
import { BookOpen, Search, GlobeIcon, BookIcon, PlayIcon, Download, ExternalLink } from "lucide-react";

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
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-6">
              <TabsTrigger value="cultural-tips">Cultural Tips</TabsTrigger>
              <TabsTrigger value="phrase-guides">Phrase Guides</TabsTrigger>
              <TabsTrigger value="articles">Articles & Guides</TabsTrigger>
              <TabsTrigger value="videos">Video Lessons</TabsTrigger>
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
            
            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard 
                  title="Reducing Filler Words in Professional Speech"
                  type="Article"
                  author="Communication Academy"
                  time="8 min read"
                />
                
                <ResourceCard 
                  title="English Idioms in Business Contexts"
                  type="Guide"
                  author="Business English Institute"
                  time="15 min read"
                />
                
                <ResourceCard 
                  title="The Art of Clear Technical Explanations"
                  type="Article"
                  author="Tech Communication Blog"
                  time="12 min read"
                />
                
                <ResourceCard 
                  title="How to Handle Difficult Questions in Meetings"
                  type="Guide"
                  author="Professional Speaking Institute"
                  time="10 min read"
                />
                
                <ResourceCard 
                  title="Adapting Your Communication Style for Global Teams"
                  type="Article"
                  author="International Business Review"
                  time="7 min read"
                />
                
                <ResourceCard 
                  title="Body Language in Virtual Meetings"
                  type="Guide"
                  author="Remote Work Experts"
                  time="9 min read"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VideoResourceCard 
                  title="Mastering Business Small Talk"
                  duration="14:25"
                  instructor="Claire Johnson"
                  level="Intermediate"
                />
                
                <VideoResourceCard 
                  title="How to Explain Complex Concepts Simply"
                  duration="8:37"
                  instructor="Dr. Michael Chen"
                  level="Advanced"
                />
                
                <VideoResourceCard 
                  title="Presentation Opening Techniques"
                  duration="11:52"
                  instructor="Sarah Williams"
                  level="Beginner"
                />
                
                <VideoResourceCard 
                  title="Improving Your Speech Clarity"
                  duration="16:40"
                  instructor="Robert Taylor"
                  level="All Levels"
                />
                
                <VideoResourceCard 
                  title="Cultural Differences in Business Communication"
                  duration="21:15"
                  instructor="Elena Rodriguez"
                  level="Intermediate"
                />
                
                <VideoResourceCard 
                  title="Reducing Nervousness in Speech"
                  duration="9:48"
                  instructor="James Wilson"
                  level="Beginner"
                />
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

interface ResourceCardProps {
  title: string;
  type: string;
  author: string;
  time: string;
}

const ResourceCard = ({ title, type, author, time }: ResourceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="bg-muted h-36 flex items-center justify-center">
        <BookOpen className="h-10 w-10 text-muted-foreground opacity-50" />
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex flex-col gap-1">
            <span>{type} • {author}</span>
            <span>{time}</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Open resource</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface VideoResourceCardProps {
  title: string;
  duration: string;
  instructor: string;
  level: string;
}

const VideoResourceCard = ({ title, duration, instructor, level }: VideoResourceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="relative">
        <div className="bg-muted h-40 flex items-center justify-center">
          <PlayIcon className="h-10 w-10 text-muted-foreground opacity-50" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
          {duration}
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex flex-col gap-1">
            <span>{instructor}</span>
            <span>Level: {level}</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <PlayIcon className="h-4 w-4" />
            <span className="sr-only">Play video</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Resources;
