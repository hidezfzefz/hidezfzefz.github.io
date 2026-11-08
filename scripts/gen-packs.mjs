import { mkdirSync, writeFileSync } from "node:fs";
import { QUESTIONS } from "../lib/questions.ts";

// Bun/tsx can import TS, but plain node can't. Read questions via JSON fallback:
// The script is run with `npx tsx scripts/gen-packs.mjs` normally. If QUESTIONS fails, fallback empty.
let qs = [];
try { qs = QUESTIONS; } catch { qs = []; }

mkdirSync("public/packs", { recursive: true });

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\n/g, " ");
}

function makePdf(title, lines) {
  const content = lines.map((l) => `BT /F1 13 Tf 40 800 Td (${esc(l)}) Tj ET`).join("\n") +
    `\nBT /F1 20 Tf 40 770 Td (${esc(title)}) Tj ET`;
  const objs = [];
  objs[1] = "<</Type/Catalog/Pages 2 0 R>>";
  objs[2] = "<</Type/Pages/Kids[3 0 R]/Count 1>>";
  objs[3] = "<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>";
  objs[4] = "<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>";
  objs[5] = `<</Length ${content.length}>>\nstream\n${content}\nendstream`;
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i <= 5; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objs[i]}\nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 6\n0000000000 65535 f \n`;
  for (let i = 1; i <= 5; i++) pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
  pdf += `trailer\n<</Size 6/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

const examLines = qs.map((q, i) => `Q${i + 1}. ${q.prompt} A=${"ABCD"[q.answer]} (${q.topic})`);
writeFileSync("public/packs/bac-cram-pack.pdf", makePdf("BAC Cram Pack — BAC STE Tutor (sample pages)", examLines.slice(0, 40)));
writeFileSync("public/packs/worksheet-bundle.pdf", makePdf("Worksheet Bundle — BAC STE Tutor (sample sheets)", examLines.slice(0, 30)));
console.log("wrote public/packs/bac-cram-pack.pdf + worksheet-bundle.pdf");
