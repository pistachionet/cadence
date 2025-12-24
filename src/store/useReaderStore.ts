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

  reset: () => set({ currentIndex: 0, isPlaying: false }),
}));
