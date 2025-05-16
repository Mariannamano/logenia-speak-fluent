export interface FeedbackItem {
  id: string;
  type: 'filler_word' | 'pace' | 'clarity' | 'grammar' | 'vocabulary' | 'suggestion';
  text: string;
  timestamp: number;
  suggestion?: string;
  severity?: 'low' | 'medium' | 'high';
}

export const analyzeSpeech = async (transcript: string): Promise<FeedbackItem[]> => {
  // This would normally call an API, but for now we'll use mock data
  const feedback: FeedbackItem[] = [];
  
  // Check for filler words
  const fillerWords = ['um', 'uh', 'like', 'you know', 'actually', 'basically'];
  const words = transcript.toLowerCase().split(' ');
  
  words.forEach((word, index) => {
    if (fillerWords.includes(word)) {
      feedback.push({
        id: `filler-${index}`,
        type: 'filler_word',
        text: word,
        timestamp: index * 500, // Rough timestamp estimation
        suggestion: 'Try to eliminate filler words for clearer speech',
        severity: 'medium'
      });
    }
  });
  
  // Add some mock feedback items
  if (transcript.length > 50) {
    feedback.push({
      id: 'pace-1',
      type: 'pace',
      text: 'Speaking too quickly',
      timestamp: 2000,
      suggestion: 'Try to slow down your speech for better clarity',
      severity: 'medium'
    });
  }
  
  if (transcript.length > 100) {
    feedback.push({
      id: 'clarity-1',
      type: 'clarity',
      text: 'Unclear explanation',
      timestamp: 5000,
      suggestion: 'Consider providing more concrete examples',
      severity: 'low'
    });
  }
  
  return feedback;
};

export const getRealtimeFeedback = (transcript: string): FeedbackItem[] => {
  const feedback: FeedbackItem[] = [];
  
  // Simple detection of filler words for real-time feedback
  const fillerWords = ['um', 'uh', 'like', 'you know', 'actually', 'basically'];
  const words = transcript.toLowerCase().split(' ');
  const lastWord = words[words.length - 1];
  
  if (fillerWords.includes(lastWord)) {
    feedback.push({
      id: `filler-realtime-${Date.now()}`,
      type: 'filler_word',
      text: lastWord,
      timestamp: Date.now(),
      suggestion: 'Try to reduce filler words',
      severity: 'low'
    });
  }
  
  return feedback;
};
