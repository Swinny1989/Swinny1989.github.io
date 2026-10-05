"use client";

import { FormData, OwnerDetails, EmergencyContact } from "./types";
import {
  Field,
  Input,
  SectionHeading,
  InfoBanner,
  StepNav,
  AddressBlock,
} from "./FormComponents";

function OwnerBlock({
  title,
  data,
  onChange,
  autoPrefix,
  required,
}: {
  title: string;
  data: OwnerDetails;
  onChange: (field: keyof OwnerDetails, value: string) => void;
  autoPrefix: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>{title}</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" required={required}>
          <Input
            value={data.firstName}
            onChange={(v) => onChange("firstName", v)}
            autoComplete={`${autoPrefix}given-name`}
            required={required}
          />
        </Field>
        <Field label="Surname" required={required}>
          <Input
            value={data.surname}
            onChange={(v) => onChange("surname", v)}
            autoComplete={`${autoPrefix}family-name`}
            required={required}
          />
        </Field>
      </div>
      <Field label="Address" required={required}>
        <AddressBlock
          addressLine1={data.addressLine1}
          addressLine2={data.addressLine2}
          town={data.town}
          postcode={data.postcode}
          onChange={(field, value) =>
            onChange(field as keyof OwnerDetails, value)
          }
          autoCompletePrefix={autoPrefix}
          townRequired={required}
          postcodeRequired={required}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Mobile" required={required}>
          <Input
            value={data.mobile}
            onChange={(v) => onChange("mobile", v)}
            type="tel"
            autoComplete={`${autoPrefix}tel`}
            inputMode="tel"
            required={required}
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
      <Field label="Email" required={required}>
        <Input
          value={data.email}
          onChange={(v) => onChange("email", v)}
          type="email"
          autoComplete={`${autoPrefix}email`}
          required={required}
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
    data.owner1.town.trim() !== "" &&
    data.owner1.postcode.trim() !== "" &&
    data.owner1.mobile.trim() !== "" &&
    data.owner1.email.trim() !== "" &&
    data.emergencyContact.firstName.trim() !== "" &&
    data.emergencyContact.surname.trim() !== "" &&
    data.emergencyContact.mobile.trim() !== "";

  return (
    <div className="flex flex-col gap-2">
      {/* Intro blurb — page 1 only */}
      <InfoBanner>
        We kindly ask you to complete all information on the below form to allow
        us to make your dog/s as comfortable as possible during their time with
        Katie&apos;s K9s. Some information is mandatory to comply with our boarding
        licence; dogs are not legally able to stay unless this information is
        obtained.
      </InfoBanner>

      <OwnerBlock
        title="Your Details"
        data={data.owner1}
        onChange={updateOwner1}
        autoPrefix=""
        required
      />

      {/* Owner 2 — always shown, not mandatory */}
      <OwnerBlock
        title="Owner 2 Details (if applicable)"
        data={data.owner2}
        onChange={updateOwner2}
        autoPrefix="section-owner2 "
        required={false}
      />

      {/* Emergency contact */}
      <div className="flex flex-col gap-4 mt-4">
        <SectionHeading>Emergency Contact</SectionHeading>
        <p className="text-sm text-[#6B6560] -mt-2">
          This must be someone who is willing and able to collect your dog in
          the event of an emergency, and not someone you are travelling with.
          Please note that your emergency contact will only be contacted as a
          last resort.
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
