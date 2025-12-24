/**
 * Calculates the Optimal Recognition Point (ORP) index for a given word.
 *
 * Rules:
 * - Length 1-2: Index 0 (1st letter)
 * - Length 3-5: Index 1 (2nd letter)
 * - Length 6-9: Index 2 (3rd letter)
 * - Length 10+: Index 3 (4th letter)
 */
export const calculateOrpIndex = (word: string): number => {
  const length = word.length;

  if (length <= 2) return 0;
  if (length <= 5) return 1;
  if (length <= 9) return 2;
  return 3;
};
