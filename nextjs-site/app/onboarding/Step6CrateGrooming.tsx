"use client";

import { FormData, CrateGroomingDetails, YesNo } from "./types";
import {
  Field,
  Textarea,
  ToggleGroup,
  SectionHeading,
  InfoBanner,
  StepNav,
} from "./FormComponents";

export default function Step6CrateGrooming({
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
  const c = data.crateGrooming;
  const update = (field: keyof CrateGroomingDetails, value: string) =>
    onUpdate({ crateGrooming: { ...c, [field]: value } });

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Crate</SectionHeading>
      <InfoBanner>
        Katie&apos;s K9s will <strong>never</strong> crate a dog that has not been
        crate trained. Crate consent is entirely optional.
      </InfoBanner>

      <Field label="Does your dog use a crate at home?">
        <ToggleGroup
          options={["Yes", "No"] as const}
          value={c.usesCrateAtHome}
          onChange={(v) => update("usesCrateAtHome", v as YesNo)}
        />
      </Field>

      {c.usesCrateAtHome === "Yes" && (
        <Field
          label="When do they tend to use the crate?"
          hint="e.g. overnight, when left alone, as a quiet space"
        >
          <Textarea
            value={c.whenUsesCrate}
            onChange={(v) => update("whenUsesCrate", v)}
            rows={2}
          />
        </Field>
      )}

      <Field label="Do you consent for your dog to be crated?">
        <ToggleGroup
          options={["Yes", "No"] as const}
          value={c.consentToCrate}
          onChange={(v) => update("consentToCrate", v as YesNo)}
        />
      </Field>

      {c.consentToCrate === "Yes" && (
        <Field label="Do you consent for the crate door to be closed when left alone, including overnight?">
          <ToggleGroup
            options={["Yes", "No"] as const}
            value={c.consentCrateDoorClosed}
            onChange={(v) => update("consentCrateDoorClosed", v as YesNo)}
          />
        </Field>
      )}

      <SectionHeading>Grooming</SectionHeading>

      <Field
        label="Grooming schedule & equipment"
        hint="If your dog needs grooming during their stay, please describe their routine and provide any equipment needed (brushes, ear drops, eye wipes etc.)"
      >
        <Textarea
          value={c.groomingSchedule}
          onChange={(v) => update("groomingSchedule", v)}
          placeholder="e.g. Daily brush with a slicker brush. Wipe eyes each morning."
          rows={3}
        />
      </Field>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        isFirst={false}
        isLast={false}
      />
    </div>
  );
}
