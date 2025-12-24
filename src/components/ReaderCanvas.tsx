import { useEffect, useRef } from "react";
import { useReaderStore } from "../store/useReaderStore";

export const ReaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tokens, currentIndex } = useReaderStore();

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
    const w2 = ctx.measureText(part2).width;

    // Calculate positions
    // We want the CENTER of the ORP char to be at centerX
    const orpCenterOffset = wOrp / 2;
    const orpStartX = centerX - orpCenterOffset;

    const p1StartX = orpStartX - w1;
    const p2StartX = orpStartX + wOrp;

    // Draw Part 1 (White)
    ctx.fillStyle = "#ffffff";
    ctx.fillText(part1, p1StartX, centerY);

    // Draw ORP (Red)
    ctx.fillStyle = "#ff4444";
    ctx.fillText(orpChar, orpStartX, centerY);

    // Draw Part 2 (White)
    ctx.fillStyle = "#ffffff";
    ctx.fillText(part2, p2StartX, centerY);
  }, [tokens, currentIndex]); // Redraw on update

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-80 bg-[#242424] rounded-lg shadow-inner"
    />
  );
};
