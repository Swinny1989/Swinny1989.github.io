"use client";

import { FormData, FeedingDetails } from "./types";
import {
  Field,
  Input,
  Textarea,
  ToggleGroup,
  SectionHeading,
  InfoBanner,
  StepNav,
} from "./FormComponents";

const FOOD_TYPES = ["Dry", "Wet", "Raw", "Mixed"] as const;

export default function Step4Feeding({
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
  const f = data.feeding;
  const update = (field: keyof FeedingDetails, value: string) =>
    onUpdate({ feeding: { ...f, [field]: value } });

  const canContinue =
    f.foodType.trim() !== "" &&
    f.foodBrand.trim() !== "" &&
    f.quantityGrams.trim() !== "" &&
    f.mealsPerDay.trim() !== "" &&
    f.mealTimes.trim() !== "" &&
    f.treatsAllowed !== "" &&
    f.eatingStyle.trim() !== "" &&
    f.foodOriented.trim() !== "";

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Feeding Instructions</SectionHeading>

      <Field label="Food type" required>
        <ToggleGroup
          options={[...FOOD_TYPES]}
          value={f.foodType as (typeof FOOD_TYPES)[number] | ""}
          onChange={(v) => update("foodType", v)}
        />
      </Field>

      <Field label="Food brand" required>
        <Input
          value={f.foodBrand}
          onChange={(v) => update("foodBrand", v)}
          placeholder="e.g. Royal Canin, Forthglade"
          autoComplete="off"
          required
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Quantity per meal (grams)" required>
          {/* type="text" with inputMode="numeric" avoids the spinner arrows */}
          <Input
            value={f.quantityGrams}
            onChange={(v) => update("quantityGrams", v)}
            type="text"
            inputMode="numeric"
            placeholder="e.g. 250"
            required
          />
        </Field>
        <Field label="Number of meals per day" required>
          <Input
            value={f.mealsPerDay}
            onChange={(v) => update("mealsPerDay", v)}
            type="text"
            inputMode="numeric"
            placeholder="e.g. 2"
            required
          />
        </Field>
      </div>

      <Field label="Meal times" required>
        <Input
          value={f.mealTimes}
          onChange={(v) => update("mealTimes", v)}
          placeholder="e.g. 7:30am and 5:30pm"
          autoComplete="off"
          required
        />
      </Field>

      <Field label="Preparation details">
        <Textarea
          value={f.preparationDetails}
          onChange={(v) => update("preparationDetails", v)}
          placeholder="e.g. kibble soaked in warm water, mixed with wet food"
          rows={2}
        />
      </Field>

      <Field label="Are you happy for Katie&apos;s K9s to give your dog treats during their stay?" required>
        <ToggleGroup
          options={["Yes", "No"] as const}
          value={f.treatsAllowed}
          onChange={(v) => update("treatsAllowed", v)}
        />
      </Field>

      <Field label="Eating style" required>
        <ToggleGroup
          options={["Eats immediately", "Grazes throughout day"] as const}
          value={
            f.eatingStyle as "Eats immediately" | "Grazes throughout day" | ""
          }
          onChange={(v) => update("eatingStyle", v)}
        />
      </Field>

      <Field label="Are they food orientated / do they respond to food rewards?" required>
        <Textarea
          value={f.foodOriented}
          onChange={(v) => update("foodOriented", v)}
          placeholder="Tell us how your dog responds to food-based rewards"
          rows={2}
        />
      </Field>

      <Field label="Any other feeding instructions">
        <Textarea
          value={f.otherFeedingInstructions}
          onChange={(v) => update("otherFeedingInstructions", v)}
          rows={2}
        />
      </Field>

      <InfoBanner>
        All dry food must be provided in an airtight, resealable container or
        bag.
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
