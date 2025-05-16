import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock, Loader2 } from "lucide-react";
import { SpeechAnalysis } from '@/services/coachingService';

interface AnswerProcessorProps {
  question: string;
  answer: string;
  isProcessing: boolean;
  onSubmit: (answer: string) => void;
  analysis?: SpeechAnalysis;
}

const AnswerProcessor: React.FC<AnswerProcessorProps> = ({
  question,
  answer,
  isProcessing,
  onSubmit,
  analysis
}) => {
  const [userAnswer, setUserAnswer] = useState(answer);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    setUserAnswer(answer);
  }, [answer]);
  
  const handleSubmit = () => {
    onSubmit(userAnswer);
    setIsEditing(false);
  };
  
  const renderAnalysisContent = () => {
    if (isProcessing) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-sm">Analyzing your answer...</p>
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      );
    }
    
    if (!analysis) {
      return (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No analysis available yet.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pace: {analysis.pace === "good" ? "Good" : analysis.pace === "slow" ? "Slow" : analysis.pace === "fast" ? "Fast" : analysis.pace}
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1">
            Clarity: {analysis.clarity}%
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1">
            Structure: {analysis.structure}%
          </Badge>
          
          {analysis.fillerWords.length > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              Filler Words: {analysis.fillerWords.reduce((sum, item) => sum + item.count, 0)}
            </Badge>
          )}
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Summary</h4>
          <p className="text-sm text-muted-foreground">{analysis.summary}</p>
        </div>
        
        {analysis.suggestions.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Suggestions</h4>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm flex gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {analysis.fillerWords.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Filler Words</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.fillerWords.map((item, index) => (
                <Badge key={index} variant="outline" className="bg-red-50 dark:bg-red-900/20">
                  {item.word} ({item.count})
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
        <CardDescription>
          Your response to this question
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="answer">
        <div className="px-6">
          <TabsList className="mb-2">
            <TabsTrigger value="answer">Your Answer</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="answer">
          <CardContent>
            {isEditing ? (
              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[150px]"
              />
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                {userAnswer ? (
                  <p className="whitespace-pre-wrap">{userAnswer}</p>
                ) : (
                  <p className="text-muted-foreground italic">No answer provided yet.</p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Answer"}
            </Button>
            
            {isEditing && (
              <Button onClick={handleSubmit}>
                Save Answer
              </Button>
            )}
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="analysis">
          <CardContent>
            {renderAnalysisContent()}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AnswerProcessor;
