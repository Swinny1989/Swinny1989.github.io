"use client";

import { FormData } from "./types";
import { ConsentRow, StepNav } from "./FormComponents";

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

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">1. Health, Vaccinations and Veterinary Care</h3>
          <ul className="space-y-2">
            <li>1.1. A copy of your dog&apos;s current vaccination record must be provided before a booking can be confirmed. All dogs attending Katie&apos;s K9s for boarding or daycare must be appropriately vaccinated and up to date with all required vaccinations and boosters, including protection against Distemper, Leptospirosis, Adenovirus/Hepatitis and Parvovirus. Proof of vaccination must be provided on request and must confirm that the required annual vaccinations or boosters have been administered within the 12 months preceding the end date of your dog&apos;s stay.</li>
            <li>1.2. Owners are responsible for ensuring that their dog is appropriately treated for fleas, ticks and worms at the recommended intervals. Details of any treatments given may be requested prior to the dog&apos;s stay. Vaccination against Kennel Cough is strongly advised.</li>
            <li>1.3. Katie&apos;s K9s reserves the right to refuse admission to any dog that appears unwell, infectious, or otherwise unsuitable for boarding or daycare at the time of arrival. Where appropriate, veterinary advice may be sought.</li>
            <li>1.4. Female dogs will not be accepted for boarding if they are in season, pregnant, or have been in season within the previous 28 days to the start of their stay. Katie&apos;s K9s cannot accept responsibility for a pregnancy that occurs while a dog is in our care.</li>
            <li>1.5. If a female dog comes into season while in our care, the owner or emergency contact must arrange collection immediately. The agreed booking fee will remain payable in full.</li>
            <li>1.6. Entire male dogs are accepted at Katie&apos;s K9s at our discretion. We reserve the right to refuse or decline a booking for an entire male dog where we consider this necessary for the safety or wellbeing of the dog, other dogs or people in our care.</li>
            <li>1.7. Owners must provide accurate and complete information regarding their dog&apos;s health, medical history, behaviour, temperament and any existing conditions or special requirements. Katie&apos;s K9s cannot accept responsibility for issues arising from information that has not been disclosed.</li>
            <li>1.8. If your dog becomes ill or requires veterinary treatment while in our care, you authorise Katie&apos;s K9s to obtain appropriate veterinary advice and treatment where reasonably necessary. All veterinary medication, treatment and associated costs incurred on behalf of your dog will be the responsibility of the owner.</li>
            <li>1.9. In an emergency, or where a dog displays signs of serious illness or injury, Katie&apos;s K9s reserves the right to contact a veterinary surgeon and act in what we reasonably believe to be the best interests of the dog. We will make reasonable attempts to contact the owner and/or nominated emergency contact as soon as practical.</li>
            <li>1.10. Katie&apos;s K9s will care for your dog as you would, and whilst we will make every effort to ensure your dog is cared for to our high standards, Katie&apos;s K9s shall not be held liable for any illness, injury, loss, death, damage, or associated veterinary or related costs arising either inside or outside of the home whilst in our care. Boarding and Daycare is entirely at the owner&apos;s risk.</li>
            <li>1.11. While all reasonable care will be taken, Katie&apos;s K9s cannot be held liable for new health issues or deterioration of existing health conditions.</li>
            <li>1.12. You agree to deliver your dog in a clean, groomed condition. Any dog requiring regular grooming should also be provided with appropriate grooming equipment and instructions on their grooming routine.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">2. Insurance</h3>
          <ul className="space-y-2">
            <li>2.1. Katie&apos;s K9s maintains appropriate Public Liability Insurance and licences required by the relevant Local Authority for the services we provide.</li>
            <li>2.2. Evidence of relevant insurance and licensing can be provided upon reasonable request.</li>
            <li>2.3. Owners are strongly advised to maintain their own suitable pet insurance, including cover for veterinary treatment, illness and injury. Katie&apos;s K9s reserves the right to request evidence of insurance where we consider this appropriate.</li>
            <li>2.4. The owner remains responsible for veterinary expenses and other reasonable costs incurred in connection with their dog, whether or not those costs are covered by the owner&apos;s insurance policy.</li>
            <li>2.5. The owner is responsible for any reasonable costs, claims or expenses arising from their dog&apos;s actions or behaviour for which the owner is legally responsible.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">3. Daycare Bookings</h3>
          <ul className="space-y-2">
            <li>3.1. Katie&apos;s K9s operates an ad-hoc daycare booking system. Availability is not guaranteed for specific or recurring days.</li>
            <li>3.2. Daycare bookings may be made no more than two months in advance unless otherwise agreed.</li>
            <li>3.3. Daycare fees must be paid in full on or before the date of the booked session and, unless otherwise agreed, prior to collection of the dog.</li>
            <li>3.4. If a daycare booking is cancelled less than 48 hours before the scheduled session, the full daycare fee remains payable.</li>
            <li>3.5. If a customer does not attend a scheduled daycare booking and provides no prior notice, the full booking fee remains payable. No refund or credit will be provided for missed sessions.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">4. Boarding and Wedding Chaperone Bookings</h3>
          <ul className="space-y-2">
            <li>4.1. A non-refundable deposit of 25% of the total booking cost is required at the time of booking to secure the reservation. The booking will not be considered confirmed until the deposit has been received.</li>
            <li>4.2. The remaining 75% balance must be paid in full 1 week prior to the dog(s)&apos; arrival and commencement of the booking, unless an alternative payment arrangement has been agreed in writing in advance.</li>
            <li>4.3. Payment may be made by cash or BACS bank transfer.</li>
            <li>4.4. If a booking is cancelled more than 30 days before the scheduled arrival date, the 25% deposit will be retained and no further cancellation charge will normally apply.</li>
            <li>4.5. If a booking is cancelled within 30 days of the scheduled arrival date, 50% of the total booking cost will be payable.</li>
            <li>4.6. If a booking is cancelled within 14 days of the scheduled arrival date, 100% of the total booking cost will be payable.</li>
            <li>4.7. Any amount already paid will be deducted from the applicable cancellation charge, and the owner will be responsible for paying any remaining amount due.</li>
            <li>4.8. If the owner fails to attend a scheduled booking without providing prior notice, the booking will be treated as a no-show and the full cost of the booked service will remain payable. No refund, credit or transfer of the booking will be offered for no-show bookings.</li>
            <li>4.9. Where permitted by applicable law, Katie&apos;s K9s reserves the right to charge reasonable interest and/or costs associated with overdue payments.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">5. General Booking Conditions</h3>
          <ul className="space-y-2">
            <li>5.1. All fees must be paid in accordance with the payment terms set out in these Terms and Conditions.</li>
            <li>5.2. If the owner collects their dog before the agreed end date, the original booking fee remains payable and no refund or credit will normally be provided.</li>
            <li>5.3. If a booking is extended, the additional days or services will be charged at the applicable rate and must be paid in accordance with the payment terms agreed.</li>
            <li>5.4. The owner must provide accurate and up to date contact details and nominate an emergency contact who is authorised and able to collect their dog during their stay if required. If the emergency contact differs for any stay, the owner must notify Katie&apos;s K9s and provide the updated contact details prior to the dog&apos;s arrival.</li>
            <li>5.5. The owner must inform Katie&apos;s K9s of any behavioural or other characteristics that may affect the suitability of their dog for our services, including but not limited to aggression, resource guarding, lack of house training, excessive barking, separation related behaviour or antisocial behaviour.</li>
            <li>5.6. Failure to disclose relevant information about a dog&apos;s behaviour, health or needs may result in the booking being refused or terminated. The owner remains responsible for any reasonable additional costs arising as a result.</li>
            <li>5.7. If a dog becomes disruptive, aggressive or dangerous and cannot safely remain at Katie&apos;s K9s, we reserve the right to arrange alternative accommodation or care, including transfer to suitable kennels or another appropriate facility if the dog cannot be collected by the owner or an emergency contact. The owner will be responsible for any reasonable costs incurred.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">6. Dog Safety and Owner Responsibilities</h3>
          <ul className="space-y-2">
            <li>6.1. The owner is responsible for any injury, loss or damage caused by their dog to any person, animal or property where the owner is legally responsible for that loss or damage.</li>
            <li>6.2. Dogs may interact with other dogs as part of our social care environment. While reasonable care and appropriate precautions will be taken, interaction between dogs carries inherent risks, including injury, illness and behavioural incidents.</li>
            <li>6.3. To the extent permitted by law, Katie&apos;s K9s will not be responsible for injury, illness or other loss arising from risks inherent in normal dog to dog interaction where reasonable care has been taken.</li>
            <li>6.4. The owner is responsible for the cost of repairing or replacing property, furnishings, equipment or belongings damaged by their dog, where the owner is legally responsible for such damage.</li>
            <li>6.5. Any belongings provided by the owner, including food, bedding, bowls, toys, leads, collars or grooming equipment, are brought onto the premises at the owner&apos;s risk. Katie&apos;s K9s will take reasonable care but cannot accept responsibility for loss or damage.</li>
            <li>6.6. Owners must provide all food, grooming equipment, collars, leads and medication required for their dog during their stay, together with clear instructions where necessary. All food must be provided in an airtight resealable container or pre-portioned and labelled per meal.</li>
            <li>6.7. In accordance with applicable UK law, owners must ensure that their dog is microchipped and wears an appropriate identification tag.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">7. Dangerous Dogs and Suitability</h3>
          <ul className="space-y-2">
            <li>7.1. Katie&apos;s K9s does not accept dogs prohibited under the Dangerous Dogs Act 1991 or any subsequent legislation.</li>
            <li>7.2. Owners must provide accurate and truthful information about their dog&apos;s breed, type, history and behaviour when making a booking.</li>
            <li>7.3. Katie&apos;s K9s reserves the right to refuse or cancel a booking where we reasonably believe that a dog may be prohibited by law, presents an unacceptable risk, or is otherwise unsuitable for the services provided.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">8. Walking and Weather Conditions</h3>
          <ul className="space-y-2">
            <li>8.1. Dogs will normally be exercised and walked in a range of weather conditions.</li>
            <li>8.2. Walks may be shortened, altered, postponed or cancelled where Katie&apos;s K9s considers weather or environmental conditions to be unsafe for the dog or people caring for them. This may include extreme heat or cold, thunderstorms, flooding, ice or other hazardous conditions.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">9. Photography and Marketing</h3>
          <ul className="space-y-2">
            <li>9.1. Unless the owner opts out, the owner consents to photographs and/or videos of their dog being taken during the provision of services and used by Katie&apos;s K9s for marketing and promotional purposes.</li>
            <li>9.2. The owner may withdraw this consent at any time by notifying Katie&apos;s K9s in writing. Withdrawal of consent will not affect the lawfulness of any use made before the withdrawal.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">10. Our Commitments</h3>
          <ul className="space-y-2">
            <li>10.1. Katie&apos;s K9s will provide services with reasonable care, skill and professionalism and will take reasonable steps to protect the health, safety and wellbeing of dogs in our care.</li>
            <li>10.2. We will follow the reasonable care instructions provided by the owner, subject to the welfare and safety of the dog, other animals and people.</li>
            <li>10.3. Katie&apos;s K9s reserves the right to refuse, cancel or terminate a booking where we reasonably consider a dog unsuitable or where continuing to provide the service would create a risk to the dog, other animals, staff, customers or property.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">11. Circumstances Beyond Our Reasonable Control</h3>
          <ul className="space-y-2">
            <li>11.1. Katie&apos;s K9s will not be responsible for failure or delay in providing services where this is caused by circumstances beyond our reasonable control, including severe weather, illness, emergency situations, power failure, natural disasters, government restrictions or other unforeseen circumstances.</li>
            <li>11.2. Where such circumstances arise, we will take reasonable steps to minimise disruption and, where possible, will communicate with the owner regarding alternative arrangements.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">12. Collection and Abandoned Dogs</h3>
          <ul className="space-y-2">
            <li>12.1. Dogs must be collected at the agreed time at the end of their booking unless an alternative arrangement has been agreed in advance.</li>
            <li>12.2. If a dog is not collected at the agreed time, the applicable late collection charge of £20 per hour will apply.</li>
            <li>12.3. If the owner fails to collect their dog and cannot be contacted, Katie&apos;s K9s will make reasonable attempts to contact the owner and emergency contact and may arrange suitable alternative accommodation or care for the dog.</li>
            <li>12.4. Where a dog remains uncollected for an extended period and the owner cannot be contacted, Katie&apos;s K9s may take further steps permitted by law to safeguard the dog&apos;s welfare. The owner will remain responsible for reasonable costs incurred.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">13. Additional Care Charges</h3>
          <ul className="space-y-2">
            <li>13.1. Additional charges may apply where a dog requires a greater level of care, supervision or assistance than is included within the standard service. This may include puppies under 12 months, senior dogs, dogs with additional needs, dogs requiring medication or dogs requiring additional supervision.</li>
            <li>13.2. Any applicable additional charges will be communicated to the owner wherever reasonably practicable before the service is provided.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">14. Liability</h3>
          <ul className="space-y-2">
            <li>14.1. Katie&apos;s K9s will take reasonable care of dogs while they are in our care. However, owners acknowledge that caring for and handling dogs involves inherent risks, including illness, injury, escape, interaction with other animals and unforeseen behavioural incidents.</li>
            <li>14.2. Nothing in these Terms and Conditions affects the owner&apos;s statutory rights or any rights arising from Katie&apos;s K9s failing to provide services with reasonable care and skill.</li>
            <li>14.3. The owner agrees to reimburse Katie&apos;s K9s for reasonable losses, costs or expenses arising from their dog&apos;s behaviour where the owner is legally responsible for those losses, costs or expenses.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">15. Data Protection and Privacy</h3>
          <ul className="space-y-2">
            <li>15.1. Katie&apos;s K9s collects and processes personal information for the purposes of providing and administering our services, including: managing bookings and customer records; ensuring the health, safety and wellbeing of dogs in our care; communicating with owners regarding bookings and emergencies; processing payments and managing invoices; maintaining appropriate business and legal records.</li>
            <li>15.2. Where necessary and lawful, we may share relevant information with third parties, including: Veterinary professionals, where a dog requires treatment or veterinary advice; Insurance providers, where necessary in connection with a claim or insurance matter; Other professionals, where necessary to provide appropriate care or services; Legal, regulatory or law enforcement authorities, where required or permitted by law.</li>
            <li>15.3. We will only share information that is reasonably necessary for the relevant purpose and will take appropriate steps to protect personal information.</li>
            <li>15.4. Personal information will be stored securely and retained only for as long as reasonably necessary for the purposes for which it was collected, including where retention is required for legal, accounting or regulatory purposes.</li>
            <li>15.5. Personal data will be processed in accordance with applicable UK data protection.</li>
            <li>15.6. Where consent is required for a particular use of personal information, we will obtain that consent separately where appropriate.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#3D5A3E] mb-2">16. Acceptance of Terms</h3>
          <ul className="space-y-2">
            <li>16.1. By making a booking or using the services provided by Katie&apos;s K9s, the owner confirms that they have read, understood and agree to these Terms and Conditions.</li>
            <li>16.2. The owner confirms that all information provided about their dog is accurate and complete and agrees to notify Katie&apos;s K9s of any relevant changes before or during the booking.</li>
          </ul>
        </div>

        <div className="pt-2 border-t border-stone-100">
          <h3 className="font-semibold text-[#3D5A3E] mb-2">Declaration</h3>
          <p>
            You agree to provide full, honest and detailed information in this
            contract about your dog/s and agree to our terms and conditions.
            During your continued use of Katie&apos;s K9s services you agree to keep
            us informed of any changes to your and/or your dog/s information.
          </p>
          <p className="mt-2">
            Failure on your part to disclose any matter whether material fact or
            not, which in our view might render your dog unsuitable for our care
            will amount to breach of conditions and termination of your dog&apos;s
            booking without refund.
          </p>
          <p className="mt-2">
            Should we waive any of these terms on an individual basis or they
            are found to be unenforceable, this shall not affect the validity of
            remaining clauses or commit us to waive the same clause of any other
            occasion. By agreeing to these terms your statutory rights are not
            affected.
          </p>
        </div>
      </div>

      <ConsentRow
        checked={data.tcAgreed}
        onChange={(v) => onUpdate({ tcAgreed: v })}
      >
        I acknowledge that I have read, understood and agree to the Terms &amp;
        Conditions.
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
