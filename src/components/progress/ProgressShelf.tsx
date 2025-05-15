
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Achievement {
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  icon: string;
}

interface ProgressShelfProps {
  streak: number;
  totalSessions: number;
  achievements: Achievement[];
  level: number;
  xp: number;
  nextLevelXp: number;
}

const ProgressShelf = ({
  streak,
  totalSessions,
  achievements,
  level,
  xp,
  nextLevelXp,
}: ProgressShelfProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="fluent-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Streak</CardTitle>
            <CardDescription>Keep practicing daily!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center my-4">
              <div className="text-4xl font-bold text-fluent-primary">{streak}</div>
              <div className="text-muted-foreground ml-2">days</div>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              {streak > 0 
                ? `You've been learning for ${streak} consecutive days!` 
                : "Start your learning streak today!"}
            </div>
          </CardContent>
        </Card>
        
        <Card className="fluent-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Practice Sessions</CardTitle>
            <CardDescription>Total completed sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center my-4">
              <div className="text-4xl font-bold text-fluent-primary">{totalSessions}</div>
              <div className="text-muted-foreground ml-2">sessions</div>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              {totalSessions > 0 
                ? `You've completed ${totalSessions} practice sessions!` 
                : "Complete your first practice session!"}
            </div>
          </CardContent>
        </Card>
        
        <Card className="fluent-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Fluency Level</CardTitle>
            <CardDescription>Keep improving your skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center my-4">
              <div className="text-4xl font-bold text-fluent-primary">{level}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm flex justify-between">
                <span>{xp} XP</span>
                <span>{nextLevelXp} XP</span>
              </div>
              <Progress value={(xp / nextLevelXp) * 100} className="h-2 bg-fluent-100" />
              <div className="text-xs text-center text-muted-foreground">
                {nextLevelXp - xp} XP until level {level + 1}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="fluent-card">
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Collect achievements as you learn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  achievement.completed 
                    ? "border-fluent-300 bg-fluent-50 dark:bg-fluent-900/30" 
                    : "border-muted bg-muted/30 opacity-70"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`text-3xl mb-2 ${achievement.completed ? "" : "opacity-50"}`}>
                    {achievement.icon}
                  </div>
                  <h4 className="font-medium mb-1">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.progress < 100 && (
                    <div className="w-full mt-2">
                      <div className="text-xs flex justify-between">
                        <span>{achievement.progress}%</span>
                        <span>100%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-1.5 bg-fluent-100" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressShelf;
