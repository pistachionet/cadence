import * as pdfjs from "pdfjs-dist";
import { calculateOrpIndex } from "./orp";
import { calculateDelay } from "./timing";
import type { Token } from "../store/useReaderStore";

// Set worker source
// Use Vite's explicit URL import to bundle the worker correctly
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export const processPdf = async (
  fileBuffer: ArrayBuffer,
  targetWpm: number
): Promise<Token[]> => {
  const doc = await pdfjs.getDocument({ data: fileBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    // Join items with space, but preserve basic flow
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    fullText += pageText + " ";
  }

  // Cleaning (Ported from Python)
  // 1. De-hyphenate: "Amaz- ing" -> "Amazing"
  fullText = fullText.replace(/(\w+)-\s+(\w+)/g, "$1$2");

  // 2. Normalize whitespace
  fullText = fullText.replace(/\s+/g, " ").trim();

  const words = fullText.split(" ");
  const tokens: Token[] = [];

  for (const word of words) {
    if (!word) continue;

    const orpIndex = calculateOrpIndex(word);
    const delay = calculateDelay(word, targetWpm);
    const isRed =
      word.endsWith(".") || word.endsWith("!") || word.endsWith("?");

    tokens.push({
      text: word,
      orp_index: orpIndex,
      delay_ms: delay,
      is_red: isRed,
    });
  }

  return tokens;
};
