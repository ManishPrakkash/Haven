# Haven: Parametric Income Protection for the Gig Economy

Haven is an automated, data-driven insurance ecosystem designed to protect India's 12-million-strong gig workforce. By moving away from traditional indemnity insurance and adopting a **Parametric Trigger** model, Haven ensures that delivery partners and gig workers receive instant financial support when environmental disasters or social disruptions prevent them from earning.

---

## 1. The Problem & Persona Scenarios

### The "Income Gap" Reality
Traditional insurance requires physical damage and long claim cycles. For a gig worker, "damage" isn't just a broken bike; it is a 6-hour rainstorm or a local strike that makes the road inaccessible. **If they don't ride, they don't eat.**

### Scenario 1: The High-Intensity Professional
- **Persona:** Rajesh, 34, a full-time delivery partner in Chennai (High-Risk Zone).
- **Context:** A sudden cyclone causes waterlogging for 8 hours.
- **The Haven Impact:** Rajesh is on **Plan 3**. Since the disruption is verified by the system as >6 hours, Haven automatically triggers a **100% daily income replacement** to his bank account by evening. No forms, no calls.

### Scenario 2: The Supplemental Earner
- **Persona:** Anjali, 22, a student working part-time in Indore (Medium-Risk Zone).
- **Context:** A local protest blocks major delivery hubs for an entire afternoon.
- **The Haven Impact:** Anjali is on **Plan 1**. Her dashboard alerts her that the zone is "Disrupted." After the 6-hour threshold is met, she receives **70% of her average daily earnings**, covering her lost shift.

---

## 2. End-to-End User Workflow
*(Image to be added here)*

### Step 1: Installation & Platform Authentication
The worker installs Haven. The first gate is **Platform Verification**. The user enters their unique ID from platforms like Swiggy or Zomato. The app connects to our Mock Swiggy API to verify the worker's active status and historical earning data.

### Step 2: Identity & Demographic Verification
Haven integrates with **DigiLocker** for seamless KYC. We fetch verified Name, DOB, Gender, and PAN. This data is fed into the AI Risk Engine to determine age-based multipliers and ensure the user meets the eligibility age (20+).

### Step 3: Dynamic Plan Onboarding
The user is presented with three tailored plans. The premiums are not flat; they are **Dynamic**. The app calculates a custom price based on the worker's average daily salary and their primary operating zone's risk level.

### Step 4: Financial Setup & MPIN
The user provides bank account details for automated payouts and sets a secure 6-digit MPIN. This MPIN is required for any high-level changes to the policy or viewing sensitive transaction logs.

### Step 5: Anti-Fraud Liveness Checks
Before the policy activates, the user undergoes:
- **Selfie & Liveness Check:** AI verifies the user is a real person and matches the DigiLocker ID.
- **Virtual Signing:** A digital acceptance of the 75-page Terms & Conditions through a secure gesture-based signature.

### Step 6: The Persona Dashboard
Once activated, the user enters a personalized dashboard. It displays their **"Safe"** vs. **"High Risk"** status in real-time. If a parametric event starts, a progress bar shows how close the event is to hitting the 6-hour payout trigger.

---

## 3. Premium Plans

Premiums are collected weekly via the formula:

> **Premium = Avg Daily Salary × Base Rate × Risk Multiplier × Age Multiplier**

### Protection Tiers

| Plan Tier | Base Rate | Payout | Waiting Period | Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Plan 1 (Economy)** | 7% | 70% | 2 Weeks | Budget-friendly safety net. |
| **Plan 2 (Value)** | 10% | 100% | 4 Weeks | Full income replacement for veterans. |
| **Plan 3 (Elite)** | 20% | 100% | No Waiting Period | Immediate, high-priority protection. |

### 1. Average Daily Salary (The Baseline)
- **Definition:** A system-calculated average of the worker's earnings over a 7–30 day lookback period.
- **Research Grounding:** Based on current industry data, this benchmark typically ranges from ₹600 for supplemental earners to ₹1,200+ for high-intensity professional riders *(Source: TheFinthusiastic Gig Economy Analysis)*.

### 2. Plan-Based Base Rates
The base rate is determined by the specific "Protection Tier" the user selects, reflecting the level of daily payout they desire:
- **Plan 1 (Economy):** 7% Base Rate \| Provides 70% income replacement.
- **Plan 2 (Value):** 10% Base Rate \| Provides 100% income replacement.
- **Plan 3 (Elite):** 20% Base Rate \| Provides 100% income replacement with **Zero Waiting Period**.

### 3. Risk Multipliers (Geographic & Operational Risk)
Premiums are weighted based on the vulnerability of the user's **primary operating zone**. This ensures that workers in high-hazard areas contribute proportionally to the higher likelihood of triggers:
- **Low Risk (1.0x):** Standard operating environments with high infrastructure resilience.
- **Medium Risk (1.1x):** Zones with moderate exposure to environmental or social disruptions.
- **High Risk (1.2x):** Tier-1 Metros (e.g., Chennai, Mumbai) with high historical disaster frequency.

### 4. Age-Based Multipliers
Research indicates that age directly correlates with road exposure and risk-taking behavior in the gig economy. Haven uses the following multipliers fetched from DigiLocker verified data:
- **20–25 Years (1.0x):** The foundational age bracket comprising a significant portion of the workforce.
- **26–40 Years (1.2x):** Professional-tier workers with higher daily intensity.
- **Above 40 Years (1.5x):** High-risk bracket due to health and safety considerations in extreme weather.

---

## 4. Parametric Triggers

<br><br><br>

## 5. AI/ML Integration

<br><br><br>

## 6. Fraud Detection

<br><br><br>

## 7. Tech Stack

### User

| Category | Technology |
| :--- | :--- |
| Framework | React Native 0.74 (Expo SDK 51) |
| Language | TypeScript |
| State | Zustand 4.x |
| Navigation | Expo Router v3 |
| Identity/Security | Expo Camera & Biometrics |
| Communication | Firebase FCM & Expo Notifications |
| UI/UX | Lottie & Reanimated |

### Admin

| Category | Technology |
| :--- | :--- |
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS & shadcn/ui |
| Data Fetching | TanStack Query v5 |
| Analytics | Recharts |
| Auth | NestJS Admin JWT |
| Hosting | Firebase Hosting |

### Backend Server

| Category | Technology |
| :--- | :--- |
| Runtime | Node.js 20 LTS (NestJS 10) |
| Database | Supabase (PostgreSQL) |
| Scheduler | @nestjs/schedule (CRON) |
| External APIs | OpenWeatherMap & WAQI |
| CI/CD | GitHub Actions & Railway |
| Validation | Zod |
