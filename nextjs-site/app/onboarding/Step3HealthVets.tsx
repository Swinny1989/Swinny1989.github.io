"use client";

import { FormData, HealthDetails, VetDetails, InsuranceDetails } from "./types";
import {
  Field,
  Input,
  Textarea,
  SectionHeading,
  InfoBanner,
  StepNav,
  AddressBlock,
} from "./FormComponents";

export default function Step3HealthVets({
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
  const h = data.health;
  const v = data.vet;
  const ins = data.insurance;

  const isFemaleUnneutered =
    data.dog.sex === "Female" && data.dog.neutered === "No";

  const updateHealth = (field: keyof HealthDetails, value: string) =>
    onUpdate({ health: { ...h, [field]: value } });

  const updateVet = (field: keyof VetDetails, value: string) =>
    onUpdate({ vet: { ...v, [field]: value } });

  const updateInsurance = (field: keyof InsuranceDetails, value: string) =>
    onUpdate({ insurance: { ...ins, [field]: value } });

  const canContinue =
    h.lastVaccinationDate.trim() !== "" &&
    h.lastFleaTreatmentDate.trim() !== "" &&
    h.lastWormingDate.trim() !== "" &&
    v.vetName.trim() !== "" &&
    v.vetAddressLine1.trim() !== "" &&
    v.vetPhone.trim() !== "";

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Vaccinations</SectionHeading>
      <InfoBanner>
        A current vaccination certificate must be presented before your booking
        is accepted.
      </InfoBanner>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Date of last vaccinations" required>
          <Input
            value={h.lastVaccinationDate}
            onChange={(v) => updateHealth("lastVaccinationDate", v)}
            type="date"
            required
          />
        </Field>
        <Field label="Date of last kennel cough vaccination">
          <Input
            value={h.lastKennelCoughDate}
            onChange={(v) => updateHealth("lastKennelCoughDate", v)}
            type="date"
          />
        </Field>
      </div>

      <Field
        label="Vaccination details"
        hint="e.g. Distemper, Parvovirus, Leptospirosis, Adenovirus"
      >
        <Textarea
          value={h.vaccinationDetails}
          onChange={(v) => updateHealth("vaccinationDetails", v)}
          placeholder="List vaccinations included in their certificate"
          rows={2}
        />
      </Field>

      <SectionHeading>Flea & Worm Treatments</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Last flea treatment date" required>
          <Input
            value={h.lastFleaTreatmentDate}
            onChange={(v) => updateHealth("lastFleaTreatmentDate", v)}
            type="date"
            required
          />
        </Field>
        <Field label="Next flea treatment due">
          <Input
            value={h.nextFleaTreatmentDate}
            onChange={(v) => updateHealth("nextFleaTreatmentDate", v)}
            type="date"
          />
        </Field>
        <Field label="Last worming treatment date" required>
          <Input
            value={h.lastWormingDate}
            onChange={(v) => updateHealth("lastWormingDate", v)}
            type="date"
            required
          />
        </Field>
        <Field label="Next worming treatment due">
          <Input
            value={h.nextWormingDate}
            onChange={(v) => updateHealth("nextWormingDate", v)}
            type="date"
          />
        </Field>
      </div>

      <SectionHeading>Medical History</SectionHeading>

      <Field label="Medical conditions">
        <Textarea
          value={h.medicalConditions}
          onChange={(v) => updateHealth("medicalConditions", v)}
          placeholder="Any ongoing or historical conditions"
          rows={2}
        />
      </Field>
      <Field label="Medications">
        <Textarea
          value={h.medications}
          onChange={(v) => updateHealth("medications", v)}
          placeholder="Name, dose, and frequency of any medications"
          rows={2}
        />
      </Field>
      <Field label="Allergies">
        <Textarea
          value={h.allergies}
          onChange={(v) => updateHealth("allergies", v)}
          placeholder="Any known allergies"
          rows={2}
        />
      </Field>
      <Field label="Digestive disruptions">
        <Textarea
          value={h.digestiveDisruptions}
          onChange={(v) => updateHealth("digestiveDisruptions", v)}
          placeholder="Any foods that cause digestive issues"
          rows={2}
        />
      </Field>

      {isFemaleUnneutered && (
        <>
          <SectionHeading>Seasons</SectionHeading>
          <InfoBanner>
            Female dogs will not be accepted for home boarding whilst in season
            or within 4 weeks of their season beginning.
          </InfoBanner>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Date of last season">
              <Input
                value={h.lastSeasonDate}
                onChange={(v) => updateHealth("lastSeasonDate", v)}
                type="date"
              />
            </Field>
            <Field label="Expected date of next season">
              <Input
                value={h.nextSeasonDate}
                onChange={(v) => updateHealth("nextSeasonDate", v)}
                type="date"
              />
            </Field>
          </div>
        </>
      )}

      <SectionHeading>Vet Details</SectionHeading>

      <Field label="Vet practice name" required>
        <Input
          value={v.vetName}
          onChange={(val) => updateVet("vetName", val)}
          placeholder="e.g. Millie's Vets"
          autoComplete="section-vet organization"
          required
        />
      </Field>
      <Field label="Vet address" required>
        <AddressBlock
          addressLine1={v.vetAddressLine1}
          addressLine2={v.vetAddressLine2}
          town={v.vetTown}
          postcode={v.vetPostcode}
          onChange={(field, value) =>
            updateVet(("vet" + field.charAt(0).toUpperCase() + field.slice(1)) as keyof VetDetails, value)
          }
          autoCompletePrefix="section-vet "
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Vet phone" required>
          <Input
            value={v.vetPhone}
            onChange={(val) => updateVet("vetPhone", val)}
            type="tel"
            inputMode="tel"
            autoComplete="section-vet tel"
            required
          />
        </Field>
        <Field label="Out of hours phone">
          <Input
            value={v.vetOutOfHoursPhone}
            onChange={(val) => updateVet("vetOutOfHoursPhone", val)}
            type="tel"
            inputMode="tel"
          />
        </Field>
      </div>

      <SectionHeading>Insurance</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Insurance provider">
          <Input
            value={ins.insuranceProvider}
            onChange={(val) => updateInsurance("insuranceProvider", val)}
            autoComplete="section-insurance organization"
          />
        </Field>
        <Field label="Policy number">
          <Input
            value={ins.policyNumber}
            onChange={(val) => updateInsurance("policyNumber", val)}
          />
        </Field>
      </div>
      <Field label="Insurance phone">
        <Input
          value={ins.insurancePhone}
          onChange={(val) => updateInsurance("insurancePhone", val)}
          type="tel"
          inputMode="tel"
          autoComplete="section-insurance tel"
        />
      </Field>

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
