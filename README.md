<div align="center">
  <h1>H A V E N</h1>
  <p><strong>PARAMETRIC INCOME PROTECTION FOR THE GIG ECONOMY</strong></p>
  <p><em>"NO WORK = NO PAY"</em></p>
  <br>
  <p>An automated, data-driven insurance ecosystem designed to protect India's 12-million-strong gig workforce.</p>
</div>

---

**CORE DIRECTIVE**
> By moving away from traditional indemnity insurance and adopting a **Parametric Trigger** model, Haven ensures that delivery partners and gig workers receive instant financial support when environmental disasters or social disruptions prevent them from earning.

---

### I. THE PROBLEM & PERSONA SCENARIOS

**THE "INCOME GAP" REALITY**
Traditional insurance requires physical damage and long claim cycles. For a gig worker, "damage" isn't just a broken bike; it is a 6-hour rainstorm or a local strike that makes the road inaccessible. 
> **"NO WORK = NO PAY"** — If they don't ride, they don't eat.

**SCENARIO A: THE HIGH-INTENSITY PROFESSIONAL**
* **Target:** Rajesh, 34 (Full-time delivery partner, Chennai — High-Risk Zone)
* **Trigger Event:** Sudden cyclone causes waterlogging for 8+ hours.
* **Resolution:** Rajesh is enrolled in **Plan 3**. Since the disruption is verified by the system as >6 hours, Haven automatically triggers a **100% daily income replacement** to his bank account by evening. No forms, no calls.

**SCENARIO B: THE SUPPLEMENTAL EARNER**
* **Target:** Anjali, 22 (Student working part-time, Indore — Medium-Risk Zone)
* **Trigger Event:** Local protest blocks major delivery hubs for an entire afternoon.
* **Resolution:** Anjali is on **Plan 1**. Her dashboard alerts her that the zone is "Disrupted." After the 6-hour threshold is met, she seamlessly receives **70% of her average daily earnings**, covering her lost shift.

---

### II. END-TO-END USER WORKFLOW

<div align="center">
  <img src="workflow.png" alt="Haven Insurance Onboarding Road" width="800"/>
</div>
<br>

1. **Installation & Platform Authentication:** The worker installs Haven. The first gate is Platform Verification. The user enters their unique ID from platforms like Swiggy or Zomato. The app connects to our Mock Swiggy API to verify active status and historical earning data.
2. **Identity & Demographic Verification:** Haven integrates with DigiLocker for seamless KYC. We fetch verified Name, DOB, Gender, and PAN. This data feeds into the AI Risk Engine to determine age-based multipliers and ensure eligibility (20+).
3. **Dynamic Plan Onboarding:** The user is presented with three tailored plans. The premiums are dynamic—calculated via custom pricing based on average daily salary and primary operating zone risk level.
4. **Financial Setup & MPIN:** The user provides bank account details auto-payouts and sets a secure 6-digit MPIN for high-level policy changes or sensitive logs.
5. **Anti-Fraud Liveness Checks:** Before policy activation:
   * *Liveness Check:* AI verifies user authenticity against the DigiLocker ID.
   * *Virtual Signing:* Digital acceptance of Terms & Conditions via secure gesture signature.
6. **The Persona Dashboard:** Displays `[ SAFE ]` vs. `[ HIGH RISK ]` status in real-time. If a parametric event triggers, a deterministic progress bar displays the countdown to the 6-hour payout lock-in.

---

### III. PREMIUM PLANS

| Plan Tier | Base Rate | Payout | Waiting Period | Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Plan 1 (Economy)** | `7%` | **70%** | 2 Weeks | Budget-friendly safety net. |
| **Plan 2 (Value)** | `10%` | **100%** | 4 Weeks | Full income replacement for veterans. |
| **Plan 3 (Elite)** | `20%` | **100%** | *Zero* | Immediate, high-priority protection. |

---

### IV. PARAMETRIC TRIGGERS

*(Data definitions pending)*

<br>

### V. AI/ML INTEGRATION

