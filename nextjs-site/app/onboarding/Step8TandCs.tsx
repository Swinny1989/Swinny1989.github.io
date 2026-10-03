"use client";

import { FormData } from "./types";
import { ConsentRow, StepNav } from "./FormComponents";

const TC_SECTIONS = [
  {
    title: "1. Health, Vaccinations and Veterinary Care",
    clauses: [
      "1.1. A copy of your dog's current vaccination record must be provided before a booking can be confirmed. All dogs attending Katie's K9s for boarding or daycare must be appropriately vaccinated and up to date with all required vaccinations and boosters, including protection against Distemper, Leptospirosis, Adenovirus/Hepatitis and Parvovirus.",
      "1.2. Owners are responsible for ensuring that their dog is appropriately treated for fleas, ticks and worms at the recommended intervals. Vaccination against Kennel Cough is strongly advised.",
      "1.3. Katie's K9s reserves the right to refuse admission to any dog that appears unwell, infectious, or otherwise unsuitable for boarding or daycare at the time of arrival.",
      "1.4. Female dogs will not be accepted for boarding if they are in season, pregnant, or have been in season within the previous 28 days to the start of their stay.",
      "1.5. If a female dog comes into season while in our care, the owner or emergency contact must arrange collection immediately. The agreed booking fee will remain payable in full.",
      "1.6. Entire male dogs are accepted at Katie's K9s at our discretion. We reserve the right to refuse or decline a booking where we consider this necessary for the safety or wellbeing of the dog, other dogs or people in our care.",
      "1.7. Owners must provide accurate and complete information regarding their dog's health, medical history, behaviour, temperament and any existing conditions or special requirements.",
      "1.8. If your dog becomes ill or requires veterinary treatment while in our care, you authorise Katie's K9s to obtain appropriate veterinary advice and treatment where reasonably necessary. All veterinary costs incurred on behalf of your dog will be the responsibility of the owner.",
      "1.9. In an emergency, Katie's K9s reserves the right to contact a veterinary surgeon and act in what we reasonably believe to be the best interests of the dog.",
      "1.10. Katie's K9s shall not be held liable for any illness, injury, loss, death, damage, or associated costs arising either inside or outside of the home whilst in our care. Boarding and Daycare is entirely at the owner's risk.",
      "1.11. While all reasonable care will be taken, Katie's K9s cannot be held liable for new health issues or deterioration of existing health conditions.",
      "1.12. You agree to deliver your dog in a clean, groomed condition.",
    ],
  },
  {
    title: "2. Insurance",
    clauses: [
      "2.1. Katie's K9s maintains appropriate Public Liability Insurance and licences required by the relevant Local Authority.",
      "2.2. Owners are strongly advised to maintain their own suitable pet insurance, including cover for veterinary treatment, illness and injury.",
      "2.3. The owner remains responsible for veterinary expenses and other reasonable costs incurred in connection with their dog, whether or not covered by the owner's insurance.",
      "2.4. The owner is responsible for any reasonable costs, claims or expenses arising from their dog's actions or behaviour.",
    ],
  },
  {
    title: "3. Daycare Bookings",
    clauses: [
      "3.1. Katie's K9s operates an ad-hoc daycare booking system. Availability is not guaranteed.",
      "3.2. Daycare bookings may be made no more than two months in advance unless otherwise agreed.",
      "3.3. Daycare fees must be paid in full on or before the date of the booked session.",
      "3.4. If a daycare booking is cancelled less than 48 hours before the scheduled session, the full daycare fee remains payable.",
      "3.5. If a customer does not attend without prior notice, the full booking fee remains payable.",
    ],
  },
  {
    title: "4. Boarding and Wedding Chaperone Bookings",
    clauses: [
      "4.1. A non-refundable deposit of 25% of the total booking cost is required at the time of booking.",
      "4.2. The remaining 75% balance must be paid in full 1 week prior to the dog(s)' arrival, unless an alternative arrangement has been agreed in writing.",
      "4.3. Payment may be made by cash or BACS bank transfer.",
      "4.4. If a booking is cancelled more than 30 days before the scheduled arrival date, the 25% deposit will be retained and no further charge will normally apply.",
      "4.5. If a booking is cancelled within 30 days of the scheduled arrival date, 50% of the total booking cost will be payable.",
      "4.6. If a booking is cancelled within 14 days of the scheduled arrival date, 100% of the total booking cost will be payable.",
      "4.7. Any amount already paid will be deducted from the applicable cancellation charge.",
      "4.8. No-show bookings will incur the full cost of the booked service with no refund, credit or transfer.",
    ],
  },
  {
    title: "5. General Booking Conditions",
    clauses: [
      "5.1. All fees must be paid in accordance with the payment terms set out in these Terms and Conditions.",
      "5.2. If the owner collects their dog before the agreed end date, the original booking fee remains payable.",
      "5.3. The owner must provide accurate and up to date contact details and nominate an emergency contact who is authorised and able to collect their dog during their stay.",
      "5.4. The owner must inform Katie's K9s of any behavioural or other characteristics that may affect the suitability of their dog for our services.",
      "5.5. Failure to disclose relevant information may result in the booking being refused or terminated.",
      "5.6. If a dog becomes disruptive, aggressive or dangerous, we reserve the right to arrange alternative accommodation or care at the owner's expense.",
    ],
  },
  {
    title: "6. Dog Safety and Owner Responsibilities",
    clauses: [
      "6.1. The owner is responsible for any injury, loss or damage caused by their dog to any person, animal or property.",
      "6.2. Dogs may interact with other dogs. While reasonable precautions will be taken, interaction between dogs carries inherent risks.",
      "6.3. The owner is responsible for the cost of repairing or replacing property damaged by their dog.",
      "6.4. Owners must provide all food, grooming equipment, collars, leads and medication required during their stay. All food must be in an airtight resealable container or pre-portioned and labelled per meal.",
      "6.5. Owners must ensure their dog is microchipped and wears an appropriate identification tag.",
    ],
  },
  {
    title: "7. Dangerous Dogs and Suitability",
    clauses: [
      "7.1. Katie's K9s does not accept dogs prohibited under the Dangerous Dogs Act 1991 or any subsequent legislation.",
      "7.2. Owners must provide accurate and truthful information about their dog's breed, type, history and behaviour.",
      "7.3. Katie's K9s reserves the right to refuse or cancel a booking where we reasonably believe a dog may be prohibited by law, presents an unacceptable risk, or is otherwise unsuitable.",
    ],
  },
  {
    title: "8. Walking and Weather Conditions",
    clauses: [
      "8.1. Dogs will normally be exercised and walked in a range of weather conditions.",
      "8.2. Walks may be shortened, altered, postponed or cancelled where conditions are deemed unsafe.",
    ],
  },
  {
    title: "9. Photography and Marketing",
    clauses: [
      "9.1. Unless the owner opts out, the owner consents to photographs and/or videos of their dog being taken and used by Katie's K9s for marketing and promotional purposes.",
      "9.2. The owner may withdraw this consent at any time by notifying Katie's K9s in writing.",
    ],
  },
  {
    title: "10. Our Commitments",
    clauses: [
      "10.1. Katie's K9s will provide services with reasonable care, skill and professionalism.",
      "10.2. We will follow the reasonable care instructions provided by the owner, subject to the welfare and safety of the dog, other animals and people.",
      "10.3. Katie's K9s reserves the right to refuse, cancel or terminate a booking where we reasonably consider a dog unsuitable.",
    ],
  },
  {
    title: "11. Circumstances Beyond Our Reasonable Control",
    clauses: [
      "11.1. Katie's K9s will not be responsible for failure or delay in providing services where this is caused by circumstances beyond our reasonable control.",
      "11.2. Where such circumstances arise, we will take reasonable steps to minimise disruption.",
    ],
  },
  {
    title: "12. Collection and Abandoned Dogs",
    clauses: [
      "12.1. Dogs must be collected at the agreed time at the end of their booking.",
      "12.2. If a dog is not collected at the agreed time, a late collection charge of £20 per hour will apply.",
      "12.3. If the owner fails to collect their dog and cannot be contacted, Katie's K9s may arrange suitable alternative accommodation for the dog.",
      "12.4. The owner will remain responsible for reasonable costs incurred.",
    ],
  },
  {
    title: "13. Additional Care Charges",
    clauses: [
      "13.1. Additional charges may apply where a dog requires a greater level of care than is included within the standard service.",
      "13.2. Any applicable additional charges will be communicated to the owner wherever reasonably practicable before the service is provided.",
    ],
  },
  {
    title: "14. Liability",
    clauses: [
      "14.1. Owners acknowledge that caring for and handling dogs involves inherent risks, including illness, injury, escape, and interaction with other animals.",
      "14.2. Nothing in these Terms and Conditions affects the owner's statutory rights.",
      "14.3. The owner agrees to reimburse Katie's K9s for reasonable losses arising from their dog's behaviour where the owner is legally responsible.",
    ],
  },
  {
    title: "15. Data Protection and Privacy",
    clauses: [
      "15.1. Katie's K9s collects and processes personal information for the purposes of providing and administering our services, including managing bookings, ensuring the health and safety of dogs in our care, communicating with owners, and processing payments.",
      "15.2. Where necessary and lawful, we may share relevant information with veterinary professionals, insurance providers, and legal or regulatory authorities.",
      "15.3. Personal information will be stored securely and retained only for as long as reasonably necessary.",
      "15.4. Personal data will be processed in accordance with applicable UK data protection law.",
    ],
  },
  {
    title: "16. Acceptance of Terms",
    clauses: [
      "16.1. By making a booking or using the services provided by Katie's K9s, the owner confirms that they have read, understood and agree to these Terms and Conditions.",
      "16.2. The owner confirms that all information provided about their dog is accurate and complete and agrees to notify Katie's K9s of any relevant changes.",
    ],
  },
];

