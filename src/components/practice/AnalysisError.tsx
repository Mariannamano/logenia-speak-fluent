
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AnalysisErrorProps {
  error: string | null;
}

const AnalysisError = ({ error }: AnalysisErrorProps) => {
  if (!error) return null;
  
  return (
    <Card className="mb-8 border-destructive">
      <CardContent className="pt-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-xl font-semibold">Analysis Error</AlertTitle>
          <AlertDescription className="text-base">
            <p>{error}</p>
            <div className="mt-4 text-sm space-y-2">
              <p>This could be due to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>API connection issues with OpenAI</li>
                <li>Issues with your audio recording</li>
                <li>Insufficient audio quality for analysis</li>
              </ul>
              <p>Try recording again with a clearer voice, or check your microphone settings.</p>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AnalysisError;
