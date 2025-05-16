
// Check if a practice session has been completed today
export const checkDailyPractice = (): boolean => {
  try {
    const lastPracticeDate = localStorage.getItem('lastPracticeDate');
    const today = new Date().toDateString();
    
    return lastPracticeDate === today;
  } catch (error) {
    console.error("Error checking daily practice:", error);
    return false;
  }
};

// Calculate streak status based on last practice date
export const calculateStreakStatus = (
  lastPracticeDate: string | null
): { shouldIncreaseStreak: boolean; shouldResetStreak: boolean } => {
  const today = new Date().toDateString();
  
  if (!lastPracticeDate) {
    return { shouldIncreaseStreak: true, shouldResetStreak: false };
  }
  
  const lastDate = new Date(lastPracticeDate);
  const currentDate = new Date();
  
  // Calculate days difference
  const timeDiff = currentDate.getTime() - lastDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  // Return streak status
  if (daysDiff === 0 && lastPracticeDate === today) {
    // Already practiced today
    return { shouldIncreaseStreak: false, shouldResetStreak: false };
  } else if (daysDiff === 1 || (daysDiff === 0 && lastPracticeDate !== today)) {
    // Practiced yesterday or first time today
    return { shouldIncreaseStreak: true, shouldResetStreak: false };
  } else if (daysDiff > 1) {
    // Missed a day, reset streak
    return { shouldIncreaseStreak: false, shouldResetStreak: true };
  }
  
  return { shouldIncreaseStreak: false, shouldResetStreak: false };
};
