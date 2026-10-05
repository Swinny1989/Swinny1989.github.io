"use client";

import { FormData, BehaviourDetails, YesNo, YesNoSometimes } from "./types";
import {
  Field,
  Input,
  Textarea,
  ToggleGroup,
  SectionHeading,
  StepNav,
} from "./FormComponents";

const YES_NO = ["Yes", "No"] as const;
const YES_NO_SOMETIMES = ["Yes", "No", "Sometimes"] as const;

function BehaviourRow({
  label,
  value,
  hasDetails,
  detailsValue,
  detailsPlaceholder,
  options,
  onChange,
  onDetailsChange,
}: {
  label: string;
  value: YesNoSometimes | YesNo;
  hasDetails?: boolean;
  detailsValue?: string;
  detailsPlaceholder?: string;
  options: readonly string[];
  onChange: (v: string) => void;
  onDetailsChange?: (v: string) => void;
}) {
  const showDetails = hasDetails && (value === "Yes" || value === "Sometimes");
  return (
    <div className="flex flex-col gap-2 py-3 border-b border-stone-100 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-sm text-[#6B6560] flex-1">{label}</span>
        <ToggleGroup
          options={options as string[]}
          value={value}
          onChange={onChange}
        />
      </div>
      {showDetails && onDetailsChange && (
        <Input
          value={detailsValue ?? ""}
          onChange={onDetailsChange}
          placeholder={detailsPlaceholder ?? "Please provide details"}
        />
      )}
    </div>
  );
}

