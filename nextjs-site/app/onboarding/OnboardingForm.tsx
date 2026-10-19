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
import { generateVetAuthPdf, buildPdfFileName } from "./generateVetAuthPdf";
import Step1OwnerDetails from "./Step1OwnerDetails";
import Step2DogDetails from "./Step2DogDetails";
import Step3HealthVets from "./Step3HealthVets";
import Step4Feeding from "./Step4Feeding";
import Step5Behaviour from "./Step5Behaviour";
import Step6CrateGrooming from "./Step6CrateGrooming";
import Step7Consents from "./Step7Consents";
import Step8Agreements from "./Step8Agreements";

const STEP_LABELS = [
  "Your Details",
  "Your Dog",
  "Health & Vets",
  "Feeding",
  "Behaviour",
  "Crate & Grooming",
  "Consents",
  "Agreements & Sign-off",
];

// Flatten RegistrationData into a flat key-value object for FormSubmit hidden fields
function flattenForSubmit(data: RegistrationData): Record<string, string> {
  const today = new Date().toISOString();
  const yn = (v: boolean) => (v ? "Yes" : "No");
  const d = data;
  const hasOwner2 =
    d.owner2.firstName.trim() !== "" || d.owner2.surname.trim() !== "";

  return {
    // Owner 1
    "Owner 1 First Name": d.owner1.firstName,
    "Owner 1 Surname": d.owner1.surname,
    "Owner 1 Address": [d.owner1.addressLine1, d.owner1.addressLine2, d.owner1.town, d.owner1.postcode].filter(Boolean).join(", "),
    "Owner 1 Mobile": d.owner1.mobile,
    "Owner 1 Home Phone": d.owner1.homePhone,
    "Owner 1 Email": d.owner1.email,

    // Owner 2 — present if either name field has been filled in
    "Owner 2 (present)": yn(hasOwner2),
    ...(hasOwner2 ? {
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

    // Agreements
    "Veterinary Authorisation Agreed": yn(d.vetAuthAgreed),
    "Terms Agreed": yn(d.tcAgreed),
    "Privacy Policy Agreed": yn(d.privacyAgreed),

    // Sign-off — only Owner 1 signs
    "Owner 1 Signed Name": d.signature.owner1SignedName,
    "Owner 1 Signature Date": today,

    "Submission Timestamp": today,
  };
}

// Cloudflare Worker endpoint that stores the vet-auth PDF in R2.
// Set NEXT_PUBLIC_PDF_WORKER_URL in the environment / GitHub Actions build.
const PDF_WORKER_URL = process.env.NEXT_PUBLIC_PDF_WORKER_URL ?? "";

// Logs the submission to the Excel sheet by POSTing the flat JSON record to the
// Cloudflare worker, which forwards it server-side to the Make.com webhook. This
// keeps the webhook URL out of the client bundle. Non-blocking: never throws.
async function sendToSheet(payload: Record<string, string>): Promise<boolean> {
  if (!PDF_WORKER_URL) return false;
  try {
    const res = await fetch(PDF_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Uploads the PDF to the worker. Non-blocking: resolves to true/false,
// never throws, so a failure here cannot stop the overall submission.
async function uploadVetAuthPdf(
  pdf: Blob,
  fileName: string,
  meta: { ownerFirstName: string; ownerSurname: string; dog: string },
): Promise<boolean> {
  if (!PDF_WORKER_URL) return false;
  try {
    const body = new FormData();
    body.append("file", pdf, fileName);
    body.append("ownerFirstName", meta.ownerFirstName);
    body.append("ownerSurname", meta.ownerSurname);
    body.append("dog", meta.dog);
    const res = await fetch(PDF_WORKER_URL, { method: "POST", body });
    return res.ok;
  } catch {
    return false;
  }
}

// ── DEV ONLY: demo data for quickly populating the whole form ──────────────────
// Referenced only inside dev-gated code, so it is tree-shaken from production.
const DEV_DEMO_DATA: Partial<RegistrationData> = {
  owner1: {
    firstName: "Dev", surname: "Tester",
    addressLine1: "1 Test Street", addressLine2: "",
    town: "Congleton", postcode: "CW12 1AB",
    mobile: "07700 900000", homePhone: "", email: "dev@example.com",
  },
  hasOwner2: false,
  owner2: {
    firstName: "", surname: "", addressLine1: "", addressLine2: "",
    town: "", postcode: "", mobile: "", homePhone: "", email: "",
  },
  emergencyContact: {
    firstName: "Emergency", surname: "Contact",
    mobile: "07700 900111", homePhone: "", email: "ec@example.com",
  },
  dog: {
    name: "Rex", dob: "2021-01-01", breed: "Labrador",
    sex: "Male", weightKg: "25", neutered: "Yes",
    microchipNumber: "985100000000000",
  },
  health: {
    lastVaccinationDate: "2024-06-01", vaccinationDetails: "DHP, Lepto",
    lastKennelCoughDate: "2024-06-01",
    lastFleaTreatmentDate: "2024-09-01", nextFleaTreatmentDate: "2024-12-01",
    lastWormingDate: "2024-09-01", nextWormingDate: "2024-12-01",
    medicalConditions: "None", medications: "None", allergies: "None",
    digestiveDisruptions: "None", lastSeasonDate: "", nextSeasonDate: "",
  },
  vet: {
    vetName: "Test Vets", vetAddressLine1: "2 Vet Road", vetAddressLine2: "",
    vetTown: "Congleton", vetPostcode: "CW12 2CD",
    vetPhone: "01260 000000", vetOutOfHoursPhone: "01260 111111",
  },
  insurance: { insuranceProvider: "Petplan", policyNumber: "PP123", insurancePhone: "0330 000 0000" },
  feeding: {
    foodType: "Dry", foodBrand: "Royal Canin", quantityGrams: "250",
    mealsPerDay: "2", mealTimes: "8am and 6pm", preparationDetails: "None",
    treatsAllowed: "Yes", eatingStyle: "Eats immediately",
    foodOriented: "Very food motivated", otherFeedingInstructions: "None",
  },
  behaviour: {
    commands: "Sit, Stay, Come", toysAndGames: "Fetch", dailyExercise: "2 walks a day",
    sleepsWhere: "Dog bed", otherBehaviourInfo: "Friendly",
    boardedBefore: "Yes", likesCuddles: "Yes", stealsFood: "No",
    possessiveFood: "No", possessiveToys: "No", jumpsUp: "No",
    toiletsIndoors: "No", happyAlone: "Yes", barksAtOthers: "No",
    recallOffLead: "Yes", happyInCar: "Yes", happyNearWater: "Yes",
    nervousAnxious: "No", nervousDetails: "",
    loudNoises: "No", loudNoisesDetails: "",
    destructive: "No", destructiveDetails: "",
    escapist: "No", escapistDetails: "",
    aggressiveOtherDogs: "No", aggressiveOtherDogsDetails: "",
    aggressivePeople: "No", aggressivePeopleDetails: "",
  },
  crateGrooming: {
    usesCrateAtHome: "Yes", whenUsesCrate: "Overnight",
    consentToCrate: "Yes", consentCrateDoorClosed: "Yes",
    groomingSchedule: "Weekly brush",
  },
  consents: {
    consentVetCare: true, consentMixWithDogs: true, consentTreats: true,
    consentFedElsewhere: true, consentOffLead: true, consentTransportedInCar: true,
    consentWalkedWithOtherDogs: true, consentCognitiveEnrichment: true,
    consentSensoryEnrichment: true, consentPhysicalEnrichment: true,
    consentSocialEnrichment: true, consentEnvironmentalEnrichment: true,
    consentSecureFieldOffLead: true, consentPhotosVideos: true,
    consentKeptTogetherOvernight: false,
  },
  vetAuthAgreed: true,
  tcAgreed: true,
  privacyAgreed: true,
  signature: {
    owner1SignedName: "Dev Tester",
    owner1SignedDate: "",
  },
};

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
  }, []);

  // Scroll to top after the new step has rendered. Doing this inside goTo (before
  // render) animated against the old, taller page and left the user part-way down.
  useEffect(() => {
    if (!hydrated) return; // don't fight the restore-from-localStorage on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, hydrated]);

  const next = useCallback(() => goTo(Math.min(step + 1, TOTAL_STEPS)), [step, goTo]);
  const back = useCallback(() => goTo(Math.max(step - 1, 1)), [step, goTo]);

  // ── DEV ONLY ────────────────────────────────────────────────────────────────
  // This block is stripped from the production build (NODE_ENV === "production").
  const isDev = process.env.NODE_ENV !== "production";
  const devFillAll = useCallback(() => {
    updateForm(DEV_DEMO_DATA);
  }, [updateForm]);
  const devSkip = useCallback(() => {
    goTo(Math.min(step + 1, TOTAL_STEPS));
  }, [goTo, step]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const flat = flattenForSubmit(formData);
    const dogName = formData.dog.name || "dog";
    const ownerName = `${formData.owner1.firstName} ${formData.owner1.surname}`.trim();

    // ── 1. Generate the vet-auth PDF and upload it to the worker (non-blocking) ──
    // A failure here must never prevent the FormSubmit email, which is the
    // source of truth. We record the outcome and surface it in the email.
    let pdfStored = false;
    try {
      const pdf = await generateVetAuthPdf(formData);
      const fileName = buildPdfFileName(formData);
      pdfStored = await uploadVetAuthPdf(pdf, fileName, {
        ownerFirstName: formData.owner1.firstName,
        ownerSurname: formData.owner1.surname,
        dog: dogName,
      });
      if (!pdfStored) {
        console.warn("Vet-auth PDF was not stored (worker unset or returned an error).");
      }
    } catch (err) {
      console.warn("Vet-auth PDF generation failed:", err);
    }

    // ── 2. Send the flat JSON to Make (logs to Excel). Non-blocking. ─────────────
    const record: Record<string, string> = {
      ...flat,
      "PDF stored": pdfStored ? "Yes" : "No",
    };
    const loggedToSheet = await sendToSheet(record);
    if (!loggedToSheet) {
      console.warn("Submission was not logged to the sheet (worker unset or returned an error).");
    }

    // ── 3. Send the FormSubmit email (source of truth) ──────────────────────────
    const payload: Record<string, string> = {
      _subject: `New Registration: ${dogName} — ${ownerName}`,
      _captcha: "false",
      _template: "table",
      ...record,
      "Logged to sheet": loggedToSheet ? "Yes" : "No",
    };

    try {
      const res = await fetch("https://formsubmit.co/ajax/katies-k9s@hotmail.com", {
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
      {/* DEV ONLY — stripped from production build */}
      {isDev && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wide text-amber-700">
            Dev tools
          </span>
          <button
            type="button"
            onClick={devFillAll}
            className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-600"
          >
            Fill demo data
          </button>
          <button
            type="button"
            onClick={devSkip}
            className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-600"
          >
            Skip step →
          </button>
          <span className="text-xs text-amber-700">
            (bypasses validation — never shown in production)
          </span>
        </div>
      )}

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
          <Step8Agreements
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
