import { jsPDF } from "jspdf";
import type { FormData } from "./types";

// ── Palette (matches site design system) ──────────────────────────────────────
const C = {
  forest: [61, 90, 62] as [number, number, number],
  amber: [200, 149, 108] as [number, number, number],
  stone: [139, 115, 85] as [number, number, number],
  warm: [107, 101, 96] as [number, number, number],
  cream: [250, 247, 242] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  border: [225, 218, 209] as [number, number, number],
};

const PAGE = { W: 210, H: 297 };
const M = 16;
const CW = PAGE.W - M * 2;

const VET_PRACTICE = "Millie's Vets, 6 John Bradshaw Close, Congleton CW12 1LB";

// Exact copy mirrored from Step9Signature.tsx
const VET_AUTH_PARAGRAPHS = [
  "You agree that, during your absence, Katie's K9s may care for your dog(s) and, if necessary, transport them to a veterinary surgery for assessment or treatment.",
  "You authorise the veterinary surgeon to examine and provide any necessary treatment to your dog(s), and you agree to be responsible for all veterinary fees and associated expenses incurred.",
  "You agree that Katie's K9s may make decisions regarding veterinary treatment where, in their reasonable judgement, immediate treatment is necessary and you cannot be contacted in time. You understand that Katie's K9s will always act in the best interests of your dog(s) and will make reasonable efforts to contact you or your emergency contact where possible.",
  "You acknowledge and agree that Katie's K9s accepts no responsibility for veterinary treatment, transportation or associated expenses, except where liability cannot legally be excluded or limited. You agree to be responsible for any costs incurred in connection with the transportation, examination or treatment of your dog(s).",
];

async function loadLogoBase64(): Promise<string | null> {
  try {
    const res = await fetch("/images/Round.png");
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let bin = "";
    for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  } catch {
    return null;
  }
}

function todayLong() {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateVetAuthPdf(data: FormData): Promise<Blob> {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const logo = await loadLogoBase64();

  let y = 0;

  // ── Header band ────────────────────────────────────────────────────────────
  doc.setFillColor(...C.forest);
  doc.rect(0, 0, PAGE.W, 34, "F");

  if (logo) {
    const size = 24;
    const x = PAGE.W - M - size;
    doc.setFillColor(...C.white);
    doc.circle(x + size / 2, 17, 13, "F");
    doc.addImage(logo, "PNG", x, 5, size, size);
  }

  doc.setTextColor(...C.white);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Katie's K9s", M, 15);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Dog Boarding & Day Care · Congleton, Cheshire · Licence CE/HB232", M, 22);

  // ── Title strip ──────────────────────────────────────────────────────────────
  doc.setFillColor(...C.amber);
  doc.rect(0, 34, PAGE.W, 10, "F");
  doc.setTextColor(...C.white);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Veterinary Authorisation", M, 41);

  y = 54;

  // ── Owners & date summary ──────────────────────────────────────────────────
  const owner1 = `${data.owner1.firstName} ${data.owner1.surname}`.trim();
  const hasOwner2 =
    data.owner2.firstName.trim() !== "" || data.owner2.surname.trim() !== "";
  const owner2 = `${data.owner2.firstName} ${data.owner2.surname}`.trim();
  const dogName = data.dog.name.trim();

  function summaryRow(label: string, value: string) {
    doc.setFillColor(...C.cream);
    doc.rect(M, y, CW, 9, "F");
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.2);
    doc.rect(M, y, CW, 9, "S");
    doc.setTextColor(...C.stone);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(label, M + 3, y + 5.8);
    doc.setTextColor(...C.warm);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(value || "—", M + 52, y + 5.8);
    y += 9;
  }

  summaryRow("Owner", owner1);
  if (hasOwner2) summaryRow("Owner 2", owner2);
  summaryRow("Dog", dogName);
  summaryRow("Date", todayLong());

  y += 6;

  // ── Registered vet practice ──────────────────────────────────────────────────
  doc.setTextColor(...C.forest);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Katie's K9s' registered veterinary practice:", M, y);
  y += 5;
  doc.setTextColor(...C.warm);
  doc.setFont("helvetica", "normal");
  doc.text(VET_PRACTICE, M, y);
  y += 10;

  // ── Authorisation copy ───────────────────────────────────────────────────────
  doc.setTextColor(...C.warm);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  for (const para of VET_AUTH_PARAGRAPHS) {
    const lines = doc.splitTextToSize(para, CW);
    doc.text(lines, M, y);
    y += lines.length * 5 + 4;
  }

  y += 6;

  // ── Signature blocks ─────────────────────────────────────────────────────────
  function sigBlock(title: string, name: string) {
    const bh = 26;
    doc.setFillColor(...C.cream);
    doc.roundedRect(M, y, CW, bh, 2, 2, "F");
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(M, y, CW, bh, 2, 2, "S");
    doc.setFillColor(...C.amber);
    doc.roundedRect(M, y, 3, bh, 1, 1, "F");

    doc.setTextColor(...C.forest);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text(title, M + 7, y + 7);

    const half = (CW - 7) / 2;
    doc.setTextColor(...C.stone);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text("Signed (typed name)", M + 7, y + 15);
    doc.text("Date", M + 7 + half, y + 15);

    doc.setTextColor(...C.warm);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(name || "—", M + 7, y + 21);
    doc.text(todayLong(), M + 7 + half, y + 21);

    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.line(M + 7, y + 22.5, M + 7 + half - 4, y + 22.5);
    doc.line(M + 7 + half, y + 22.5, M + CW - 7, y + 22.5);

    y += bh + 5;
  }

  sigBlock("Owner 1 — Signed", data.signature.owner1SignedName);

  // ── Footer ───────────────────────────────────────────────────────────────────
  doc.setFillColor(...C.cream);
  doc.rect(0, PAGE.H - 12, PAGE.W, 12, "F");
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.2);
  doc.line(M, PAGE.H - 12, PAGE.W - M, PAGE.H - 12);
  doc.setTextColor(...C.stone);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Katie's K9s · Congleton, Cheshire · katies-k9s@hotmail.com · 07540 316 692",
    M,
    PAGE.H - 5
  );
  doc.text(`Generated ${todayLong()}`, PAGE.W - M, PAGE.H - 5, { align: "right" });

  return doc.output("blob");
}

// Builds a safe R2 object key: vet-auth/YYYY-MM-DD-dog-owner.pdf
export function buildPdfFileName(data: FormData): string {
  const date = new Date().toISOString().slice(0, 10);
  const slug = (s: string) =>
    s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "unknown";
  const dog = slug(data.dog.name);
  const owner = slug(`${data.owner1.firstName}-${data.owner1.surname}`);
  return `vet-auth-${date}-${dog}-${owner}.pdf`;
}
