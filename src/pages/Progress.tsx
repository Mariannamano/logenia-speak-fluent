
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { usePracticeStats } from "@/hooks/use-practice-stats";
import ProgressShelf from "@/components/progress/ProgressShelf";
import ProgressStats from "@/components/progress/ProgressStats";
import ProgressCharts from "@/components/progress/ProgressCharts";
import SkillsBreakdown from "@/components/progress/SkillsBreakdown";
import PracticeHistory from "@/components/progress/PracticeHistory";

const Progress = () => {
  const { stats } = usePracticeStats();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Your Progress</h1>
            <p className="text-muted-foreground">
              Track your communication improvement over time
            </p>
          </div>
          
          {/* Progress Shelf Component */}
          <div className="mb-8">
            <ProgressShelf 
              streak={stats.streak}
              totalSessions={stats.totalSessions}
              achievements={stats.achievements}
              level={stats.level}
              xp={stats.xp}
              nextLevelXp={stats.nextLevelXp}
            />
          </div>
          
          {/* Stats Cards */}
          <ProgressStats 
            totalPracticeTime={stats.totalPracticeTime}
            level={stats.level}
            streak={stats.streak}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Charts */}
            <ProgressCharts />
            
            {/* Skills Breakdown */}
            <SkillsBreakdown totalSessions={stats.totalSessions} />
          </div>
          
          {/* Practice History */}
          <PracticeHistory />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Progress;
