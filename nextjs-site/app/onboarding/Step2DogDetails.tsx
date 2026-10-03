"use client";

import { FormData, DogDetails } from "./types";
import {
  Field,
  Input,
  ToggleGroup,
  SectionHeading,
  InfoBanner,
  StepNav,
} from "./FormComponents";

export default function Step2DogDetails({
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
  const dog = data.dog;
  const update = (field: keyof DogDetails, value: string) =>
    onUpdate({ dog: { ...dog, [field]: value } });

  const canContinue =
    dog.name.trim() !== "" &&
    dog.dob.trim() !== "" &&
    dog.breed.trim() !== "" &&
    dog.sex !== "" &&
    dog.weightKg.trim() !== "" &&
    dog.neutered !== "" &&
    dog.microchipNumber.trim() !== "";

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Your Dog</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Dog's name" required>
          <Input
            value={dog.name}
            onChange={(v) => update("name", v)}
            autoComplete="off"
            required
          />
        </Field>
        <Field label="Date of birth" required>
          <Input
            value={dog.dob}
            onChange={(v) => update("dob", v)}
            type="date"
            required
          />
        </Field>
      </div>

      <Field label="Breed" required>
        <Input
          value={dog.breed}
          onChange={(v) => update("breed", v)}
          placeholder="e.g. Labrador Retriever"
          autoComplete="off"
          required
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Sex" required>
          <ToggleGroup
            options={["Male", "Female"] as const}
            value={dog.sex}
            onChange={(v) => update("sex", v)}
          />
        </Field>
        <Field label="Neutered / Spayed" required>
          <ToggleGroup
            options={["Yes", "No"] as const}
            value={dog.neutered}
            onChange={(v) => update("neutered", v)}
          />
        </Field>
      </div>

      <Field label="Weight (kg)" required>
        <Input
          value={dog.weightKg}
          onChange={(v) => update("weightKg", v)}
          type="number"
          inputMode="decimal"
          placeholder="e.g. 12.5"
          required
        />
      </Field>

      <Field
        label="Microchip number"
        hint="15-digit number — required by law"
        required
      >
        <Input
          value={dog.microchipNumber}
          onChange={(v) => update("microchipNumber", v)}
          inputMode="numeric"
          placeholder="e.g. 985112345678901"
          required
        />
      </Field>

      <InfoBanner>
        All dogs must be fully vaccinated and treated for fleas and worms. New
        treatments or vaccination courses must be administered at least{" "}
        <strong>14 days prior</strong> to your dog&apos;s stay.
      </InfoBanner>

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
