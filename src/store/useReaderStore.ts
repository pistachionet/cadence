import { create } from "zustand";

export interface Token {
  text: string;
  orp_index: number;
  delay_ms: number;
  is_red: boolean;
}

interface ReaderState {
  tokens: Token[];
  currentIndex: number;
  isPlaying: boolean;
  targetWpm: number;

  setTokens: (tokens: Token[]) => void;
  setCurrentIndex: (index: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setTargetWpm: (wpm: number) => void;
  nextWord: () => void;
  prevWord: () => void;
  prevSentence: () => void;
  reset: () => void;
}

export const useReaderStore = create<ReaderState>((set) => ({
  tokens: [],
  currentIndex: 0,
  isPlaying: false,
  targetWpm: 300,

  setTokens: (tokens) => set({ tokens, currentIndex: 0, isPlaying: false }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setTargetWpm: (wpm) => set({ targetWpm: wpm }),

  nextWord: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.tokens.length - 1),
    })),

  prevWord: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
    })),

  prevSentence: () =>
    set((state) => {
      if (state.currentIndex === 0) return state;

      let i = state.currentIndex - 1;
      // Skip the punctuation of the *current* sentence if we are right on it
      // but usually we are on a word.

      // We want to find the END of the PREVIOUS sentence, then go +1.
      // Scan backwards.
      while (i > 0) {
        const t = state.tokens[i - 1]; // Look at the token BEFORE i
        if (
          t.text.endsWith(".") ||
          t.text.endsWith("!") ||
          t.text.endsWith("?")
        ) {
          // Found end of previous sentence. 'i' is the start of current/next sentence.
          // If we were already at the start of a sentence (i approx currentIndex),
          // we want to go back further.

          // Heuristic: if we moved less than 2 words, keep searching back
          if (state.currentIndex - i > 2) {
            return { currentIndex: i };
          }
        }
        i--;
      }
      return { currentIndex: 0 };
    }),

  reset: () => set({ currentIndex: 0, isPlaying: false }),
}));
