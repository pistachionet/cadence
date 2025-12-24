import { useEffect, useRef } from "react";
import { useReaderStore } from "../store/useReaderStore";
import { calculateDelay } from "../lib/timing";

export const useReaderEngine = () => {
  const isPlaying = useReaderStore((state) => state.isPlaying);
  // We don't subscribe to these in the hook body to avoid re-running the effect too often,
  // but the effect needs dependencies.
  // Actually, we use refs for mutable state tracking in the loop.

  const requestRef = useRef<number | undefined>(undefined);
  const lastWordChangeRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }

    // Initialize start time
    // We set lastWordChange to "now" so we wait the full duration of the *current* word first?
    // Or do we assume we just switched to Play and should start counting?
    // Getting state directly ensures we have latest without closures
    const state = useReaderStore.getState();
    if (!state.tokens.length) return;

    lastWordChangeRef.current = performance.now();

    const loop = (time: number) => {
      const { tokens, currentIndex, nextWord, setIsPlaying, targetWpm } =
        useReaderStore.getState();

      if (currentIndex >= tokens.length - 1) {
        setIsPlaying(false);
        return;
      }

      const currentToken = tokens[currentIndex];
      if (!currentToken) return;

      const elapsed = time - lastWordChangeRef.current;

      // Calculate delay dynamically based on current WPM
      const currentDelay = calculateDelay(currentToken.text, targetWpm);

      if (elapsed >= currentDelay) {
        // Time to switch!
        nextWord();

        // Correction for drift:
        // instead of lastWordChange = time, we subtract the overshoot
        // But we must be careful not to overshoot negatively if lag is huge.
        // Simple drift correction:
        lastWordChangeRef.current = time - (elapsed % currentDelay);
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying]); // Re-start loop when play toggles
};
