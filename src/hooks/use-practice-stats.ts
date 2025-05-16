
import { useState, useEffect } from "react";
import { PracticeStats } from "@/types/practice";
import { calculateLevel } from "@/utils/level-utils";
import { updateAchievements } from "@/utils/achievement-utils";
import { 
  loadPracticeStats,
  savePracticeStats,
  recordPracticeDate,
  getLastPracticeDate
} from "@/utils/practice-storage";
import { calculateStreakStatus } from "@/utils/streak-utils";

export { PracticeStats } from "@/types/practice";
export { Achievement } from "@/types/practice";

export function usePracticeStats() {
  const [stats, setStats] = useState<PracticeStats>(loadPracticeStats());

  useEffect(() => {
    // Load stats and update streak on mount
    setStats(loadPracticeStats());
    updateStreak();
  }, []);
  
  // Update streak based on last practice date
  const updateStreak = () => {
    try {
      const lastPracticeDate = getLastPracticeDate();
      const streakStatus = calculateStreakStatus(lastPracticeDate);
      
      setStats(prev => {
        let newStreak = prev.streak;
        
        if (streakStatus.shouldResetStreak) {
          newStreak = 1;
        } else if (streakStatus.shouldIncreaseStreak) {
          newStreak = prev.streak + 1;
        }
        
        const updatedStats = {
          ...prev,
          streak: newStreak
        };
        
        // Save updated streak to storage
        savePracticeStats(updatedStats);
        
        return updatedStats;
      });
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };
  
  // Record a completed practice session
  const recordPracticeSession = (durationInSeconds: number) => {
    try {
      // Record that practice happened today
      recordPracticeDate();
      
      // Calculate XP based on duration (1 XP per 10 seconds)
      const earnedXP = Math.floor(durationInSeconds / 10);
      
      setStats(prev => {
        const newTotalTime = prev.totalPracticeTime + (durationInSeconds / 60);
        const newTotalSessions = prev.totalSessions + 1;
        const newXP = prev.xp + earnedXP;
        
        // Calculate new level based on XP
        const { level, nextLevelXp } = calculateLevel(newXP);
        
        // Update achievements based on new stats
        const updatedAchievements = updateAchievements(
          prev.achievements, 
          newTotalSessions, 
          newTotalTime, 
          prev.streak
        );
        
        const updatedStats = {
          ...prev,
          totalPracticeTime: newTotalTime,
          totalSessions: newTotalSessions,
          xp: newXP,
          level,
          nextLevelXp,
          achievements: updatedAchievements
        };
        
        // Save to localStorage
        savePracticeStats(updatedStats);
        
        return updatedStats;
      });
      
      // Update streak after recording a session
      updateStreak();
    } catch (error) {
      console.error("Error recording practice session:", error);
    }
  };

  return {
    stats,
    recordPracticeSession
  };
}
