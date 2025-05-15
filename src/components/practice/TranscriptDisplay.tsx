
import { Card, CardContent } from "@/components/ui/card";

interface TranscriptDisplayProps {
  transcript: string;
  hasRecording: boolean;
}

const TranscriptDisplay = ({ transcript, hasRecording }: TranscriptDisplayProps) => {
  if (!hasRecording) return null;
  
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-3">Complete Transcript</h3>
        <div className="p-4 bg-fluent-100 dark:bg-fluent-800/40 rounded-md text-lg border border-fluent-200 dark:border-fluent-700/50">
          {transcript || "No transcript available"}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptDisplay;
