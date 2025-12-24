import { useRef, useState } from "react";
import { useReaderStore } from "./store/useReaderStore";
import { useReaderEngine } from "./hooks/useReaderEngine";
import { ReaderCanvas } from "./components/ReaderCanvas";
import { processPdf } from "./lib/pdf-processor";
import {
  Play,
  Pause,
  RotateCcw,
  Upload,
  FileText,
  Loader2,
  SkipBack,
} from "lucide-react";

function App() {
  useReaderEngine();

  const {
    isPlaying,
    setIsPlaying,
    currentIndex,
    tokens,
    reset,
    targetWpm,
    setTargetWpm,
    setTokens,
    prevSentence,
    setCurrentIndex,
  } = useReaderStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePlayToggle = () => {
    if (currentIndex >= tokens.length - 1) {
      reset();
    }
    setIsPlaying(!isPlaying);
  };

  const processFile = async (file: File) => {
    if (!file) return;

    setLoading(true);
    setFileName(file.name);
    setError(null);

    // Reset reader
    reset();
    setTokens([]);

    try {
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        throw new Error("Only PDF files are supported.");
      }

      const arrayBuffer = await file.arrayBuffer();
      // Process locally
      const newTokens = await processPdf(arrayBuffer, targetWpm);

      setTokens(newTokens);
    } catch (err) {
      console.error(err);
      setError("Failed to process file. Ensure it is a valid PDF.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleDemoLoad = () => {
    setFileName("demo.txt");
    const text =
      "You usually read about 300 words per minute, but by removing the need to move your eyes, you can read up to even 700 words per minute.";
    const words = text.split(" ");
    // Simple local mock for demo
    const newTokens = words.map((w) => ({
      text: w,
      orp_index:
        Math.floor(w.length / 2) - 1 > 0 ? Math.floor(w.length / 2) - 1 : 0,
      delay_ms: Math.floor(60000 / targetWpm),
      is_red: w.endsWith("."),
    }));
    setTokens(newTokens);
  };

  const handleWpmChange = (newWpm: number) => {
    setTargetWpm(newWpm);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
            Cadence
          </h1>
          <p className="text-neutral-400 text-lg">High-Velocity Reader</p>
        </div>

        {/* Reader Area */}
        <div
          className={`relative group bg-black rounded-2xl overflow-hidden shadow-2xl border transition-colors ${
            isDragging
              ? "border-red-500 ring-2 ring-red-500/50"
              : "border-neutral-800"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ReaderCanvas />

          {/* Overlay when empty */}
          {!tokens.length && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 bg-black/50 backdrop-blur-sm">
              <FileText size={48} className="mb-4 opacity-50" />
              <p>Upload a PDF or Load Demo to start</p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 bg-black/80 z-10">
              <Loader2 size={48} className="animate-spin mb-4 text-red-500" />
              <p>Processing text locally...</p>
            </div>
          )}

          {isDragging && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 bg-black/90 z-20 backdrop-blur-sm border-2 border-dashed border-red-500/50 m-2 rounded-xl">
              <Upload size={64} className="mb-4 animate-bounce" />
              <p className="text-xl font-bold">Drop PDF to Upload</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1.5 bg-neutral-800 w-full group-hover:h-3 transition-all duration-300">
            <div
              className="h-full bg-red-600 transition-all duration-100 ease-linear"
              style={{
                width: `${
                  tokens.length ? ((currentIndex + 1) / tokens.length) * 100 : 0
                }%`,
              }}
            />
            {/* Invisible Range Input Overlay */}
            <input
              type="range"
              min="0"
              max={tokens.length > 0 ? tokens.length - 1 : 0}
              value={currentIndex}
              onChange={(e) => {
                const newIndex = Number(e.target.value);
                setCurrentIndex(newIndex);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={tokens.length === 0}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="bg-neutral-800/50 backdrop-blur p-6 rounded-2xl border border-neutral-700/50 flex flex-col gap-6 shadow-xl">
          {/* Top Row: Playback & File */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-start">
              <button
                onClick={handlePlayToggle}
                disabled={!tokens.length}
                className="p-5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <Pause size={28} fill="currentColor" />
                ) : (
                  <Play size={28} fill="currentColor" className="ml-1" />
                )}
              </button>

              <div className="flex flex-col">
                <span className="text-3xl font-mono font-bold tabular-nums tracking-tighter">
                  {targetWpm}
                </span>
                <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
                  Words / Min
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              <button
                onClick={prevSentence}
                className="p-3 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-700/50 transition"
                title="Back a Sentence"
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={reset}
                className="p-3 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-700/50 transition"
                title="Reset"
              >
                <RotateCcw size={20} />
              </button>

              <div className="h-8 w-px bg-neutral-700 mx-2"></div>

              <button
                onClick={handleDemoLoad}
                className="px-4 py-2.5 text-sm font-medium bg-neutral-700 hover:bg-neutral-600 rounded-lg transition"
              >
                Demo
              </button>

              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-lg transition cursor-pointer shadow-lg shadow-red-900/20"
                >
                  <Upload size={18} />
                  {fileName ? "Change PDF" : "Upload PDF"}
                </label>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="pt-2 px-1">
            <input
              type="range"
              min="100"
              max="700"
              step="25"
              value={targetWpm}
              onChange={(e) => handleWpmChange(Number(e.target.value))}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
            <div className="flex justify-between text-xs text-neutral-600 mt-2 font-mono">
              <span>100</span>
              <span>400</span>
              <span>700</span>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900/50">
              {error}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-neutral-600">
          {fileName && <span className="mr-4">📄 {fileName}</span>}
          <span>
            {tokens.length > 0
              ? `${currentIndex + 1} / ${tokens.length} words`
              : "Waiting for content..."}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
