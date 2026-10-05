"use client";

import { FormData, ConsentsDetails } from "./types";
import {
  SectionHeading,
  ConsentRow,
  StepNav,
} from "./FormComponents";

export default function Step7Consents({
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
  const c = data.consents;
  const update = (field: keyof ConsentsDetails, value: boolean) =>
    onUpdate({ consents: { ...c, [field]: value } });

  const canContinue = c.consentVetCare && c.consentMixWithDogs;

  return (
    <div className="flex flex-col gap-4">
      <SectionHeading>Consents</SectionHeading>
      <p className="text-sm text-[#6B6560]">
        Please read each consent carefully and tick those you agree to.
      </p>

      <div className="flex flex-col gap-4">
        {/* Vet care — mandatory, no special box */}
        <div className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-4">
          <ConsentRow
            checked={c.consentVetCare}
            onChange={(v) => update("consentVetCare", v)}
          >
            <span>
              <strong>Veterinary care (required)</strong> — I agree that in the
              case of suspected injury or illness, a vet may be contacted, my
              dog examined, and investigations performed if required. I agree to
              the vet administering any prescribed treatment they consider
              advisable, at my own expense. I also give consent for euthanasia
              should this be recommended on humane grounds by the vet caring for
              my dog. Every effort will be made to contact me or emergency
              contacts to discuss an appropriate course of action.
            </span>
          </ConsentRow>

          <ConsentRow
            checked={c.consentMixWithDogs}
            onChange={(v) => update("consentMixWithDogs", v)}
          >
            <span>
              <strong>Mixing with other dogs (required)</strong> — I consent to
              my dog mixing with dogs from other households whilst under the
              care of Katie&apos;s K9s, in and outside of the home, including the
              garden.
            </span>
          </ConsentRow>
        </div>

        <div className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-4">
          <ConsentRow
            checked={c.consentTreats}
            onChange={(v) => update("consentTreats", v)}
          >
            I consent to my dog being fed treats provided by Katie&apos;s K9s.
          </ConsentRow>

          <ConsentRow
            checked={c.consentFedElsewhere}
            onChange={(v) => update("consentFedElsewhere", v)}
          >
            I consent to my dog being fed in another area outside of their
            designated room (this may be done to ensure dogs are separated from
            other dogs and/or children whilst eating).
          </ConsentRow>

          <ConsentRow
            checked={c.consentOffLead}
            onChange={(v) => update("consentOffLead", v)}
          >
            I consent to my dog being off lead outside of the home environment.{" "}
            <em>
              This consent should only be given if your dog has excellent recall
              training. Off lead walks pose additional risks and consent is not
              mandatory.
            </em>
          </ConsentRow>

          <ConsentRow
            checked={c.consentTransportedInCar}
            onChange={(v) => update("consentTransportedInCar", v)}
          >
            I consent to my dog being transported in the car whilst under the
            care of Katie&apos;s K9s.
          </ConsentRow>

          <ConsentRow
            checked={c.consentWalkedWithOtherDogs}
            onChange={(v) => update("consentWalkedWithOtherDogs", v)}
          >
            I consent to my dog being walked outside of the home environment or
            garden with other dogs in the care of Katie&apos;s K9s.
          </ConsentRow>
        </div>

        <div className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-3">
          <p className="text-sm font-medium text-[#3D5A3E]">
            Supervised enrichment activities (tick all you are happy for your
            dog to participate in)
          </p>
          <ConsentRow
            checked={c.consentCognitiveEnrichment}
            onChange={(v) => update("consentCognitiveEnrichment", v)}
          >
            <strong>Cognitive enrichment</strong> — puzzle feeders,
            treat-dispensing toys, scent games, basic training exercises,
            problem-solving activities.
          </ConsentRow>
          <ConsentRow
            checked={c.consentSensoryEnrichment}
            onChange={(v) => update("consentSensoryEnrichment", v)}
          >
            <strong>Sensory enrichment</strong> — scent trails, scatter
            feeding, hide and seek scent games, filled Kongs.
          </ConsentRow>
          <ConsentRow
            checked={c.consentPhysicalEnrichment}
            onChange={(v) => update("consentPhysicalEnrichment", v)}
          >
            <strong>Physical enrichment</strong> — agility-style obstacles,
            ball games, tug games, paddling pools, secure field visits.
          </ConsentRow>
          <ConsentRow
            checked={c.consentSocialEnrichment}
            onChange={(v) => update("consentSocialEnrichment", v)}
          >
            <strong>Social enrichment</strong> — supervised group play,
            appropriate interaction with other dogs, human interaction and
            bonding time.
          </ConsentRow>
          <ConsentRow
            checked={c.consentEnvironmentalEnrichment}
            onChange={(v) => update("consentEnvironmentalEnrichment", v)}
          >
            <strong>Environmental enrichment</strong> — safe exploration of
            new areas, enrichment setups within the home or garden environment.
          </ConsentRow>
        </div>

        <div className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col gap-4">
          <ConsentRow
            checked={c.consentSecureFieldOffLead}
            onChange={(v) => update("consentSecureFieldOffLead", v)}
          >
            I consent to my dog being exercised off lead in a secure field or
            enclosed dog park and interacting with other dogs in the care of
            Katie&apos;s K9s.
          </ConsentRow>

          <ConsentRow
            checked={c.consentPhotosVideos}
            onChange={(v) => update("consentPhotosVideos", v)}
          >
            I consent for photographs and videos of my dog/s to be used for
            social media and marketing purposes for Katie&apos;s K9s.
          </ConsentRow>

          <ConsentRow
            checked={c.consentKeptTogetherOvernight}
            onChange={(v) => update("consentKeptTogetherOvernight", v)}
          >
            I consent for my dogs to be kept together overnight in their
            designated room. (Applicable when boarding more than one dog
            overnight from the same household.)
          </ConsentRow>
        </div>
      </div>

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
