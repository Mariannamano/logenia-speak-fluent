
// Calculate level based on XP
export const calculateLevel = (xp: number): { level: number; nextLevelXp: number } => {
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
