// Mock services that simulate NestJS backend responses.
// When the backend is ready, replace these with real API calls.

import { api } from './api.client';

// ── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_WORKER = {
  id: 'worker-001',
  workerId: 'SW-CHE-004821',
  name: 'Ravi Kumar',
  phone: '+919876543210',
  city: 'Chennai',
  cityCode: 'CHE',
  vehicleType: 'bike',
  platform: 'swiggy',
  weeklyHours: 45,
  weeklyEarnings: 8500,
  isActive: true,
};

const MOCK_KYC = {
  name: 'Ravi Kumar',
  aadhaarMasked: 'XXXX-XXXX-4821',
  aadhaarHash: 'a1b2c3d4e5f6',
  pan: 'ABCDE1234F',
  dob: '1995-03-15',
  address: '42 Anna Nagar, Chennai, Tamil Nadu - 600040',
};

const MOCK_PLANS = [
  {
    id: 'plan-lite',
    plan_code: 'LITE',
    plan_name: 'Lite',
    weekly_premium: 29,
    weekly_premium_gst: 34.22,
    coverage_amount: 5000,
    max_payout_per_day: 500,
    max_claims_per_week: 2,
    waiting_period_days: 7,
    payout_sla_hours: 48,
    triggers_covered: ['RAIN_EXTREME', 'HEAT_EXTREME'],
    payout_amounts: { RAIN_EXTREME: 250, HEAT_EXTREME: 200 },
    features: {
      shortDesc: 'Basic protection for rain and heat events',
      waitingLabel: '7-day waiting period',
      payoutLabel: 'Up to ₹500/day',
      claimsLabel: '2 claims/week',
      badge: null,
    },
  },
  {
    id: 'plan-economy',
    plan_code: 'ECONOMY',
    plan_name: 'Economy',
    weekly_premium: 59,
    weekly_premium_gst: 69.62,
    coverage_amount: 15000,
    max_payout_per_day: 1000,
    max_claims_per_week: 4,
    waiting_period_days: 3,
    payout_sla_hours: 24,
    triggers_covered: ['RAIN_EXTREME', 'AQI_SEVERE', 'HEAT_EXTREME', 'PLATFORM_OUTAGE'],
    payout_amounts: { RAIN_EXTREME: 500, AQI_SEVERE: 400, HEAT_EXTREME: 350, PLATFORM_OUTAGE: 600 },
    features: {
      shortDesc: 'Best value — covers 4 triggers with fast payouts',
      waitingLabel: '3-day waiting period',
      payoutLabel: 'Up to ₹1,000/day',
      claimsLabel: '4 claims/week',
      badge: 'Recommended',
    },
  },
  {
    id: 'plan-pro',
    plan_code: 'PRO',
    plan_name: 'Pro',
    weekly_premium: 99,
    weekly_premium_gst: 116.82,
    coverage_amount: 30000,
    max_payout_per_day: 2000,
    max_claims_per_week: 7,
    waiting_period_days: 1,
    payout_sla_hours: 6,
    triggers_covered: ['RAIN_EXTREME', 'AQI_SEVERE', 'HEAT_EXTREME', 'PLATFORM_OUTAGE', 'SOCIAL_DISRUPTION'],
    payout_amounts: { RAIN_EXTREME: 800, AQI_SEVERE: 700, HEAT_EXTREME: 600, PLATFORM_OUTAGE: 1000, SOCIAL_DISRUPTION: 900 },
    features: {
      shortDesc: 'Maximum protection — all 5 triggers, fastest payouts',
      waitingLabel: '1-day waiting period',
      payoutLabel: 'Up to ₹2,000/day',
      claimsLabel: '7 claims/week',
      badge: 'Premium',
    },
  },
];

const MOCK_POLICY = {
  id: 'policy-001',
  policyNumber: 'GS-2026-ECO-004821',
  planCode: 'ECONOMY',
  planName: 'Economy',
  status: 'ACTIVE',
  coverageAmount: 15000,
  weeklyPremium: 69.62,
  startDate: '2026-03-10',
  waitingPeriodEndDate: '2026-03-13',
  totalClaimsPaid: 2,
  totalPayoutAmount: 900,
};

const MOCK_CLAIMS = [
  {
    id: 'claim-001',
    triggerType: 'RAIN_EXTREME',
    status: 'PAID',
    amount: 500,
    createdAt: '2026-03-18T10:30:00Z',
    approvedAt: '2026-03-18T10:35:00Z',
    paidAt: '2026-03-18T11:00:00Z',
    utrNumber: 'UTR123456789',
    city: 'Chennai',
  },
  {
    id: 'claim-002',
    triggerType: 'HEAT_EXTREME',
    status: 'APPROVED',
    amount: 350,
    createdAt: '2026-03-19T08:00:00Z',
    approvedAt: '2026-03-19T08:05:00Z',
    paidAt: null,
    utrNumber: null,
    city: 'Chennai',
  },
  {
    id: 'claim-003',
    triggerType: 'AQI_SEVERE',
    status: 'PENDING',
    amount: 400,
    createdAt: '2026-03-19T14:00:00Z',
    approvedAt: null,
    paidAt: null,
    utrNumber: null,
    city: 'Chennai',
  },
];

