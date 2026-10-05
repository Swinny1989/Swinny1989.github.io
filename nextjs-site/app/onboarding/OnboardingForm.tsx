"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FormData as RegistrationData,
  INITIAL_FORM_DATA,
  STORAGE_KEY,
  STEP_KEY,
  TOTAL_STEPS,
} from "./types";
import { ProgressBar } from "./FormComponents";
import Step1OwnerDetails from "./Step1OwnerDetails";
import Step2DogDetails from "./Step2DogDetails";
import Step3HealthVets from "./Step3HealthVets";
import Step4Feeding from "./Step4Feeding";
import Step5Behaviour from "./Step5Behaviour";
import Step6CrateGrooming from "./Step6CrateGrooming";
import Step7Consents from "./Step7Consents";
import Step8TandCs from "./Step8TandCs";
import Step9Signature from "./Step9Signature";

const STEP_LABELS = [
  "Your Details",
  "Your Dog",
  "Health & Vets",
  "Feeding",
  "Behaviour",
  "Crate & Grooming",
  "Consents",
  "Terms & Conditions",
  "Sign & Submit",
];

// Flatten RegistrationData into a flat key-value object for FormSubmit hidden fields
function flattenForSubmit(data: RegistrationData): Record<string, string> {
  const today = new Date().toISOString();
  const yn = (v: boolean) => (v ? "Yes" : "No");
  const d = data;

  return {
    // Owner 1
    "Owner 1 First Name": d.owner1.firstName,
    "Owner 1 Surname": d.owner1.surname,
    "Owner 1 Address": [d.owner1.addressLine1, d.owner1.addressLine2, d.owner1.town, d.owner1.postcode].filter(Boolean).join(", "),
    "Owner 1 Mobile": d.owner1.mobile,
    "Owner 1 Home Phone": d.owner1.homePhone,
    "Owner 1 Email": d.owner1.email,

    // Owner 2
    "Owner 2 (present)": yn(d.hasOwner2),
    ...(d.hasOwner2 ? {
      "Owner 2 First Name": d.owner2.firstName,
      "Owner 2 Surname": d.owner2.surname,
      "Owner 2 Address": [d.owner2.addressLine1, d.owner2.addressLine2, d.owner2.town, d.owner2.postcode].filter(Boolean).join(", "),
      "Owner 2 Mobile": d.owner2.mobile,
      "Owner 2 Home Phone": d.owner2.homePhone,
      "Owner 2 Email": d.owner2.email,
    } : {}),

    // Emergency contact
    "Emergency Contact First Name": d.emergencyContact.firstName,
    "Emergency Contact Surname": d.emergencyContact.surname,
    "Emergency Contact Mobile": d.emergencyContact.mobile,
    "Emergency Contact Home Phone": d.emergencyContact.homePhone,
    "Emergency Contact Email": d.emergencyContact.email,

    // Dog
    "Dog Name": d.dog.name,
    "Dog DOB": d.dog.dob,
    "Dog Breed": d.dog.breed,
    "Dog Sex": d.dog.sex,
    "Dog Weight (kg)": d.dog.weightKg,
    "Dog Neutered": d.dog.neutered,
    "Dog Microchip Number": d.dog.microchipNumber,

    // Health
    "Last Vaccination Date": d.health.lastVaccinationDate,
    "Vaccination Details": d.health.vaccinationDetails,
    "Last Kennel Cough Date": d.health.lastKennelCoughDate,
    "Last Flea Treatment Date": d.health.lastFleaTreatmentDate,
    "Next Flea Treatment Due": d.health.nextFleaTreatmentDate,
    "Last Worming Date": d.health.lastWormingDate,
    "Next Worming Due": d.health.nextWormingDate,
    "Medical Conditions": d.health.medicalConditions,
    "Medications": d.health.medications,
    "Allergies": d.health.allergies,
    "Digestive Disruptions": d.health.digestiveDisruptions,
    ...(d.dog.sex === "Female" && d.dog.neutered === "No" ? {
      "Last Season Date": d.health.lastSeasonDate,
      "Expected Next Season": d.health.nextSeasonDate,
    } : {}),

    // Vet
    "Vet Name": d.vet.vetName,
    "Vet Address": [d.vet.vetAddressLine1, d.vet.vetAddressLine2, d.vet.vetTown, d.vet.vetPostcode].filter(Boolean).join(", "),
    "Vet Phone": d.vet.vetPhone,
    "Vet Out of Hours Phone": d.vet.vetOutOfHoursPhone,

    // Insurance
    "Insurance Provider": d.insurance.insuranceProvider,
    "Insurance Policy Number": d.insurance.policyNumber,
    "Insurance Phone": d.insurance.insurancePhone,

    // Feeding
    "Food Type": d.feeding.foodType,
    "Food Brand": d.feeding.foodBrand,
    "Quantity per Meal (g)": d.feeding.quantityGrams,
    "Meals per Day": d.feeding.mealsPerDay,
    "Meal Times": d.feeding.mealTimes,
    "Food Preparation Details": d.feeding.preparationDetails,
    "Treats Allowed": d.feeding.treatsAllowed,
    "Eating Style": d.feeding.eatingStyle,
    "Food Orientated": d.feeding.foodOriented,
    "Other Feeding Instructions": d.feeding.otherFeedingInstructions,

    // Behaviour
    "Commands": d.behaviour.commands,
    "Toys and Games": d.behaviour.toysAndGames,
    "Daily Exercise": d.behaviour.dailyExercise,
    "Sleeps Where": d.behaviour.sleepsWhere,
    "Boarded Before": d.behaviour.boardedBefore,
    "Likes Cuddles": d.behaviour.likesCuddles,
    "Steals Food": d.behaviour.stealsFood,
    "Possessive with Food": d.behaviour.possessiveFood,
    "Possessive with Toys": d.behaviour.possessiveToys,
    "Jumps Up": d.behaviour.jumpsUp,
    "Toilets Indoors": d.behaviour.toiletsIndoors,
    "Happy Alone": d.behaviour.happyAlone,
    "Barks at Others": d.behaviour.barksAtOthers,
    "Recall Off Lead": d.behaviour.recallOffLead,
    "Happy in Car": d.behaviour.happyInCar,
    "Happy Near Water": d.behaviour.happyNearWater,
    "Nervous/Anxious": d.behaviour.nervousAnxious,
    "Nervous Details": d.behaviour.nervousDetails,
    "Loud Noises": d.behaviour.loudNoises,
    "Loud Noises Details": d.behaviour.loudNoisesDetails,
    "Destructive Behaviour": d.behaviour.destructive,
    "Destructive Details": d.behaviour.destructiveDetails,
    "Escapist Behaviour": d.behaviour.escapist,
    "Escapist Details": d.behaviour.escapistDetails,
    "Aggressive with Other Dogs": d.behaviour.aggressiveOtherDogs,
    "Aggressive with Other Dogs Details": d.behaviour.aggressiveOtherDogsDetails,
    "Aggressive with People": d.behaviour.aggressivePeople,
    "Aggressive with People Details": d.behaviour.aggressivePeopleDetails,
    "Other Behaviour Info": d.behaviour.otherBehaviourInfo,

    // Crate & Grooming
    "Uses Crate at Home": d.crateGrooming.usesCrateAtHome,
    "When Uses Crate": d.crateGrooming.whenUsesCrate,
    "Consent to Crate": d.crateGrooming.consentToCrate,
    "Consent Crate Door Closed": d.crateGrooming.consentCrateDoorClosed,
    "Grooming Schedule": d.crateGrooming.groomingSchedule,

    // Consents
    "Consent - Vet Care": yn(d.consents.consentVetCare),
    "Consent - Mix with Dogs": yn(d.consents.consentMixWithDogs),
    "Consent - Treats": yn(d.consents.consentTreats),
    "Consent - Fed Elsewhere": yn(d.consents.consentFedElsewhere),
    "Consent - Off Lead": yn(d.consents.consentOffLead),
    "Consent - Transported in Car": yn(d.consents.consentTransportedInCar),
    "Consent - Walked with Other Dogs": yn(d.consents.consentWalkedWithOtherDogs),
    "Consent - Cognitive Enrichment": yn(d.consents.consentCognitiveEnrichment),
    "Consent - Sensory Enrichment": yn(d.consents.consentSensoryEnrichment),
    "Consent - Physical Enrichment": yn(d.consents.consentPhysicalEnrichment),
    "Consent - Social Enrichment": yn(d.consents.consentSocialEnrichment),
    "Consent - Environmental Enrichment": yn(d.consents.consentEnvironmentalEnrichment),
    "Consent - Secure Field Off Lead": yn(d.consents.consentSecureFieldOffLead),
    "Consent - Photos/Videos": yn(d.consents.consentPhotosVideos),
    "Consent - Kept Together Overnight": yn(d.consents.consentKeptTogetherOvernight),

    // T&Cs
    "Terms Agreed": yn(d.tcAgreed),

    // Signatures
    "Owner 1 Signed Name": d.signature.owner1SignedName,
    "Owner 1 Signature Date": today,
    ...(d.owner2.firstName.trim() || d.owner2.surname.trim() ? {
      "Owner 2 Signed Name": d.signature.owner2SignedName,
      "Owner 2 Signature Date": today,
    } : {}),
    "Vet Auth Owner 1 Signed Name": d.signature.vetAuthOwner1SignedName,
    "Vet Auth Owner 1 Date": today,
    ...(d.owner2.firstName.trim() || d.owner2.surname.trim() ? {
      "Vet Auth Owner 2 Signed Name": d.signature.vetAuthOwner2SignedName,
      "Vet Auth Owner 2 Date": today,
    } : {}),

    "Submission Timestamp": today,
  };
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>(INITIAL_FORM_DATA);
  const [hydrated, setHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STEP_KEY);
      if (saved) setFormData(JSON.parse(saved));
      if (savedStep) setStep(parseInt(savedStep, 10));
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every change
  const updateForm = useCallback(
    (patch: Partial<RegistrationData>) => {
      setFormData((prev) => {
        const next = { ...prev, ...patch };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore quota errors
        }
        return next;
      });
    },
    []
  );

  const goTo = useCallback((n: number) => {
    setStep(n);
    try {
      localStorage.setItem(STEP_KEY, String(n));
    } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const next = useCallback(() => goTo(Math.min(step + 1, TOTAL_STEPS)), [step, goTo]);
  const back = useCallback(() => goTo(Math.max(step - 1, 1)), [step, goTo]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const flat = flattenForSubmit(formData);
    const dogName = formData.dog.name || "dog";
    const ownerName = `${formData.owner1.firstName} ${formData.owner1.surname}`.trim();

    const payload: Record<string, string> = {
      _subject: `New Registration: ${dogName} — ${ownerName}`,
      _captcha: "false",
      _template: "table",
      ...flat,
    };

    try {
      const res = await fetch("https://formsubmit.co/ajax/tom@tom-swindell.co.uk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(STEP_KEY);
        } catch {}
        setSubmitted(true);
      } else {
        setSubmitError(
          "There was a problem submitting your form. Please try again or contact us directly."
        );
      }
    } catch {
      setSubmitError(
        "Unable to submit. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  if (!hydrated) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-[#3D5A3E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#3D5A3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <h2 className="font-serif text-3xl text-[#3D5A3E] mb-4">
          Registration Submitted
        </h2>
        <p className="text-[#6B6560] text-lg max-w-md mx-auto">
          Thank you for registering with Katie&apos;s K9s, we&apos;re delighted to welcome
          you and your dog to the Katie&apos;s K9s family.
        </p>
      </div>
    );
  }

  const stepProps = { data: formData, onUpdate: updateForm };

  return (
    <div>
      <ProgressBar
        current={step}
        total={TOTAL_STEPS}
        stepLabel={STEP_LABELS[step - 1]}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8">
        {submitError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {submitError}
          </div>
        )}

        {step === 1 && (
          <Step1OwnerDetails {...stepProps} onNext={next} />
        )}
        {step === 2 && (
          <Step2DogDetails {...stepProps} onBack={back} onNext={next} />
        )}
        {step === 3 && (
          <Step3HealthVets {...stepProps} onBack={back} onNext={next} />
        )}
        {step === 4 && (
          <Step4Feeding {...stepProps} onBack={back} onNext={next} />
        )}
        {step === 5 && (
          <Step5Behaviour {...stepProps} onBack={back} onNext={next} />
        )}
        {step === 6 && (
          <Step6CrateGrooming {...stepProps} onBack={back} onNext={next} />
        )}
        {step === 7 && (
          <Step7Consents {...stepProps} onBack={back} onNext={next} />
        )}
        {step === 8 && (
          <Step8TandCs {...stepProps} onBack={back} onNext={next} />
        )}
        {step === 9 && (
          <Step9Signature
            {...stepProps}
            onBack={back}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* Resume banner — shown if local storage data exists but user is back on step 1 */}
    </div>
  );
}
