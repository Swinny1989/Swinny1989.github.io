import { jsPDF } from "jspdf";
import type { FormData } from "./types";

// ── Palette (matches site design system) ──────────────────────────────────────
const C = {
  forest:   [61,  90,  62]  as [number, number, number],
  forestDk: [44,  66,  48]  as [number, number, number],
  amber:    [200, 149, 108] as [number, number, number],
  stone:    [139, 115, 85]  as [number, number, number],
  warm:     [107, 101, 96]  as [number, number, number],
  cream:    [250, 247, 242] as [number, number, number],
  white:    [255, 255, 255] as [number, number, number],
  border:   [225, 218, 209] as [number, number, number],
  rowAlt:   [245, 242, 237] as [number, number, number],
  red:      [180,  60,  60] as [number, number, number],
};

const MM    = { W: 210, H: 297 };
const M     = 14;   // margin
const CW    = MM.W - M * 2; // content width

// ── Utility ───────────────────────────────────────────────────────────────────
function yn(v: boolean) { return v ? "Yes" : "No"; }
function fmt(v: string | undefined | null) { return v?.trim() || "—"; }
function fmtDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

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

// ── PDF builder ───────────────────────────────────────────────────────────────
export async function generateRegistrationPdf(data: FormData): Promise<Blob> {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const logoB64 = await loadLogoBase64();

  let y = 0;

  // ── Page helpers ─────────────────────────────────────────────────────────
  function newPage() {
    doc.addPage();
    y = 26;
    pageHeader();
  }

  function ensureSpace(needed: number) {
    if (y + needed > MM.H - 18) newPage();
  }

  // ── Repeated page header (small, for continuation pages) ─────────────────
  function pageHeader() {
    doc.setFillColor(...C.forest);
    doc.rect(0, 0, MM.W, 18, "F");
    doc.setTextColor(...C.white);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Katie's K9s — Registration Form", M, 12);
    const dog = data.dog.name || "Dog";
    const owner = `${data.owner1.firstName} ${data.owner1.surname}`.trim();
    doc.setFont("helvetica", "normal");
    doc.text(`${dog} · ${owner}`, MM.W - M, 12, { align: "right" });
    y = 24;
  }

  // ── Cover / first page header ─────────────────────────────────────────────
  function coverHeader() {
    // Deep green header band
    doc.setFillColor(...C.forest);
    doc.rect(0, 0, MM.W, 38, "F");

    // Logo circle (white bg so transparent PNG looks clean)
    if (logoB64) {
      const logoSize = 28;
      const logoX = MM.W - M - logoSize;
      doc.setFillColor(...C.white);
      doc.circle(logoX + logoSize / 2, 19, 15, "F");
      doc.addImage(logoB64, "PNG", logoX, 5, logoSize, logoSize);
    }

    // Business name
    doc.setTextColor(...C.white);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Katie's K9s", M, 16);

    // Subtitle
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Dog Boarding & Day Care · Congleton, Cheshire · Licence CE/HB232", M, 24);

    // Form title band (amber)
    doc.setFillColor(...C.amber);
    doc.rect(0, 38, MM.W, 11, "F");
    doc.setTextColor(...C.white);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Registration Form", M, 46);

    const dog = data.dog.name || "—";
    const owner = `${data.owner1.firstName} ${data.owner1.surname}`.trim() || "—";
    const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`${dog} · ${owner} · ${dateStr}`, MM.W - M, 46, { align: "right" });

    y = 56;
  }

  // ── Section heading ───────────────────────────────────────────────────────
  function section(title: string) {
    ensureSpace(14);
    y += 3;
    doc.setFillColor(...C.forest);
    doc.roundedRect(M, y, CW, 8.5, 1.5, 1.5, "F");
    doc.setTextColor(...C.white);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(title.toUpperCase(), M + 4, y + 5.8);
    y += 12;
  }

  // ── Two-column data row ───────────────────────────────────────────────────
  const LABEL_W = 62;
  const VAL_W   = CW - LABEL_W;

  function row(label: string, value: string, shade = false) {
    const lines = doc.splitTextToSize(fmt(value), VAL_W - 4);
    const rh = Math.max(7.5, lines.length * 4.2 + 3.5);
    ensureSpace(rh);

    if (shade) {
      doc.setFillColor(...C.rowAlt);
      doc.rect(M, y, CW, rh, "F");
    }
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.15);
    doc.line(M, y + rh, M + CW, y + rh);
    // Vertical divider
    doc.line(M + LABEL_W, y, M + LABEL_W, y + rh);

    doc.setTextColor(...C.stone);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.text(doc.splitTextToSize(label, LABEL_W - 4), M + 2, y + 4.8);

    doc.setTextColor(...C.warm);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(lines, M + LABEL_W + 3, y + 4.8);

    y += rh;
  }

  // ── Yes/No/Sometimes row with badge ──────────────────────────────────────
  const BADGE_COLOURS: Record<string, [number, number, number]> = {
    Yes:       C.forest,
    No:        C.red,
    Sometimes: C.amber,
  };
  const BADGE_W = 22;

  function ynRow(label: string, value: string, details?: string, shade = false) {
    const hasDetails = !!details && (value === "Yes" || value === "Sometimes");
    const detailLines = hasDetails
      ? doc.splitTextToSize(details!, CW - 8)
      : [];
    const baseH = 8;
    const rh = baseH + (hasDetails ? detailLines.length * 4 + 3 : 0);
    ensureSpace(rh);

    if (shade) {
      doc.setFillColor(...C.rowAlt);
      doc.rect(M, y, CW, rh, "F");
    }
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.15);
    doc.line(M, y + rh, M + CW, y + rh);

    // Label
    doc.setTextColor(...C.warm);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    const labelLines = doc.splitTextToSize(label, CW - BADGE_W - 10);
    doc.text(labelLines, M + 2, y + 5);

    // Badge
    if (value) {
      const bg = BADGE_COLOURS[value] ?? C.stone;
      const bx = M + CW - BADGE_W - 2;
      doc.setFillColor(...bg);
      doc.roundedRect(bx, y + 1.5, BADGE_W, 5.5, 1, 1, "F");
      doc.setTextColor(...C.white);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text(value, bx + BADGE_W / 2, y + 5.4, { align: "center" });
    }

    // Details
    if (hasDetails) {
      doc.setTextColor(...C.stone);
      doc.setFontSize(7);
      doc.setFont("helvetica", "italic");
      doc.text(detailLines, M + 5, y + baseH + 2);
    }

    y += rh;
  }

  // ── Consent row ───────────────────────────────────────────────────────────
  function consentRow(label: string, granted: boolean, shade = false) {
    const lines = doc.splitTextToSize(label, CW - 16);
    const rh = Math.max(7.5, lines.length * 4.2 + 3);
    ensureSpace(rh);

    if (shade) {
      doc.setFillColor(...C.rowAlt);
      doc.rect(M, y, CW, rh, "F");
    }
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.15);
    doc.line(M, y + rh, M + CW, y + rh);

    // Circle tick/cross
    const cx = M + 6;
    const cy2 = y + rh / 2;
    doc.setFillColor(...(granted ? C.forest : C.red));
    doc.circle(cx, cy2, 3, "F");
    doc.setTextColor(...C.white);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text(granted ? "✓" : "✗", cx, cy2 + 1, { align: "center" });

    doc.setTextColor(...C.warm);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text(lines, M + 13, y + 4.8);

    y += rh;
  }

  // ── Signature block ───────────────────────────────────────────────────────
  function sigBlock(title: string, printed: string, signed: string) {
    ensureSpace(32);
    const bh = 30;
    doc.setFillColor(...C.cream);
    doc.roundedRect(M, y, CW, bh, 2, 2, "F");
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(M, y, CW, bh, 2, 2, "S");

    // Amber left accent bar
    doc.setFillColor(...C.amber);
    doc.roundedRect(M, y, 3, bh, 1, 1, "F");

    doc.setTextColor(...C.forest);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text(title, M + 7, y + 7);

    const colW = CW / 3;
    const fields = [
      { lbl: "Printed name", val: fmt(printed) },
      { lbl: "Typed signature", val: fmt(signed) },
      { lbl: "Date", val: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
    ];
    fields.forEach((f, i) => {
      const fx = M + 7 + i * colW;
      doc.setTextColor(...C.stone);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text(f.lbl, fx, y + 15);
      doc.setTextColor(...C.warm);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(f.val, fx, y + 23);
      // underline
      doc.setDrawColor(...C.border);
      doc.setLineWidth(0.3);
      doc.line(fx, y + 25, fx + colW - 4, y + 25);
    });
    y += bh + 5;
  }

  // ── Footer (added after all pages are built) ──────────────────────────────
  function addFooters(total: number) {
    for (let p = 1; p <= total; p++) {
      doc.setPage(p);
      doc.setFillColor(...C.cream);
      doc.rect(0, MM.H - 11, MM.W, 11, "F");
      doc.setDrawColor(...C.border);
      doc.setLineWidth(0.2);
      doc.line(M, MM.H - 11, MM.W - M, MM.H - 11);
      doc.setTextColor(...C.stone);
      doc.setFontSize(6.5);
      doc.setFont("helvetica", "normal");
      doc.text("Katie's K9s · Congleton, Cheshire · katies-k9s@hotmail.com · 07540 316 692", M, MM.H - 5);
      doc.text(`Page ${p} of ${total}`, MM.W - M, MM.H - 5, { align: "right" });
    }
  }

  // ── Build the document ─────────────────────────────────────────────────────
  coverHeader();

  // ── OWNER 1 ───────────────────────────────────────────────────────────────
  section("Owner Details");
  const o1 = data.owner1;
  row("First name", o1.firstName, false);
  row("Surname", o1.surname, true);
  row("Address", [o1.addressLine1, o1.addressLine2, o1.town, o1.postcode].filter(Boolean).join(", "), false);
  row("Mobile", o1.mobile, true);
  row("Home phone", o1.homePhone, false);
  row("Email", o1.email, true);

  if (data.hasOwner2) {
    section("Owner 2 Details");
    const o2 = data.owner2;
    row("First name", o2.firstName, false);
    row("Surname", o2.surname, true);
    row("Address", [o2.addressLine1, o2.addressLine2, o2.town, o2.postcode].filter(Boolean).join(", "), false);
    row("Mobile", o2.mobile, true);
    row("Home phone", o2.homePhone, false);
    row("Email", o2.email, true);
  }

  section("Emergency Contact");
  const ec = data.emergencyContact;
  row("Full name", `${ec.firstName} ${ec.surname}`, false);
  row("Mobile", ec.mobile, true);
  row("Home phone", ec.homePhone, false);
  row("Email", ec.email, true);

  // ── DOG ───────────────────────────────────────────────────────────────────
  section("Dog Details");
  const dog = data.dog;
  row("Name", dog.name, false);
  row("Date of birth", fmtDate(dog.dob), true);
  row("Breed", dog.breed, false);
  row("Sex", dog.sex, true);
  row("Weight", dog.weightKg ? `${dog.weightKg} kg` : "—", false);
  row("Neutered / Spayed", dog.neutered, true);
  row("Microchip number", dog.microchipNumber, false);

  // ── HEALTH ────────────────────────────────────────────────────────────────
  section("Health & Vaccinations");
  const h = data.health;
  row("Last vaccination date", fmtDate(h.lastVaccinationDate), false);
  row("Vaccination details", h.vaccinationDetails, true);
  row("Last kennel cough date", fmtDate(h.lastKennelCoughDate), false);
  row("Last flea treatment", fmtDate(h.lastFleaTreatmentDate), true);
  row("Next flea treatment due", fmtDate(h.nextFleaTreatmentDate), false);
  row("Last worming treatment", fmtDate(h.lastWormingDate), true);
  row("Next worming due", fmtDate(h.nextWormingDate), false);
  row("Medical conditions", h.medicalConditions, true);
  row("Medications", h.medications, false);
  row("Allergies", h.allergies, true);
  row("Digestive disruptions", h.digestiveDisruptions, false);
  if (dog.sex === "Female" && dog.neutered === "No") {
    row("Last season date", fmtDate(h.lastSeasonDate), true);
    row("Expected next season", fmtDate(h.nextSeasonDate), false);
  }

  // ── VET ───────────────────────────────────────────────────────────────────
  section("Vet Details");
  const v = data.vet;
  row("Practice name", v.vetName, false);
  row("Address", [v.vetAddressLine1, v.vetAddressLine2, v.vetTown, v.vetPostcode].filter(Boolean).join(", "), true);
  row("Phone", v.vetPhone, false);
  row("Out of hours", v.vetOutOfHoursPhone, true);

  section("Insurance");
  const ins = data.insurance;
  row("Provider", ins.insuranceProvider, false);
  row("Policy number", ins.policyNumber, true);
  row("Phone", ins.insurancePhone, false);

  // ── FEEDING ───────────────────────────────────────────────────────────────
  section("Feeding Instructions");
  const f = data.feeding;
  row("Food type", f.foodType, false);
  row("Food brand", f.foodBrand, true);
  row("Quantity per meal", f.quantityGrams ? `${f.quantityGrams}g` : "—", false);
  row("Meals per day", f.mealsPerDay, true);
  row("Meal times", f.mealTimes, false);
  row("Preparation details", f.preparationDetails, true);
  row("Katie's K9s treats allowed", f.treatsAllowed, false);
  row("Eating style", f.eatingStyle, true);
  row("Food orientated", f.foodOriented, false);
  row("Other feeding notes", f.otherFeedingInstructions, true);

  // ── BEHAVIOUR ─────────────────────────────────────────────────────────────
  section("Behaviour & Routine");
  const b = data.behaviour;
  row("Commands", b.commands, false);
  row("Toys & games", b.toysAndGames, true);
  row("Daily exercise", b.dailyExercise, false);
  row("Sleeps where", b.sleepsWhere, true);
  row("Other behaviour notes", b.otherBehaviourInfo, false);

  section("Behaviour Characteristics");
  let shade = false;
  const bqs: [string, string, string?][] = [
    ["Boarded / day care before?",            b.boardedBefore],
    ["Likes cuddles?",                         b.likesCuddles],
    ["Steals food?",                           b.stealsFood],
    ["Possessive with food?",                  b.possessiveFood],
    ["Possessive with toys?",                  b.possessiveToys],
    ["Jumps up at people / dogs?",             b.jumpsUp],
    ["Likely to toilet indoors?",              b.toiletsIndoors],
    ["Happy to be left alone?",                b.happyAlone],
    ["Barks at other dogs / people?",          b.barksAtOthers],
    ["Recalls when off lead?",                 b.recallOffLead],
    ["Happy in the car?",                      b.happyInCar],
    ["Happy in/around water?",                 b.happyNearWater],
    ["Nervous or anxious?",                    b.nervousAnxious,           b.nervousDetails],
    ["Reacts to loud noises?",                 b.loudNoises,               b.loudNoisesDetails],
    ["Shows destructive behaviour?",           b.destructive,              b.destructiveDetails],
    ["Shows escapist behaviour?",              b.escapist,                 b.escapistDetails],
    ["Aggressive with other dogs?",            b.aggressiveOtherDogs,      b.aggressiveOtherDogsDetails],
    ["Aggressive with people / children?",     b.aggressivePeople,         b.aggressivePeopleDetails],
  ];
  bqs.forEach(([lbl, val, det]) => { ynRow(lbl, val, det, shade); shade = !shade; });

  // ── CRATE & GROOMING ──────────────────────────────────────────────────────
  section("Crate & Grooming");
  const cg = data.crateGrooming;
  row("Uses crate at home?", cg.usesCrateAtHome, false);
  row("When uses crate", cg.whenUsesCrate, true);
  row("Consent to crate?", cg.consentToCrate, false);
  row("Consent — crate door closed?", cg.consentCrateDoorClosed, true);
  row("Grooming schedule", cg.groomingSchedule, false);

  // ── CONSENTS ──────────────────────────────────────────────────────────────
  section("Consents");
  const con = data.consents;
  let cs = false;
  const conRows: [string, boolean][] = [
    ["Veterinary care (required)",                     con.consentVetCare],
    ["Mixing with dogs from other households",         con.consentMixWithDogs],
    ["Treats provided by Katie's K9s",                 con.consentTreats],
    ["Fed in a separate area",                         con.consentFedElsewhere],
    ["Off lead outside the home",                      con.consentOffLead],
    ["Transported in car",                             con.consentTransportedInCar],
    ["Walked with other dogs in care",                 con.consentWalkedWithOtherDogs],
    ["Cognitive enrichment activities",                con.consentCognitiveEnrichment],
    ["Sensory enrichment activities",                  con.consentSensoryEnrichment],
    ["Physical enrichment activities",                 con.consentPhysicalEnrichment],
    ["Social enrichment activities",                   con.consentSocialEnrichment],
    ["Environmental enrichment activities",            con.consentEnvironmentalEnrichment],
    ["Off lead in secure field / enclosed dog park",   con.consentSecureFieldOffLead],
    ["Photos & videos for marketing",                  con.consentPhotosVideos],
  ];
  conRows.forEach(([lbl, val]) => { consentRow(lbl, val, cs); cs = !cs; });

  section("Terms & Conditions");
  row("Terms and conditions agreed", yn(data.tcAgreed), false);

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  section("Declarations & Signatures");
  sigBlock("Owner 1 — Declaration & Agreement",
    data.signature.owner1PrintedName,
    data.signature.owner1SignedName);
  if (data.hasOwner2) {
    sigBlock("Owner 2 — Declaration & Agreement",
      data.signature.owner2PrintedName,
      data.signature.owner2SignedName);
  }

  section("Veterinary Authorisation");
  const vetAuthText = [
    "During my absence, Katie's K9s will be caring for my dog(s) and has permission to transport them to a",
    "veterinary surgery for treatment. I authorise the vet to treat my dog(s) and I, as the owner, will be",
    "responsible for all payment. I give Katie's K9s permission to make any decisions on treatments they",
    "feel need to be carried out, and I understand that Katie's K9s assumes no responsibility for loss of",
    "the dog(s) and is released from all liability related to transportation, treatment and expense.",
  ].join(" ");
  ensureSpace(16);
  doc.setTextColor(...C.warm);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  const vtLines = doc.splitTextToSize(vetAuthText, CW);
  doc.text(vtLines, M, y);
  y += vtLines.length * 4.2 + 4;

  sigBlock("Owner 1 — Veterinary Authorisation",
    data.signature.vetAuthOwner1PrintedName,
    data.signature.vetAuthOwner1SignedName);
  if (data.hasOwner2) {
    sigBlock("Owner 2 — Veterinary Authorisation",
      data.signature.vetAuthOwner2PrintedName,
      data.signature.vetAuthOwner2SignedName);
  }

  // ── Footers on all pages ──────────────────────────────────────────────────
  const total = (doc as unknown as { internal: { getNumberOfPages: () => number } })
    .internal.getNumberOfPages();
  addFooters(total);

  return doc.output("blob");
}
