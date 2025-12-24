import { useEffect, useRef, useState } from "react";
import { useReaderStore } from "../store/useReaderStore";

export const ReaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tokens, currentIndex } = useReaderStore();
  const [resizer, setResizer] = useState(0);

  // Config
  const fontSize = 60;
  const fontFamily = "Inter, sans-serif";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle High DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.fillStyle = "#242424"; // Match bg
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw Reticle
    const centerY = rect.height / 2;
    const centerX = rect.width / 2;

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;

    // Top and bottom guides
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY - fontSize * 0.8);
    ctx.lineTo(centerX + 10, centerY - fontSize * 0.8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY + fontSize * 0.8);
    ctx.lineTo(centerX + 10, centerY + fontSize * 0.8);
    ctx.stroke();

    // Draw Text
    const currentToken = tokens[currentIndex];
    if (!currentToken) return; // Or draw "Ready"

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = "middle";

    const word = currentToken.text;
    const orpIndex = currentToken.orp_index;

    const part1 = word.substring(0, orpIndex);
    const orpChar = word.substring(orpIndex, orpIndex + 1);
    const part2 = word.substring(orpIndex + 1);

    const w1 = ctx.measureText(part1).width;
    const wOrp = ctx.measureText(orpChar).width;
    // const w2 = ctx.measureText(part2).width; // Unused

    // Calculate positions
    // We want the CENTER of the ORP char to be at centerX
    const orpCenterOffset = wOrp / 2;
    const orpStartX = centerX - orpCenterOffset;

    const p1StartX = orpStartX - w1;
    const p2StartX = orpStartX + wOrp;

    // Draw Part 1 (White)
    ctx.fillStyle = "#ffffff";
    ctx.fillText(part1, p1StartX, centerY);

    // Draw ORP (Light Red)
    ctx.fillStyle = "#ff9999";
    ctx.fillText(orpChar, orpStartX, centerY);

    // Draw Part 2 (White)
    ctx.fillStyle = "#ffffff";
    ctx.fillText(part2, p2StartX, centerY);
  }, [tokens, currentIndex, resizer]); // Redraw on update

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      // Force re-render/re-draw by updating a dummy state or just relying on the next render cycle
      // Actually, since we use `currentIndex` and `tokens` in the effect, we might need to
      // trigger it explicitly if the window resizes, OR we can just add a resize listener
      // that re-runs the logic.
      // The easiest way is to add 'window.innerWidth' or similar to dependencies,
      // or just re-run the canvas resizing logic.

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // We need to re-run the setup code.
      // Setting a state variable here is a clean React way to trigger re-effect.
      setResizer((prev: number) => prev + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-80 bg-[#242424] rounded-lg shadow-inner"
    />
  );
};
