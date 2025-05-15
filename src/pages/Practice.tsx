import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecordingControl from "@/components/RecordingControl";
import FeedbackPanel from "@/components/FeedbackPanel";
import CultureTipCard from "@/components/CultureTipCard";
import RealtimeFeedback from "@/components/RealtimeFeedback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Clock, Users, Book, MicIcon, GlobeIcon, Info, PlayIcon } from "lucide-react";

interface FeedbackItem {
  type: "filler" | "followup";
  content: string;
}

const Practice = () => {
  const [hasRecording, setHasRecording] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [realtimeFeedback, setRealtimeFeedback] = useState<FeedbackItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [enableRealtimeCoaching, setEnableRealtimeCoaching] = useState(true);
  
  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log("Recording completed:", audioBlob);
    setHasRecording(true);
    // In a real app, we would send this to a server for processing
  };
  
  const handleTranscriptUpdate = (transcript: string) => {
    setCurrentTranscript(transcript);
    console.log("Updated transcript:", transcript);
  };
  
  const handleFeedbackUpdate = (feedback: FeedbackItem[]) => {
    setRealtimeFeedback(feedback);
    setShowFeedback(true);
    
    // Hide feedback after 10 seconds
    setTimeout(() => {
      setShowFeedback(false);
    }, 10000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Practice Area */}
            <div className="flex-1">
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Business Meeting Introduction
                        <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Beginner
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Practice introducing yourself and your role in a professional meeting context.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>5-10 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>Solo Practice</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GlobeIcon className="h-3.5 w-3.5" />
                      <span>Global Business Context</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Book className="h-4 w-4" />
                        Scenario
                      </Label>
                      <div className="mt-2 bg-muted p-4 rounded-md text-sm">
                        You are attending an international business meeting with new clients from different countries. 
                        You need to introduce yourself, your role in the company, and briefly explain what your 
                        company does. Keep your introduction professional, clear, and concise.
                      </div>
                    </div>
                    
                    <div>
                      <Label>Sample Script (Optional)</Label>
                      <Textarea 
                        className="mt-2"
                        placeholder="Hello everyone, I'm [Your Name]..."
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        You can use this as a starting point or create your own introduction.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-coaching" className="flex items-center gap-2 cursor-pointer">
                        <span>Enable Real-time Coaching</span>
                      </Label>
                      <Switch 
                        id="enable-coaching" 
                        checked={enableRealtimeCoaching} 
                        onCheckedChange={setEnableRealtimeCoaching}
                      />
                    </div>
                    
                    <div className="border-t pt-4">
                      <Label className="mb-2 flex items-center gap-2">
                        <MicIcon className="h-4 w-4" />
                        Recording
                      </Label>
                      <RecordingControl 
                        onRecordingComplete={handleRecordingComplete}
                        onTranscriptUpdate={handleTranscriptUpdate}
                        onFeedbackUpdate={handleFeedbackUpdate}
                        enableRealtimeFeedback={enableRealtimeCoaching}
                        maxDuration={120}
                      />
                    </div>
                    
                    {currentTranscript && (
                      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                        <Label className="text-xs text-muted-foreground">Live Transcript</Label>
                        <p className="text-sm mt-1">{currentTranscript}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Feedback appears after recording */}
              {hasRecording && (
                <FeedbackPanel />
              )}
            </div>
            
            {/* Right Column - Context and Tips */}
            <div className="lg:w-1/3 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Practice Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="context">Cultural Context</Label>
                    <Select defaultValue="global">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select context" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global (General)</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="eu">European Union</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                        <SelectItem value="cn">China</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="focus">Feedback Focus</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select focus areas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Areas</SelectItem>
                        <SelectItem value="pronunciation">Pronunciation</SelectItem>
                        <SelectItem value="filler">Filler Words</SelectItem>
                        <SelectItem value="pacing">Pacing & Rhythm</SelectItem>
                        <SelectItem value="structure">Sentence Structure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full bg-logenia-500 hover:bg-logenia-600">
                    Apply Settings
                  </Button>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="tips">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tips">Cultural Tips</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                <TabsContent value="tips" className="space-y-4 mt-4">
                  <CultureTipCard
                    region="Global Business"
                    title="Business Introductions"
                    description="How to introduce yourself effectively in international business contexts."
                    doTips={[
                      "State your full name clearly and your role in the company",
                      "Briefly explain what your company/team does in simple terms",
                      "Mention any relevant experience related to the meeting topic"
                    ]}
                    dontTips={[
                      "Use too many technical terms or industry jargon",
                      "Share overly personal information",
                      "Speak too quickly when stating your name and title"
                    ]}
                  />
                  
                  <CultureTipCard
                    region="East Asian Context"
                    title="Formal Business Etiquette"
                    description="Communicating with Japanese, Chinese, or Korean colleagues."
                    doTips={[
                      "Be more formal in your introduction",
                      "Show respect for hierarchy and titles",
                      "Use a moderate, measured pace of speech"
                    ]}
                    dontTips={[
                      "Be overly casual or use slang",
                      "Speak too directly about problems or challenges",
                      "Rush through your introduction"
                    ]}
                  />
                </TabsContent>
                <TabsContent value="examples">
                  <div className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <PlayIcon className="h-4 w-4 text-logenia-500" />
                        <h3 className="font-medium">Strong Introduction Example</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Hello everyone, I'm Sarah Johnson, the Senior Marketing Director at TechSolutions. 
                        Our company specializes in cloud security software for enterprise businesses. 
                        I've been working with international clients for over five years, and I'm looking 
                        forward to exploring how our services might address your security needs."
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <PlayIcon className="h-4 w-4 text-logenia-500" />
                        <h3 className="font-medium">Clear and Concise Example</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Good morning. My name is David Chen from Innovate Solutions. I'm the Lead Project Manager 
                        for the Eastern Region. Our company develops custom software solutions for the healthcare 
                        industry. I'm here today to discuss how we might help streamline your patient management processes."
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      {/* Real-time Feedback Component */}
      <RealtimeFeedback 
        feedback={realtimeFeedback} 
        isVisible={showFeedback} 
      />
      
      <Footer />
    </div>
  );
};

export default Practice;
