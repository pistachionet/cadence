/**
 * Calculates the display duration (ms) for a word based on WPM and heuristics.
 */
export const calculateDelay = (word: string, targetWpm: number): number => {
  if (targetWpm <= 0) return 0;

  const baseDelay = 60000 / targetWpm;

  // Strip punctuation for length check, but keep it for logic
  const cleanWord = word.replace(/[^\w\s]/g, "");
  const length = cleanWord.length;

  let delay = baseDelay;

  // Length modifiers
  if (length < 4) {
    delay *= 0.8;
  } else if (length > 8) {
    delay *= 1.3;
  }

  // Punctuation modifiers
  if (word.endsWith(".") || word.endsWith("!") || word.endsWith("?")) {
    delay *= 2.5;
  } else if (word.endsWith(",") || word.endsWith(";") || word.endsWith(":")) {
    delay += 50;
  }

  return Math.round(delay);
};
