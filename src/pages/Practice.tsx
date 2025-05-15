
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecordingControl from "@/components/RecordingControl";
import FeedbackPanel from "@/components/FeedbackPanel";
import CultureTipCard from "@/components/CultureTipCard";
import RealtimeFeedback from "@/components/RealtimeFeedback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mic, Info, Book } from "lucide-react";

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
  const [fillerWordCount, setFillerWordCount] = useState(0);
  
  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log("Recording completed:", audioBlob);
    setHasRecording(true);
  };
  
  const handleTranscriptUpdate = (transcript: string) => {
    setCurrentTranscript(transcript);
    console.log("Updated transcript:", transcript);
  };
  
  const handleFeedbackUpdate = (feedback: FeedbackItem[]) => {
    // Count filler word feedback items
    const newFillerWords = feedback.filter(item => item.type === "filler").length;
    if (newFillerWords > 0) {
      setFillerWordCount(prev => prev + newFillerWords);
    }
    
    setRealtimeFeedback(feedback);
    setShowFeedback(true);
    
    // Hide feedback after 8 seconds
    setTimeout(() => {
      setShowFeedback(false);
    }, 8000);
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
                        Filler Word Reduction Training
                        <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Speech Clarity
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Practice speaking while the app detects your filler words in real-time and helps you improve.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Book className="h-4 w-4" />
                        How It Works
                      </Label>
                      <div className="mt-2 bg-muted p-4 rounded-md text-sm">
                        <p>Start speaking and we'll detect filler words like "um", "uh", "like", etc. You'll get real-time 
                        feedback to help you become aware of these words and suggestions for improving your speech clarity.</p>
                        <p className="mt-2">Current filler word count: <span className="font-bold">{fillerWordCount}</span></p>
                      </div>
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
                        <Mic className="h-4 w-4" />
                        Start Speaking
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
            
            {/* Right Column - Tips */}
            <div className="lg:w-1/3 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Tips to Reduce Filler Words
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
              </Card>
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
