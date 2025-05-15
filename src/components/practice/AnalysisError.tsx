
import { Card, CardContent } from "@/components/ui/card";

interface AnalysisErrorProps {
  error: string | null;
}

const AnalysisError = ({ error }: AnalysisErrorProps) => {
  if (!error) return null;
  
  return (
    <Card className="mb-8 border-destructive">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-3 text-destructive">Analysis Error</h3>
        <p className="text-base">{error}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try recording again with a clearer voice, or check your microphone settings.
        </p>
      </CardContent>
    </Card>
  );
};

export default AnalysisError;
