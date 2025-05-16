
import { useState, useEffect } from "react";

// Define types for our practice statistics
export interface PracticeStats {
  totalPracticeTime: number; // in minutes
  streak: number;
  totalSessions: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  achievements: Achievement[];
}

export interface Achievement {
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  icon: string;
}

// Calculate level based on XP
const calculateLevel = (xp: number): { level: number; nextLevelXp: number } => {
  // Each level requires more XP than the previous
  const baseXP = 100;
  let level = 1;
  let requiredXP = baseXP;
  let totalRequiredXP = requiredXP;
  
  while (xp >= totalRequiredXP) {
    level++;
    requiredXP = baseXP * Math.floor(level * 1.5);
    totalRequiredXP += requiredXP;
  }
  
  return {
    level,
    nextLevelXp: totalRequiredXP
  };
};

export function usePracticeStats() {
  const [stats, setStats] = useState<PracticeStats>({
    totalPracticeTime: 0,
    streak: 0,
    totalSessions: 0,
    level: 1,
    xp: 0,
    nextLevelXp: 100,
    achievements: []
  });

  useEffect(() => {
    // In a real application, we would fetch this data from a database
    // For now, we'll load from localStorage if available, otherwise use defaults
    const loadPracticeStats = () => {
      try {
        const savedStats = localStorage.getItem('practiceStats');
        
        if (savedStats) {
          const parsedStats = JSON.parse(savedStats);
          
          // Calculate level and next level XP
          const { level, nextLevelXp } = calculateLevel(parsedStats.xp || 0);
          
          setStats({
            ...parsedStats,
            level,
            nextLevelXp,
            // Ensure all required fields exist
            totalPracticeTime: parsedStats.totalPracticeTime || 0,
            streak: parsedStats.streak || 0,
            totalSessions: parsedStats.totalSessions || 0,
            xp: parsedStats.xp || 0,
            achievements: parsedStats.achievements || getDefaultAchievements()
          });
        } else {
          // Initialize with default values
          setStats({
            totalPracticeTime: 0,
            streak: 0,
            totalSessions: 0,
            level: 1,
            xp: 0,
            nextLevelXp: 100,
            achievements: getDefaultAchievements()
          });
        }
      } catch (error) {
        console.error("Error loading practice stats:", error);
        // Fall back to defaults
        setStats({
          totalPracticeTime: 0,
          streak: 0,
          totalSessions: 0,
          level: 1,
          xp: 0,
          nextLevelXp: 100,
          achievements: getDefaultAchievements()
        });
      }
    };
    
    loadPracticeStats();
    
    // Check and update streak
    updateStreak();
  }, []);
  
  // Update streak based on last practice date
  const updateStreak = () => {
    try {
      const lastPracticeDate = localStorage.getItem('lastPracticeDate');
      const today = new Date().toDateString();
      
      if (lastPracticeDate) {
        const lastDate = new Date(lastPracticeDate);
        const currentDate = new Date();
        
        // Calculate days difference
        const timeDiff = currentDate.getTime() - lastDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Update stats based on time difference
        setStats(prev => {
          let newStreak = prev.streak;
          
          if (daysDiff === 0 && lastPracticeDate !== today) {
            // Already practiced today, don't increase streak
            newStreak = prev.streak;
          } else if (daysDiff === 1 || (daysDiff === 0 && lastPracticeDate !== today)) {
            // Practiced yesterday or first time today, increase streak
            newStreak = prev.streak + 1;
          } else if (daysDiff > 1) {
            // Missed a day, reset streak
            newStreak = 1;
          }
          
          return {
            ...prev,
            streak: newStreak
          };
        });
      }
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };
  
  // Record a completed practice session
  const recordPracticeSession = (durationInSeconds: number) => {
    try {
      const today = new Date().toDateString();
      localStorage.setItem('lastPracticeDate', today);
      
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
        localStorage.setItem('practiceStats', JSON.stringify(updatedStats));
        
        return updatedStats;
      });
      
      // Update streak after recording a session
      updateStreak();
    } catch (error) {
      console.error("Error recording practice session:", error);
    }
  };
  
  const getDefaultAchievements = (): Achievement[] => {
    return [
      {
        title: "First Session",
        description: "Complete your first practice session",
        completed: false,
        progress: 0,
        icon: "🎤"
      },
      {
        title: "Regular Speaker",
        description: "Complete 10 practice sessions",
        completed: false,
        progress: 0,
        icon: "🔄"
      },
      {
        title: "Practice Makes Perfect",
        description: "Practice for a total of 1 hour",
        completed: false,
        progress: 0,
        icon: "⏱️"
      },
      {
        title: "Consistency King",
        description: "Maintain a 7-day practice streak",
        completed: false,
        progress: 0,
        icon: "🔥"
      },
      {
        title: "Filler Eliminator",
        description: "Reduce filler words by 50%",
        completed: false,
        progress: 0,
        icon: "🚫"
      },
      {
        title: "Cultural Expert",
        description: "Practice in 3 different cultural contexts",
        completed: false,
        progress: 0,
        icon: "🌎"
      }
    ];
  };
  
  const updateAchievements = (
    achievements: Achievement[], 
    totalSessions: number, 
    totalTime: number, 
    streak: number
  ): Achievement[] => {
    return achievements.map(achievement => {
      switch(achievement.title) {
        case "First Session":
          return {
            ...achievement,
            completed: totalSessions >= 1,
            progress: totalSessions >= 1 ? 100 : totalSessions * 100
          };
        case "Regular Speaker":
          return {
            ...achievement,
            completed: totalSessions >= 10,
            progress: totalSessions >= 10 ? 100 : (totalSessions / 10) * 100
          };
        case "Practice Makes Perfect":
          return {
            ...achievement,
            completed: totalTime >= 60,
            progress: totalTime >= 60 ? 100 : (totalTime / 60) * 100
          };
        case "Consistency King":
          return {
            ...achievement,
            completed: streak >= 7,
            progress: streak >= 7 ? 100 : (streak / 7) * 100
          };
        default:
          return achievement;
      }
    });
  };

  return {
    stats,
    recordPracticeSession
  };
}
