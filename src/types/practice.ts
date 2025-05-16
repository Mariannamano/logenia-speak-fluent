
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
