
import { Button } from "@/components/ui/button";
import { Mic, Square, ArrowRight, Loader2 } from "lucide-react";

interface RecordingButtonsProps {
  isRecording: boolean;
  isLoading: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const RecordingButtons = ({ 
  isRecording, 
  isLoading, 
  onStartRecording, 
  onStopRecording 
}: RecordingButtonsProps) => {
  return (
    <div className="flex justify-center gap-4">
      {!isRecording ? (
        <Button 
          onClick={onStartRecording} 
          disabled={isLoading}
          size="lg"
          className="bg-logenia-500 hover:bg-logenia-600 px-8"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Mic className="h-5 w-5 mr-2" />
          )}
          Start Speaking
        </Button>
      ) : (
        <>
          <Button 
            onClick={onStopRecording}
            variant="destructive"
            size="lg"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
          <Button 
            onClick={onStopRecording} 
            size="lg"
            className="bg-logenia-500 hover:bg-logenia-600"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Complete
          </Button>
        </>
      )}
    </div>
  );
};

export default RecordingButtons;
