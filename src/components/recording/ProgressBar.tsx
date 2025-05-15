
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
  elapsedTime: number;
  maxDuration: number;
}

const ProgressBar = ({ progress, elapsedTime, maxDuration }: ProgressBarProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          {progress > 0 ? 'Listening for filler words...' : 'Ready to detect filler words'}
        </div>
        <div className="text-sm">
          {formatTime(elapsedTime)} / {formatTime(maxDuration)}
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProgressBar;
