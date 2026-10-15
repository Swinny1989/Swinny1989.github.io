"use client";

import { FormData } from "./types";
import { ConsentRow, StepNav } from "./FormComponents";
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

export default function Step8TandCs({
  data,
  onUpdate,
  onBack,
  onNext,
}: {
  data: FormData;
  onUpdate: (patch: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const tc = legal.termsAndConditions;
  const pp = legal.privacyPolicy;

  const canContinue = data.tcAgreed && data.privacyAgreed;

  return (
    <div className="flex flex-col gap-6">
      {/* Terms & Conditions */}
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

      {/* Privacy Policy */}
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

      <StepNav
        onBack={onBack}
        onNext={onNext}
        isFirst={false}
        isLast={false}
        disabled={!canContinue}
      />
    </div>
  );
}