export default function Step8TandCs({
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
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-serif text-xl text-[#3D5A3E] mb-1">
          Terms &amp; Conditions
        </h2>
        <p className="text-sm text-[#6B6560]">
          Please read carefully and scroll to the bottom before agreeing.
        </p>
      </div>

      {/* Scrollable T&C panel */}
      <div className="bg-white rounded-xl border border-stone-200 h-80 overflow-y-auto p-5 text-sm text-[#6B6560] leading-relaxed space-y-5">
        {TC_SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-[#3D5A3E] mb-2">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.clauses.map((clause, i) => (
                <li key={i}>{clause}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="pt-2 border-t border-stone-100">
          <h3 className="font-semibold text-[#3D5A3E] mb-2">Declaration</h3>
          <p>
            You agree to provide full, honest and detailed information in this
            contract about your dog and agree to our terms and conditions.
            During your continued use of Katie&apos;s K9s services you agree to keep
            us informed of any changes to your and/or your dog&apos;s information.
          </p>
          <p className="mt-2">
            Failure on your part to disclose any matter, whether material fact
            or not, which in our view might render your dog unsuitable for our
            care, will amount to breach of conditions and termination of your
            dog&apos;s booking without refund.
          </p>
          <p className="mt-2">
            Should we waive any of these terms on an individual basis or they
            are found to be unenforceable, this shall not affect the validity
            of remaining clauses. By agreeing to these terms your statutory
            rights are not affected.
          </p>
        </div>
      </div>

      <ConsentRow
        checked={data.tcAgreed}
        onChange={(v) => onUpdate({ tcAgreed: v })}
      >
        I have read and understood the Terms &amp; Conditions and agree to be
        bound by them.
      </ConsentRow>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        isFirst={false}
        isLast={false}
        disabled={!data.tcAgreed}
      />
    </div>
  );
}