**AI-DRIVEN PREMIUM CALCULATION**
The core of Haven’s financial logic is the Automated Actuarial Engine, outputting weekly premiums using a multi-variable formula driven by real-time data ingestion.

#### A. THE DYNAMIC PRICING FORMULA
Every premium is custom-generated at the start of the billing cycle:

```text
Premium = Avg Daily Salary × Base Rate × Risk Multiplier × Age Multiplier
```
* **Avg Daily Salary (Feature Base):** AI analyzes a 7–30 day lookback period of transaction records from the Mock Swiggy API as the income baseline.
* **Base Rate (Plan Selection):** Auto-assigned based on chosen plan (7% for P1, 10% for P2, 20% for P3).
* **Risk & Age Multipliers (ML Weights):** Dynamic weights predicted by our **XGBoost Regression** model utilizing persona and operating environment data.

#### B. XGBOOST REGRESSION MODEL INTEGRATION
Supervised Learning (XGBoost) calculates final Risk Scoring multipliers.
* **Data Ingestion:** System fetches verified age (DigiLocker) and location/activity (Platform API).
* **Feature Engineering:** Model categorizes inputs. Example: A 26-year-old in a flood-prone Tier-1 city receives an Age Multiplier of `1.2` and Risk Multiplier of `1.2`.
* **Premium Normalization:** AI isolates "Income Spikes" (e.g., festival earnings) to normalize the dataset, preventing overcharging in the next premium cycle.

#### C. REAL-TIME DYNAMIC ADJUSTMENT
Unlike static policies, Haven’s AI continuously revises risk profiles.
* **Claim History Loading:** Isolation Forest fraud modeling confirms clean records, qualifying users for **No-Claim Bonus (NCB)** discounts (5%–15%). Frequent claim behavior triggers risk loading premiums.
* **Geographic Risk Volatility:** High-frequency disaster spikes trigger deterministic reclassification by the Haven Server (e.g., `Mid` -> `High` risk), adjusting premiums prospectively.

<br>

### VI. FRAUD DETECTION

*(System architecture pending)*

<br>

---

### VII. TECHNOLOGY STACK

#### USER APP (Client Interface)
| Category | Technology |
| :--- | :--- |
| **Framework** | React Native 0.74 (Expo SDK 51) |
| **Language** | TypeScript |
| **State** | Zustand 4.x |
| **Navigation** | Expo Router v3 |
| **Identity/Security** | Expo Camera & Biometrics |
| **Communication** | Firebase FCM & Expo Notifications |
| **UI/UX** | Lottie & Reanimated |

#### ADMIN PANEL (Actuarial Portal)
| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS & shadcn/ui |
| **Data Fetching** | TanStack Query v5 |
| **Analytics** | Recharts |
| **Auth** | NestJS Admin JWT |
| **Hosting** | Firebase Hosting |

#### BACKEND ENGINE
| Category | Technology |
| :--- | :--- |
| **Runtime** | Node.js 20 LTS (NestJS 10) |
| **Database** | Supabase (PostgreSQL) |
| **Scheduler** | @nestjs/schedule (CRON) |
| **External APIs** | OpenWeatherMap & WAQI |
| **CI/CD** | GitHub Actions & Railway |
| **Validation** | Zod |

---

### VIII. PLATFORM CHOICES JUSTIFICATION

**NATIVE MOBILE (User App)**
The delivery partner's workplace is the road, not a desk. A native mobile application is the only viable interface for this demographic.
* **Hardware Sensors:** Native GPS is mandatory for "Proof of Presence" to trigger parametric payouts. Local Camera access enables required AI-driven liveness checks to prevent identity fraud.

**WEB PORTAL (Admin Panel)**
* **Data Density:** Managing 12 million global profiles requires high-resolution Risk Heatmaps and Recharts analytics—only effective on large desktop displays.
* **Actuarial Management:** Adjusting XGBoost weights, reviewing insurance pool solvency, and generating manual trigger overrides demand a secure, high-speed input web environment.
