export interface OwnerDetails {
  firstName: string;
  surname: string;
  addressLine1: string;
  addressLine2: string;
  town: string;
  postcode: string;
  mobile: string;
  homePhone: string;
  email: string;
}

export interface EmergencyContact {
  firstName: string;
  surname: string;
  mobile: string;
  homePhone: string;
  email: string;
}

export interface DogDetails {
  name: string;
  dob: string;
  breed: string;
  sex: "Male" | "Female" | "";
  weightKg: string;
  neutered: "Yes" | "No" | "";
  microchipNumber: string;
}

export interface HealthDetails {
  lastVaccinationDate: string;
  vaccinationDetails: string;
  lastKennelCoughDate: string;
  lastFleaTreatmentDate: string;
  nextFleaTreatmentDate: string;
  lastWormingDate: string;
  nextWormingDate: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
  digestiveDisruptions: string;
  // Bitch in season (female + unneutered only)
  lastSeasonDate: string;
  nextSeasonDate: string;
}

export interface VetDetails {
  vetName: string;
  vetAddressLine1: string;
  vetAddressLine2: string;
  vetTown: string;
  vetPostcode: string;
  vetPhone: string;
  vetOutOfHoursPhone: string;
}

export interface InsuranceDetails {
  insuranceProvider: string;
  policyNumber: string;
  insurancePhone: string;
}

export interface FeedingDetails {
  foodType: string;
  foodBrand: string;
  quantityGrams: string;
  mealsPerDay: string;
  mealTimes: string;
  preparationDetails: string;
  treatsAllowed: "Yes" | "No" | "";
  eatingStyle: string;
  foodOriented: string;
  otherFeedingInstructions: string;
}

export type YesNoSometimes = "Yes" | "No" | "Sometimes" | "";
export type YesNo = "Yes" | "No" | "";

export interface BehaviourDetails {
  commands: string;
  toysAndGames: string;
  dailyExercise: string;
  sleepsWhere: string;
  boardedBefore: YesNo;
  likesCuddles: YesNoSometimes;
  stealsFood: YesNoSometimes;
  possessiveFood: YesNoSometimes;
  possessiveToys: YesNoSometimes;
  jumpsUp: YesNoSometimes;
  toiletsIndoors: YesNoSometimes;
  happyAlone: YesNoSometimes;
  barksAtOthers: YesNoSometimes;
  recallOffLead: YesNoSometimes;
  happyInCar: YesNoSometimes;
  happyNearWater: YesNoSometimes;
  nervousAnxious: YesNoSometimes;
  nervousDetails: string;
  loudNoises: YesNoSometimes;
  loudNoisesDetails: string;
  destructive: YesNoSometimes;
  destructiveDetails: string;
  escapist: YesNoSometimes;
  escapistDetails: string;
  aggressiveOtherDogs: YesNoSometimes;
  aggressiveOtherDogsDetails: string;
  aggressivePeople: YesNoSometimes;
  aggressivePeopleDetails: string;
  otherBehaviourInfo: string;
}

export interface CrateGroomingDetails {
  usesCrateAtHome: YesNo;
  whenUsesCrate: string;
  consentToCrate: YesNo;
  consentCrateDoorClosed: YesNo;
  groomingSchedule: string;
}

export interface ConsentsDetails {
  consentVetCare: boolean;
  consentMixWithDogs: boolean;
  consentTreats: boolean;
  consentFedElsewhere: boolean;
  consentOffLead: boolean;
  consentTransportedInCar: boolean;
  consentWalkedWithOtherDogs: boolean;
  consentCognitiveEnrichment: boolean;
  consentSensoryEnrichment: boolean;
  consentPhysicalEnrichment: boolean;
  consentSocialEnrichment: boolean;
  consentEnvironmentalEnrichment: boolean;
  consentSecureFieldOffLead: boolean;
  consentPhotosVideos: boolean;
  consentKeptTogetherOvernight: boolean;
}

export interface SignatureDetails {
  owner1SignedName: string;
  owner1SignedDate: string;
  owner2SignedName: string;
  owner2SignedDate: string;
  vetAuthOwner1SignedName: string;
  vetAuthOwner1Date: string;
  vetAuthOwner2SignedName: string;
  vetAuthOwner2Date: string;
  tcAgreed: boolean;
}

