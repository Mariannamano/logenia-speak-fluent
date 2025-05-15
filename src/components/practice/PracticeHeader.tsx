
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";
import { Label } from "@/components/ui/label";

interface PracticeHeaderProps {
  fillerWordCount: number;
}

const PracticeHeader = ({ fillerWordCount }: PracticeHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-2xl">
            Filler Word Reduction Training
            <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Speech Clarity
            </Badge>
          </CardTitle>
          <CardDescription className="text-lg mt-1">
            Practice speaking while the app detects your filler words in real-time and helps you improve.
          </CardDescription>
        </div>
      </div>
      
      <div className="mt-6">
        <Label className="flex items-center gap-2 text-xl">
          <Book className="h-5 w-5" />
          How It Works
        </Label>
        <div className="mt-2 bg-purple-100 dark:bg-purple-900/30 p-5 rounded-md text-lg border border-purple-200 dark:border-purple-700/50">
          <p>
            Simulate workplace moments that require clear, concise, confident speaking — when you're likely to ramble or reach for filler words.
          </p>
          <p className="mt-3">
            Start speaking and we'll detect filler words like "um", "uh", "like", etc. You'll get real-time 
            feedback to help you become aware of these words and suggestions for improving your speech clarity.
          </p>
          <p className="mt-3 text-xl font-medium">Current filler word count: <span className="font-bold">{fillerWordCount}</span></p>
        </div>
      </div>
    </div>
  );
};

export default PracticeHeader;
