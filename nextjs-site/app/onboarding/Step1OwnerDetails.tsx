"use client";

import { FormData, OwnerDetails, EmergencyContact } from "./types";
import {
  Field,
  Input,
  SectionHeading,
  StepNav,
  AddressBlock,
} from "./FormComponents";

function OwnerBlock({
  title,
  data,
  onChange,
  autoPrefix,
}: {
  title: string;
  data: OwnerDetails;
  onChange: (field: keyof OwnerDetails, value: string) => void;
  autoPrefix: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>{title}</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" required>
          <Input
            value={data.firstName}
            onChange={(v) => onChange("firstName", v)}
            autoComplete={`${autoPrefix}given-name`}
            required
          />
        </Field>
        <Field label="Surname" required>
          <Input
            value={data.surname}
            onChange={(v) => onChange("surname", v)}
            autoComplete={`${autoPrefix}family-name`}
            required
          />
        </Field>
      </div>
      <Field label="Address" required>
        <AddressBlock
          addressLine1={data.addressLine1}
          addressLine2={data.addressLine2}
          town={data.town}
          postcode={data.postcode}
          onChange={(field, value) =>
            onChange(field as keyof OwnerDetails, value)
          }
          autoCompletePrefix={autoPrefix}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Mobile" required>
          <Input
            value={data.mobile}
            onChange={(v) => onChange("mobile", v)}
            type="tel"
            autoComplete={`${autoPrefix}tel`}
            inputMode="tel"
            required
          />
        </Field>
        <Field label="Home phone">
          <Input
            value={data.homePhone}
            onChange={(v) => onChange("homePhone", v)}
            type="tel"
            autoComplete={`${autoPrefix}tel-local`}
            inputMode="tel"
          />
        </Field>
      </div>
      <Field label="Email" required>
        <Input
          value={data.email}
          onChange={(v) => onChange("email", v)}
          type="email"
          autoComplete={`${autoPrefix}email`}
          required
        />
      </Field>
    </div>
  );
}

export default function Step1OwnerDetails({
  data,
  onUpdate,
  onNext,
}: {
  data: FormData;
  onUpdate: (patch: Partial<FormData>) => void;
  onNext: () => void;
}) {
  const updateOwner1 = (field: keyof OwnerDetails, value: string) =>
    onUpdate({ owner1: { ...data.owner1, [field]: value } });

  const updateOwner2 = (field: keyof OwnerDetails, value: string) =>
    onUpdate({ owner2: { ...data.owner2, [field]: value } });

  const updateEmergency = (field: keyof EmergencyContact, value: string) =>
    onUpdate({
      emergencyContact: { ...data.emergencyContact, [field]: value },
    });

  const canContinue =
    data.owner1.firstName.trim() !== "" &&
    data.owner1.surname.trim() !== "" &&
    data.owner1.addressLine1.trim() !== "" &&
    data.owner1.postcode.trim() !== "" &&
    data.owner1.mobile.trim() !== "" &&
    data.owner1.email.trim() !== "" &&
    data.emergencyContact.firstName.trim() !== "" &&
    data.emergencyContact.surname.trim() !== "" &&
    data.emergencyContact.mobile.trim() !== "";

  return (
    <div className="flex flex-col gap-2">
      <OwnerBlock
        title="Your Details"
        data={data.owner1}
        onChange={updateOwner1}
        autoPrefix=""
      />

      {/* Owner 2 toggle */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => onUpdate({ hasOwner2: !data.hasOwner2 })}
          className={`flex items-center gap-3 w-full rounded-xl border p-4 transition-colors text-left ${
            data.hasOwner2
              ? "border-[#3D5A3E] bg-[#3D5A3E]/5"
              : "border-stone-200 bg-white hover:border-[#3D5A3E]"
          }`}
        >
          <div
            className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${
              data.hasOwner2 ? "bg-[#3D5A3E]" : "bg-stone-200"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                data.hasOwner2 ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
          <span className="font-medium text-[#3D5A3E]">
            Add a second owner
          </span>
        </button>
      </div>

      {data.hasOwner2 && (
        <div className="mt-2">
          <OwnerBlock
            title="Owner 2 Details"
            data={data.owner2}
            onChange={updateOwner2}
            autoPrefix="section-owner2 "
          />
        </div>
      )}

      {/* Emergency contact */}
      <div className="flex flex-col gap-4 mt-4">
        <SectionHeading>Emergency Contact</SectionHeading>
        <p className="text-sm text-[#6B6560] -mt-2">
          Must be someone willing and able to collect your dog in an emergency,
          and not someone you are travelling with.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First name" required>
            <Input
              value={data.emergencyContact.firstName}
              onChange={(v) => updateEmergency("firstName", v)}
              autoComplete="section-emergency given-name"
              required
            />
          </Field>
          <Field label="Surname" required>
            <Input
              value={data.emergencyContact.surname}
              onChange={(v) => updateEmergency("surname", v)}
              autoComplete="section-emergency family-name"
              required
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Mobile" required>
            <Input
              value={data.emergencyContact.mobile}
              onChange={(v) => updateEmergency("mobile", v)}
              type="tel"
              inputMode="tel"
              autoComplete="section-emergency tel"
              required
            />
          </Field>
          <Field label="Home phone">
            <Input
              value={data.emergencyContact.homePhone}
              onChange={(v) => updateEmergency("homePhone", v)}
              type="tel"
              inputMode="tel"
              autoComplete="section-emergency tel-local"
            />
          </Field>
        </div>
        <Field label="Email">
          <Input
            value={data.emergencyContact.email}
            onChange={(v) => updateEmergency("email", v)}
            type="email"
            autoComplete="section-emergency email"
          />
        </Field>
      </div>

      <StepNav
        onBack={() => {}}
        onNext={onNext}
        isFirst
        isLast={false}
        disabled={!canContinue}
      />
    </div>
  );
}