export default function Step5Behaviour({
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
  const b = data.behaviour;
  const update = (field: keyof BehaviourDetails, value: string) =>
    onUpdate({ behaviour: { ...b, [field]: value } });

  const allAnswered =
    b.boardedBefore !== "" &&
    b.likesCuddles !== "" &&
    b.stealsFood !== "" &&
    b.possessiveFood !== "" &&
    b.possessiveToys !== "" &&
    b.jumpsUp !== "" &&
    b.toiletsIndoors !== "" &&
    b.happyAlone !== "" &&
    b.barksAtOthers !== "" &&
    b.recallOffLead !== "" &&
    b.happyInCar !== "" &&
    b.happyNearWater !== "" &&
    b.nervousAnxious !== "" &&
    b.loudNoises !== "" &&
    b.destructive !== "" &&
    b.escapist !== "" &&
    b.aggressiveOtherDogs !== "" &&
    b.aggressivePeople !== "";

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Personality & Routine</SectionHeading>

      <Field label="Commands" hint="Include toileting commands (e.g. 'wees', 'business')">
        <Textarea
          value={b.commands}
          onChange={(v) => update("commands", v)}
          placeholder="e.g. Sit, Stay, Down, Off, Leave, Wees"
          rows={2}
        />
      </Field>

      <Field label="Favourite toys, games & activities">
        <Textarea
          value={b.toysAndGames}
          onChange={(v) => update("toysAndGames", v)}
          placeholder="What does your dog love to do?"
          rows={2}
        />
      </Field>

      <Field
        label="Daily exercise routine"
        hint="Number of walks, duration, and any activity limitations"
      >
        <Textarea
          value={b.dailyExercise}
          onChange={(v) => update("dailyExercise", v)}
          placeholder="e.g. 2 walks a day, 30 mins each. Can't run due to hip dysplasia."
          rows={3}
        />
      </Field>

      <Field label="Where does your dog usually sleep overnight?">
        <Input
          value={b.sleepsWhere}
          onChange={(v) => update("sleepsWhere", v)}
          placeholder="e.g. Dog bed in bedroom, crate in kitchen, sofa"
          autoComplete="off"
        />
      </Field>

      <SectionHeading>Behaviour Questions</SectionHeading>

      <div className="bg-white rounded-xl border border-stone-100 px-4 divide-y divide-stone-50">
        <BehaviourRow
          label="Have they stayed with a dog boarder, day care or kennels before?"
          value={b.boardedBefore}
          options={YES_NO}
          onChange={(v) => update("boardedBefore", v as YesNo)}
        />
        <BehaviourRow
          label="Do they like cuddles?"
          value={b.likesCuddles}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("likesCuddles", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Are they likely to steal food from people or surfaces?"
          value={b.stealsFood}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("stealsFood", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Are they possessive with food?"
          value={b.possessiveFood}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("possessiveFood", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Are they possessive with toys?"
          value={b.possessiveToys}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("possessiveToys", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Will they jump up at people, children or dogs?"
          value={b.jumpsUp}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("jumpsUp", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Are they likely to toilet indoors?"
          value={b.toiletsIndoors}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("toiletsIndoors", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Are they happy to be left alone for short periods?"
          value={b.happyAlone}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("happyAlone", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Do they bark at other dogs and/or people?"
          value={b.barksAtOthers}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("barksAtOthers", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Will they recall when off lead?"
          value={b.recallOffLead}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("recallOffLead", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Are they happy to travel in the car?"
          value={b.happyInCar}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("happyInCar", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Are they happy in and around water?"
          value={b.happyNearWater}
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("happyNearWater", v as YesNoSometimes)}
        />
        <BehaviourRow
          label="Are they nervous or anxious?"
          value={b.nervousAnxious}
          hasDetails
          detailsValue={b.nervousDetails}
          detailsPlaceholder="What causes anxiety? How do they react?"
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("nervousAnxious", v as YesNoSometimes)}
          onDetailsChange={(v) => update("nervousDetails", v)}
        />
        <BehaviourRow
          label="Do they show discomfort around loud noises (fireworks, thunder, traffic)?"
          value={b.loudNoises}
          hasDetails
          detailsValue={b.loudNoisesDetails}
          detailsPlaceholder="Describe their reaction"
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("loudNoises", v as YesNoSometimes)}
          onDetailsChange={(v) => update("loudNoisesDetails", v)}
        />
        <BehaviourRow
          label="Do they show destructive behaviour (scratching, chewing, destroying toys)?"
          value={b.destructive}
          hasDetails
          detailsValue={b.destructiveDetails}
          detailsPlaceholder="What triggers it? What do they target?"
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("destructive", v as YesNoSometimes)}
          onDetailsChange={(v) => update("destructiveDetails", v)}
        />
        <BehaviourRow
          label="Do they show escapist behaviour?"
          value={b.escapist}
          hasDetails
          detailsValue={b.escapistDetails}
          detailsPlaceholder="How do they attempt to escape? What triggers it?"
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("escapist", v as YesNoSometimes)}
          onDetailsChange={(v) => update("escapistDetails", v)}
        />
        <BehaviourRow
          label="Have they ever shown aggression towards other dogs?"
          value={b.aggressiveOtherDogs}
          hasDetails
          detailsValue={b.aggressiveOtherDogsDetails}
          detailsPlaceholder="Describe the behaviour and any known triggers"
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("aggressiveOtherDogs", v as YesNoSometimes)}
          onDetailsChange={(v) => update("aggressiveOtherDogsDetails", v)}
        />
        <BehaviourRow
          label="Have they ever shown aggression towards people, including children?"
          value={b.aggressivePeople}
          hasDetails
          detailsValue={b.aggressivePeopleDetails}
          detailsPlaceholder="Describe the behaviour and any known triggers"
          options={YES_NO_SOMETIMES}
          onChange={(v) => update("aggressivePeople", v as YesNoSometimes)}
          onDetailsChange={(v) => update("aggressivePeopleDetails", v)}
        />
      </div>

      <Field label="Any other behavioural information or characteristics to note">
        <Textarea
          value={b.otherBehaviourInfo}
          onChange={(v) => update("otherBehaviourInfo", v)}
          rows={3}
        />
      </Field>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        isFirst={false}
        isLast={false}
        disabled={!allAnswered}
      />
    </div>
  );
}