export interface FormData {
  owner1: OwnerDetails;
  hasOwner2: boolean;
  owner2: OwnerDetails;
  emergencyContact: EmergencyContact;
  dog: DogDetails;
  health: HealthDetails;
  vet: VetDetails;
  insurance: InsuranceDetails;
  feeding: FeedingDetails;
  behaviour: BehaviourDetails;
  crateGrooming: CrateGroomingDetails;
  consents: ConsentsDetails;
  tcAgreed: boolean;
  signature: SignatureDetails;
}

export const EMPTY_OWNER: OwnerDetails = {
  firstName: "",
  surname: "",
  addressLine1: "",
  addressLine2: "",
  town: "",
  postcode: "",
  mobile: "",
  homePhone: "",
  email: "",
};

export const EMPTY_EMERGENCY: EmergencyContact = {
  firstName: "",
  surname: "",
  mobile: "",
  homePhone: "",
  email: "",
};

export const INITIAL_FORM_DATA: FormData = {
  owner1: { ...EMPTY_OWNER },
  hasOwner2: false,
  owner2: { ...EMPTY_OWNER },
  emergencyContact: { ...EMPTY_EMERGENCY },
  dog: {
    name: "",
    dob: "",
    breed: "",
    sex: "",
    weightKg: "",
    neutered: "",
    microchipNumber: "",
  },
  health: {
    lastVaccinationDate: "",
    vaccinationDetails: "",
    lastKennelCoughDate: "",
    lastFleaTreatmentDate: "",
    nextFleaTreatmentDate: "",
    lastWormingDate: "",
    nextWormingDate: "",
    medicalConditions: "",
    medications: "",
    allergies: "",
    digestiveDisruptions: "",
    lastSeasonDate: "",
    nextSeasonDate: "",
  },
  vet: {
    vetName: "",
    vetAddressLine1: "",
    vetAddressLine2: "",
    vetTown: "",
    vetPostcode: "",
    vetPhone: "",
    vetOutOfHoursPhone: "",
  },
  insurance: {
    insuranceProvider: "",
    policyNumber: "",
    insurancePhone: "",
  },
  feeding: {
    foodType: "",
    foodBrand: "",
    quantityGrams: "",
    mealsPerDay: "",
    mealTimes: "",
    preparationDetails: "",
    treatsAllowed: "",
    eatingStyle: "",
    foodOriented: "",
    otherFeedingInstructions: "",
  },
  behaviour: {
    commands: "",
    toysAndGames: "",
    dailyExercise: "",
    sleepsWhere: "",
    boardedBefore: "",
    likesCuddles: "",
    stealsFood: "",
    possessiveFood: "",
    possessiveToys: "",
    jumpsUp: "",
    toiletsIndoors: "",
    happyAlone: "",
    barksAtOthers: "",
    recallOffLead: "",
    happyInCar: "",
    happyNearWater: "",
    nervousAnxious: "",
    nervousDetails: "",
    loudNoises: "",
    loudNoisesDetails: "",
    destructive: "",
    destructiveDetails: "",
    escapist: "",
    escapistDetails: "",
    aggressiveOtherDogs: "",
    aggressiveOtherDogsDetails: "",
    aggressivePeople: "",
    aggressivePeopleDetails: "",
    otherBehaviourInfo: "",
  },
  crateGrooming: {
    usesCrateAtHome: "",
    whenUsesCrate: "",
    consentToCrate: "",
    consentCrateDoorClosed: "",
    groomingSchedule: "",
  },
  consents: {
    consentVetCare: false,
    consentMixWithDogs: false,
    consentTreats: false,
    consentFedElsewhere: false,
    consentOffLead: false,
    consentTransportedInCar: false,
    consentWalkedWithOtherDogs: false,
    consentCognitiveEnrichment: false,
    consentSensoryEnrichment: false,
    consentPhysicalEnrichment: false,
    consentSocialEnrichment: false,
    consentEnvironmentalEnrichment: false,
    consentSecureFieldOffLead: false,
    consentPhotosVideos: false,
    consentKeptTogetherOvernight: false,
  },
  tcAgreed: false,
  signature: {
    owner1SignedName: "",
    owner1SignedDate: "",
    owner2SignedName: "",
    owner2SignedDate: "",
    vetAuthOwner1SignedName: "",
    vetAuthOwner1Date: "",
    vetAuthOwner2SignedName: "",
    vetAuthOwner2Date: "",
    tcAgreed: false,
  },
};

export const STORAGE_KEY = "kk9s_onboarding_v1";
export const STEP_KEY = "kk9s_onboarding_step_v1";
export const TOTAL_STEPS = 9;
