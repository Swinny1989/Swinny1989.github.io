"use client";

import { FormData, SignatureDetails } from "./types";
import { Field, Input, SectionHeading, InfoBanner } from "./FormComponents";

function SignatureBlock({
  title,
  signedName,
  onSignedNameChange,
  required,
}: {
  title: string;
  signedName: string;
  onSignedNameChange: (v: string) => void;
  required?: boolean;
}) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-4">
      <h3 className="font-medium text-[#3D5A3E]">{title}</h3>
      <Field
        label="Full name"
        hint="By typing your name you confirm your agreement and intent to sign"
        required={required}
      >
        <Input
          value={signedName}
          onChange={onSignedNameChange}
          placeholder="Type your full name as your signature"
          autoComplete="name"
          required={required}
        />
      </Field>
      <div className="text-xs text-[#8B7355]">
        Date: <span className="font-medium">{today}</span>
      </div>
    </div>
  );
}

export default function Step9Signature({
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
  const sig = data.signature;
  const update = (field: keyof SignatureDetails, value: string) =>
    onUpdate({ signature: { ...sig, [field]: value } });

  const hasOwner2Filled =
    data.owner2.firstName.trim() !== "" || data.owner2.surname.trim() !== "";

  const canSubmit =
    sig.owner1SignedName.trim() !== "" &&
    sig.vetAuthOwner1SignedName.trim() !== "" &&
    (!hasOwner2Filled ||
      (sig.owner2SignedName.trim() !== "" &&
        sig.vetAuthOwner2SignedName.trim() !== ""));

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Declaration &amp; Signature</SectionHeading>
      <InfoBanner>
        By submitting this form, you confirm that all information provided is
        accurate and up to date. You also confirm that you have read and agree
        to the Terms &amp; Conditions.
      </InfoBanner>

      <SignatureBlock
        title="Owner 1"
        signedName={sig.owner1SignedName}
        onSignedNameChange={(v) => update("owner1SignedName", v)}
        required
      />

      {hasOwner2Filled && (
        <SignatureBlock
          title="Owner 2"
          signedName={sig.owner2SignedName}
          onSignedNameChange={(v) => update("owner2SignedName", v)}
          required
        />
      )}

      <SectionHeading>Veterinary Authorisation</SectionHeading>
      <div className="bg-white rounded-xl border border-stone-100 p-4 text-sm text-[#6B6560] leading-relaxed">
        <p className="font-medium text-[#3D5A3E] mb-2">
          Katie&apos;s K9s&apos; registered veterinary practice:
        </p>
        <address className="not-italic mb-4">
          Millie&apos;s Vets, 6 John Bradshaw Close, Congleton CW12 1LB
        </address>
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
          treatment where, in their reasonable judgement, immediate treatment is
          necessary and you cannot be contacted in time. You understand that
          Katie&apos;s K9s will always act in the best interests of your dog(s) and
          will make reasonable efforts to contact you or your emergency contact
          where possible.
        </p>
        <p>
          You acknowledge and agree that Katie&apos;s K9s accepts no responsibility
          for veterinary treatment, transportation or associated expenses, except
          where liability cannot legally be excluded or limited. You agree to be
          responsible for any costs incurred in connection with the
          transportation, examination or treatment of your dog(s).
        </p>
      </div>

      <SignatureBlock
        title="Veterinary Authorisation — Owner 1"
        signedName={sig.vetAuthOwner1SignedName}
        onSignedNameChange={(v) => update("vetAuthOwner1SignedName", v)}
        required
      />

      {hasOwner2Filled && (
        <SignatureBlock
          title="Veterinary Authorisation — Owner 2"
          signedName={sig.vetAuthOwner2SignedName}
          onSignedNameChange={(v) => update("vetAuthOwner2SignedName", v)}
          required
        />
      )}

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
          className="bg-[#C8956C] hover:bg-[#b07d58] text-white font-medium px-8 py-3 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting…" : "Submit Registration"}
        </button>
      </div>
    </div>
  );
}
