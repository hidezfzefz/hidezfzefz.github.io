// Generates privacy-safe PDF packs from lib/questions.ts + lib/guides.ts.
// Run: npx tsx scripts/gen-packs.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { QUESTIONS } from "../lib/questions.ts";
import { GUIDES } from "../lib/guides.ts";

mkdirSync("public/packs", { recursive: true });

function esc(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7E]/g, (c) => {
      const map = { "—": "-", "–": "-", "é": "e", "è": "e", "à": "a", "ç": "c", "î": "i", "ô": "o", "ù": "u", "û": "u", "ü": "u", "ï": "i", "ê": "e", "â": "a", "é": "e", "“": '"', "”": '"', "’": "'", "‘": "'", "→": "->", "∞": "inf", "√": "sqrt", "·": "*", "·": "*", "×": "x", "−": "-", "’": "'" };
      return map[c] ?? "?";
    });
}

function wrap(text, max = 88) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) {
      if (cur) lines.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

function makePdf(title, lines) {
  const perPage = 48;
  const pages = [];
  for (let i = 0; i < lines.length; i += perPage) pages.push(lines.slice(i, i + perPage));
  if (pages.length === 0) pages.push([""]);

  const fontId = 3 + pages.length * 2;
  const objs = {};
  objs[1] = "<</Type/Catalog/Pages 2 0 R>>";
  const kids = pages.map((_, i) => `${3 + i * 2} 0 R`).join(" ");
  objs[2] = `<</Type/Pages/Kids[${kids}]/Count ${pages.length}>>`;
  pages.forEach((pl, i) => {
    const pageId = 3 + i * 2;
    const contentId = pageId + 1;
    let y = 770;
    const cmds = [`BT /F1 15 Tf 40 ${y} Td (${esc(title)}) Tj ET`];
    y -= 26;
    for (const l of pl) {
      cmds.push(`BT /F1 10 Tf 40 ${y} Td (${esc(l)}) Tj ET`);
      y -= 15;
      if (y < 50) break;
    }
    objs[pageId] = `<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</Font<</F1 ${fontId} 0 R>>>>/Contents ${contentId} 0 R>>`;
    const content = cmds.join("\n");
    objs[contentId] = `<</Length ${content.length}>>\nstream\n${content}\nendstream`;
  });
  objs[fontId] = "<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>";

  const ids = Object.keys(objs).map(Number).sort((a, b) => a - b);
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  for (const id of ids) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objs[id]}\nendobj\n`;
  }
  const xrefAt = pdf.length;
  const size = Math.max(...ids) + 1;
  pdf += `xref\n0 ${size}\n0000000000 65535 f \n`;
  for (let i = 1; i < size; i++) pdf += `${String(offsets[i] ?? 0).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<</Size ${size}/Root 1 0 R>>\nstartxref\n${xrefAt}\n%%EOF`;
  return pdf;
}

const examLines = [];
QUESTIONS.forEach((q, i) => {
  examLines.push(`Q${i + 1}. [${q.subject} | ${q.topic}] ${q.prompt}`);
  q.options.forEach((o, j) => examLines.push(`  ${"ABCD"[j]}. ${o}`));
  examLines.push(`Answer: ${"ABCD"[q.answer]}`);
  wrap(q.explanation).forEach((l) => examLines.push(`  ${l}`));
  examLines.push("");
});

const guideLines = [];
GUIDES.forEach((g) => {
  guideLines.push(`${g.title} (${g.subject})`);
  guideLines.push(g.description);
  guideLines.push("Key points:");
  g.keyPoints.forEach((k) => guideLines.push(`- ${k}`));
  guideLines.push("");
});

writeFileSync(
  "public/packs/bac-cram-pack.pdf",
  makePdf("BAC Cram Pack - BAC STE Tutor", [...examLines, ...guideLines]),
);
writeFileSync(
  "public/packs/worksheet-bundle.pdf",
  makePdf("Worksheet Bundle - BAC STE Tutor", examLines),
);
console.log(
  `wrote packs: ${QUESTIONS.length} questions, ${GUIDES.length} guides; cram lines=${examLines.length + guideLines.length}`,
);
