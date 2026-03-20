import { create } from 'zustand';

interface EnrollmentState {
  selectedPlanCode: string | null;
  calculatedPremium: number | null;
  premiumWithGst: number | null;
  premiumBreakdown: Record<string, number> | null;
  agreementSignedAt: string | null;
  signatureData: string | null;
  selfieVerified: boolean;
  livenessVerified: boolean;
  upiId: string | null;

  setPlan: (planCode: string, premium: number, premiumGst: number, breakdown: any) => void;
  setAgreementSigned: (at: string, signatureData: string) => void;
  setSelfieVerified: (verified: boolean) => void;
  setLivenessVerified: (verified: boolean) => void;
  setUpiId: (upi: string) => void;
  reset: () => void;
}

export const useEnrollmentStore = create<EnrollmentState>((set) => ({
  selectedPlanCode: null,
  calculatedPremium: null,
  premiumWithGst: null,
  premiumBreakdown: null,
  agreementSignedAt: null,
  signatureData: null,
  selfieVerified: false,
  livenessVerified: false,
  upiId: null,

  setPlan: (planCode, premium, premiumGst, breakdown) => set({
    selectedPlanCode: planCode, calculatedPremium: premium,
    premiumWithGst: premiumGst, premiumBreakdown: breakdown,
  }),
  setAgreementSigned: (at, signatureData) => set({ agreementSignedAt: at, signatureData }),
  setSelfieVerified: (selfieVerified) => set({ selfieVerified }),
  setLivenessVerified: (livenessVerified) => set({ livenessVerified }),
  setUpiId: (upiId) => set({ upiId }),
  reset: () => set({
    selectedPlanCode: null, calculatedPremium: null, premiumWithGst: null,
    premiumBreakdown: null, agreementSignedAt: null, signatureData: null,
    selfieVerified: false, livenessVerified: false, upiId: null,
  }),
}));
