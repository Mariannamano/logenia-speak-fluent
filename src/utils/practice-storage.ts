
import { PracticeStats } from "@/types/practice";
import { getDefaultAchievements } from "./achievement-utils";
import { calculateLevel } from "./level-utils";

// Save practice stats to localStorage
export const savePracticeStats = (stats: PracticeStats): void => {
  try {
    localStorage.setItem('practiceStats', JSON.stringify(stats));
  } catch (error) {
    console.error("Error saving practice stats:", error);
  }
};

// Load practice stats from localStorage or create default
export const loadPracticeStats = (): PracticeStats => {
  try {
    const savedStats = localStorage.getItem('practiceStats');
    
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      
      // Calculate level and next level XP
      const { level, nextLevelXp } = calculateLevel(parsedStats.xp || 0);
      
      return {
        ...parsedStats,
        level,
        nextLevelXp,
        // Ensure all required fields exist
        totalPracticeTime: parsedStats.totalPracticeTime || 0,
        streak: parsedStats.streak || 0,
        totalSessions: parsedStats.totalSessions || 0,
        xp: parsedStats.xp || 0,
        achievements: parsedStats.achievements || getDefaultAchievements()
      };
    } else {
      // Initialize with default values
      return {
        totalPracticeTime: 0,
        streak: 0,
        totalSessions: 0,
        level: 1,
        xp: 0,
        nextLevelXp: 100,
        achievements: getDefaultAchievements()
      };
    }
  } catch (error) {
    console.error("Error loading practice stats:", error);
    // Fall back to defaults
    return {
      totalPracticeTime: 0,
      streak: 0,
      totalSessions: 0,
      level: 1,
      xp: 0,
      nextLevelXp: 100,
      achievements: getDefaultAchievements()
    };
  }
};

// Record last practice date
export const recordPracticeDate = (): void => {
  try {
    const today = new Date().toDateString();
    localStorage.setItem('lastPracticeDate', today);
  } catch (error) {
    console.error("Error recording practice date:", error);
  }
};

// Get last practice date
export const getLastPracticeDate = (): string | null => {
  try {
    return localStorage.getItem('lastPracticeDate');
  } catch (error) {
    console.error("Error getting last practice date:", error);
    return null;
  }
};
