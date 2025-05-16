
import StatCard from "@/components/progress/StatCard";
import { CalendarIcon, BarChart2Icon, TrophyIcon } from "lucide-react";

interface ProgressStatsProps {
  totalPracticeTime: number;
  level: number;
  streak: number;
}

const ProgressStats = ({ totalPracticeTime, level, streak }: ProgressStatsProps) => {
  // Format total practice time
  const formatPracticeTime = (totalMinutes: number) => {
    if (totalMinutes < 60) {
      return `${totalMinutes.toFixed(1)} mins`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);
      return `${hours}.${minutes < 10 ? '0' : ''}${minutes} hours`;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Practice Time" 
        value={formatPracticeTime(totalPracticeTime)}
        description="All time" 
        icon={<CalendarIcon className="text-logenia-500" />}
      />
      <StatCard 
        title="Overall Progress" 
        value={`${Math.min(level * 5, 100)}%`}
        description="Improvement from baseline" 
        icon={<BarChart2Icon className="text-accent" />}
      />
      <StatCard 
        title="Current Streak" 
        value={`${streak} days`}
        description="Keep practicing!" 
        icon={<TrophyIcon className="text-amber-500" />}
      />
    </div>
  );
};

export default ProgressStats;
