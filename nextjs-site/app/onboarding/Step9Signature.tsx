"use client";

import { FormData, SignatureDetails } from "./types";
import { Field, Input, SectionHeading, InfoBanner } from "./FormComponents";

function SignatureBlock({
  title,
  printedName,
  signedName,
  onPrintedNameChange,
  onSignedNameChange,
  required,
}: {
  title: string;
  printedName: string;
  signedName: string;
  onPrintedNameChange: (v: string) => void;
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
      <Field label="Full name (printed)" required={required}>
        <Input
          value={printedName}
          onChange={onPrintedNameChange}
          autoComplete="name"
          required={required}
        />
      </Field>
      <Field
        label="Signature (type your full name)"
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
  const update = (field: keyof SignatureDetails, value: string | boolean) =>
    onUpdate({ signature: { ...sig, [field]: value } });

  const canSubmit =
    sig.owner1PrintedName.trim() !== "" &&
    sig.owner1SignedName.trim() !== "" &&
    sig.vetAuthOwner1PrintedName.trim() !== "" &&
    sig.vetAuthOwner1SignedName.trim() !== "" &&
    (!data.hasOwner2 ||
      (sig.owner2PrintedName.trim() !== "" &&
        sig.owner2SignedName.trim() !== "" &&
        sig.vetAuthOwner2PrintedName.trim() !== "" &&
        sig.vetAuthOwner2SignedName.trim() !== ""));

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Declaration &amp; Signature</SectionHeading>
      <InfoBanner>
        By signing below you confirm that all information provided is factual
        and up to date, and you agree to all terms and conditions stated within
        this contract. Your statutory rights are not affected.
      </InfoBanner>

      <SignatureBlock
        title="Owner 1"
        printedName={sig.owner1PrintedName}
        signedName={sig.owner1SignedName}
        onPrintedNameChange={(v) => update("owner1PrintedName", v)}
        onSignedNameChange={(v) => update("owner1SignedName", v)}
        required
      />

      {data.hasOwner2 && (
        <SignatureBlock
          title="Owner 2"
          printedName={sig.owner2PrintedName}
          signedName={sig.owner2SignedName}
          onPrintedNameChange={(v) => update("owner2PrintedName", v)}
          onSignedNameChange={(v) => update("owner2SignedName", v)}
          required
        />
      )}

      <SectionHeading>Veterinary Authorisation</SectionHeading>
      <div className="bg-white rounded-xl border border-stone-100 p-4 text-sm text-[#6B6560] leading-relaxed">
        <p>
          In the event that veterinary care is required during your dog&apos;s stay,
          every effort will be made to contact and use your designated
          veterinary practice. However, if the situation is deemed urgent and,
          in our judgment, it is in the best interest of the dog to seek
          immediate care, we reserve the right to use our chosen veterinary
          practice.
        </p>
        <p className="mt-3 font-medium text-[#3D5A3E]">
          Katie&apos;s K9s&apos; registered veterinary practice:
        </p>
        <address className="not-italic mt-1">
          Millie&apos;s Vets, 6 John Bradshaw Close, Congleton CW12 1LB
        </address>
        <p className="mt-3">
          During my absence, Katie&apos;s K9s will be caring for my dog(s) and has
          permission to transport them to the surgery for treatment. I authorise
          the vet to treat my dog(s) and I, as the owner, will be responsible
          for payment. I hereby give Katie&apos;s K9s permission to make any
          decisions on treatments they feel need to be carried out and I
          understand that Katie&apos;s K9s assumes no responsibility for the loss of
          the dog(s) and is released from all liability related to
          transportation, treatment and expense.
        </p>
      </div>

      <SignatureBlock
        title="Veterinary Authorisation — Owner 1"
        printedName={sig.vetAuthOwner1PrintedName}
        signedName={sig.vetAuthOwner1SignedName}
        onPrintedNameChange={(v) => update("vetAuthOwner1PrintedName", v)}
        onSignedNameChange={(v) => update("vetAuthOwner1SignedName", v)}
        required
      />

      {data.hasOwner2 && (
        <SignatureBlock
          title="Veterinary Authorisation — Owner 2"
          printedName={sig.vetAuthOwner2PrintedName}
          signedName={sig.vetAuthOwner2SignedName}
          onPrintedNameChange={(v) => update("vetAuthOwner2PrintedName", v)}
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
