"use client";

import { FormData, SignatureDetails } from "./types";
import {
  Field,
  Input,
  SectionHeading,
  InfoBanner,
  ConsentRow,
} from "./FormComponents";
import legal from "@/content/legal.json";

interface LegalSection {
  heading: string;
  clauses: string[];
}

function ScrollPanel({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 h-72 overflow-y-auto p-5 text-sm text-[#6B6560] leading-relaxed space-y-5">
      {sections.map((section) => (
        <div key={section.heading}>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">{section.heading}</h3>
          <ul className="space-y-2">
            {section.clauses.map((clause, i) => (
              <li key={i}>{clause}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Step8Agreements({
  data,
  onUpdate,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  data: FormData;
  onUpdate: (patch: Partial<FormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const tc = legal.termsAndConditions;
  const pp = legal.privacyPolicy;
  const sig = data.signature;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const updateSig = (field: keyof SignatureDetails, value: string) =>
    onUpdate({ signature: { ...sig, [field]: value } });

  const canSubmit =
    data.vetAuthAgreed &&
    data.tcAgreed &&
    data.privacyAgreed &&
    sig.owner1SignedName.trim() !== "";

  return (
    <div className="flex flex-col gap-8">
      {/* ── Veterinary Authorisation ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <SectionHeading>Veterinary Authorisation</SectionHeading>
        <InfoBanner>
          If your dog requires veterinary attention during their stay with Katie&apos;s K9s, we will always endeavour to use your dog&apos;s usual veterinary practice and consult with you before any treatment or action is taken, wherever reasonably possible.
          In an emergency, or where circumstances or our location make it necessary, we may instead use our registered veterinary practice, Millie&apos;s Vets, 6 John Bradshaw Close, Congleton CW12 1LB. 
        </InfoBanner>
        <div className="bg-white rounded-xl border border-stone-100 p-4 text-sm text-[#6B6560] leading-relaxed">
          <p className="mb-2">
            You agree that, during your absence, Katie&apos;s K9s may care for your
            dog(s) and, if necessary, transport them to a veterinary surgery for
            assessment or treatment.
          </p>
          <p className="mb-2">
            You authorise the veterinary surgeon to examine and provide any
            necessary treatment to your dog(s), and you agree to be responsible
            for all veterinary fees and associated expenses incurred.
          </p>
          <p className="mb-2">
            You agree that Katie&apos;s K9s may make decisions regarding veterinary
            treatment where, in their reasonable judgement, immediate treatment
            is necessary and you cannot be contacted in time. You understand
            that Katie&apos;s K9s will always act in the best interests of your
            dog(s) and will make reasonable efforts to contact you or your
            emergency contact where possible.
          </p>
          <p>
            You acknowledge and agree that Katie&apos;s K9s accepts no
            responsibility for veterinary treatment, transportation or
            associated expenses, except where liability cannot legally be
            excluded or limited. You agree to be responsible for any costs
            incurred in connection with the transportation, examination or
            treatment of your dog(s).
          </p>
        </div>
        <ConsentRow
          checked={data.vetAuthAgreed}
          onChange={(v) => onUpdate({ vetAuthAgreed: v })}
        >
          I acknowledge that I have read, understood and agree to the Veterinary
          Authorisation above.
        </ConsentRow>
      </div>

      {/* ── Terms & Conditions ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-serif text-xl text-[#3D5A3E] mb-1">
            Terms &amp; Conditions
          </h2>
          <p className="text-sm text-[#6B6560]">
            Please read carefully and scroll to the bottom before agreeing.
          </p>
        </div>
        <ScrollPanel sections={tc.sections} />
        <ConsentRow
          checked={data.tcAgreed}
          onChange={(v) => onUpdate({ tcAgreed: v })}
        >
          I acknowledge that I have read, understood and agree to the Terms &amp;
          Conditions.
        </ConsentRow>
      </div>

      {/* ── Privacy Policy ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-serif text-xl text-[#3D5A3E] mb-1">
            Privacy Policy
          </h2>
          <p className="text-sm text-[#6B6560]">
            Please read how we handle your information before agreeing.
          </p>
        </div>
        <ScrollPanel sections={pp.sections} />
        <ConsentRow
          checked={data.privacyAgreed}
          onChange={(v) => onUpdate({ privacyAgreed: v })}
        >
          I acknowledge that I have read, understood and agree to the Privacy
          Policy.
        </ConsentRow>
      </div>

      {/* ── Sign-off ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <SectionHeading>Declaration &amp; Sign-off</SectionHeading>
        <InfoBanner>
          I confirm that I am Owner 1 and that all information provided in this
          registration is accurate and complete. I
          confirm that I have carefully read and understood all information
          presented throughout the registration process and acknowledge and
          agree to the applicable terms, policies, consents, authorisations and
          declarations. By submitting this form, I confirm my acceptance of
          these and provide my sign off on this registration.
        </InfoBanner>

        <div className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-4">
          <Field
            label="Owner 1 full name"
            hint="By typing your name you confirm your agreement and intent to sign"
            required
          >
            <Input
              value={sig.owner1SignedName}
              onChange={(v) => updateSig("owner1SignedName", v)}
              placeholder="Type your full name as your signature"
              autoComplete="name"
              required
            />
          </Field>
          <div className="text-xs text-[#8B7355]">
            Date: <span className="font-medium">{today}</span>
          </div>
        </div>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center pt-6 mt-2 border-t border-stone-100">
        <button
          type="button"
          onClick={onBack}
          className="border-2 border-[#3D5A3E] text-[#3D5A3E] hover:bg-[#3D5A3E] hover:text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`font-medium px-8 py-3 rounded-full transition-colors text-white ${
            canSubmit && !isSubmitting
              ? "bg-[#3D5A3E] hover:bg-[#2C4230]"
              : "bg-[#3D5A3E]/40 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Submitting…" : "Submit Registration"}
        </button>
      </div>
    </div>
  );
}