const MOCK_PAYOUTS = [
  {
    id: 'payout-001',
    claimId: 'claim-001',
    amount: 500,
    upiId: 'ravi@upi',
    utrNumber: 'UTR123456789',
    status: 'COMPLETED',
    paidAt: '2026-03-18T11:00:00Z',
    triggerType: 'RAIN_EXTREME',
  },
];

const MOCK_ACTIVE_TRIGGERS = [
  {
    id: 'trigger-001',
    type: 'RAIN_EXTREME',
    city: 'Chennai',
    cityCode: 'CHE',
    severity: 'extreme',
    startedAt: '2026-03-19T06:00:00Z',
    value: 120,
    unit: 'mm',
  },
];

// ── Delay helper ──────────────────────────────────────────────────────────────
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// ── Worker Service ────────────────────────────────────────────────────────────
export const workerService = {
  async verifyWorkerId(workerId: string) {
    await delay(1200);
    if (workerId === 'SW-CHE-999999') {
      throw { response: { data: { message: 'Worker ID not found. Please check and try again.' } } };
    }
    return { ...MOCK_WORKER, workerId };
  },
};

// ── Auth Service ──────────────────────────────────────────────────────────────
export const authService = {
  async sendOtp(phone: string) {
    await delay(800);
    return { success: true, message: 'OTP sent successfully' };
  },

  async verifyOtp(phone: string, otp: string) {
    await delay(1000);
    if (otp === '000000') {
      throw { response: { data: { message: 'Incorrect OTP. Please try again.' } } };
    }
    // Simulate new user registration flow
    return {
      isNewUser: true,
      registrationToken: 'mock-reg-token-' + Date.now(),
    };
  },

  async completeRegistration(payload: any) {
    await delay(1500);
    return {
      userId: 'user-' + Date.now(),
      accessToken: 'mock-access-' + Date.now(),
      refreshToken: 'mock-refresh-' + Date.now(),
    };
  },
};

// ── KYC Service ───────────────────────────────────────────────────────────────
export const kycService = {
  async fetchKyc(phone: string) {
    await delay(2500); // Simulate DigiLocker fetch
    return MOCK_KYC;
  },

  async confirmKyc(data: any) {
    await delay(800);
    return { success: true };
  },
};

// ── Plans Service ─────────────────────────────────────────────────────────────
export const plansService = {
  async getAll() {
    await delay(800);
    return MOCK_PLANS;
  },

  async getByCode(planCode: string) {
    await delay(500);
    return MOCK_PLANS.find(p => p.plan_code === planCode) || MOCK_PLANS[1];
  },

  async getRecommendedPlan(userId: string) {
    await delay(400);
    return MOCK_PLANS[1]; // Economy is recommended
  },

  async calculatePremium(input: any) {
    await delay(600);
    const plan = MOCK_PLANS.find(p => p.plan_code === input.planCode) || MOCK_PLANS[1];
    return {
      basePremium: plan.weekly_premium,
      gst: plan.weekly_premium_gst - plan.weekly_premium,
      total: plan.weekly_premium_gst,
      breakdown: {
        base: plan.weekly_premium,
        cityMultiplier: 1.0,
        vehicleMultiplier: 1.0,
        nightMultiplier: 1.0,
      },
    };
  },
};

// ── Policy Service ────────────────────────────────────────────────────────────
export const policyService = {
  async createPolicy(payload: any) {
    await delay(2000);
    return { ...MOCK_POLICY, id: 'policy-' + Date.now() };
  },

  async getMyPolicy() {
    await delay(600);
    return MOCK_POLICY;
  },

  async cancelPolicy(policyId: string) {
    await delay(800);
    return { success: true };
  },
};

// ── Claims Service ────────────────────────────────────────────────────────────
export const claimsService = {
  async getMyClaims(params?: { limit?: number }) {
    await delay(500);
    const limit = params?.limit ?? 10;
    return MOCK_CLAIMS.slice(0, limit);
  },

  async getClaimById(claimId: string) {
    await delay(400);
    return MOCK_CLAIMS.find(c => c.id === claimId) || MOCK_CLAIMS[0];
  },

  async appealClaim(claimId: string, reason: string) {
    await delay(1000);
    return { success: true };
  },
};

// ── Payouts Service ───────────────────────────────────────────────────────────
export const payoutsService = {
  async getMyPayouts() {
    await delay(500);
    return MOCK_PAYOUTS;
  },

  async getPayoutById(payoutId: string) {
    await delay(400);
    return MOCK_PAYOUTS[0];
  },

  async mockProcessPayment(payload: any) {
    await delay(2000);
    return { success: true, transactionId: 'txn-' + Date.now() };
  },
};

// ── Triggers Service ──────────────────────────────────────────────────────────
export const triggersService = {
  async getActiveTriggers(cityCode: string) {
    await delay(400);
    return MOCK_ACTIVE_TRIGGERS;
  },
};
