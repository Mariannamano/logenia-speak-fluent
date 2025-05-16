
import { Achievement } from "@/types/practice";

export const getDefaultAchievements = (): Achievement[] => {
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

export const updateAchievements = (
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
