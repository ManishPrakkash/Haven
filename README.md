<div align="center">
  <h1>🛡️ Haven</h1>
  <p><b>Parametric Income Protection for the Gig Economy</b></p>
  <p><i>"NO WORK = NO PAY"</i></p>
  <p>
    An automated, data-driven insurance ecosystem designed to protect India's 12-million-strong gig workforce.
  </p>
</div>

---

> By moving away from traditional indemnity insurance and adopting a **Parametric Trigger** model, Haven ensures that delivery partners and gig workers receive instant financial support when environmental disasters or social disruptions prevent them from earning.

---

## 🛑 1. The Problem & Persona Scenarios

### 🌩️ The "Income Gap" Reality
Traditional insurance requires physical damage and long claim cycles. For a gig worker, "damage" isn't just a broken bike; it is a 6-hour rainstorm or a local strike that makes the road inaccessible.
> **"NO WORK = NO PAY" — If they don't ride, they don't eat.**

#### 🚴 Scenario 1: The High-Intensity Professional
* **Persona:** Rajesh, 34 — Full-time delivery partner in Chennai *(High-Risk Zone)*  
* **Context:** A sudden cyclone causes waterlogging for 8+ hours.  
* **The Haven Impact:** Rajesh is enrolled in **Plan 3**. Since the disruption is verified by the system as >6 hours, Haven automatically triggers a **100% daily income replacement** to his bank account by evening. *No forms, no calls.*

#### 🎓 Scenario 2: The Supplemental Earner
* **Persona:** Anjali, 22 — Student working part-time in Indore *(Medium-Risk Zone)*  
* **Context:** A local protest blocks major delivery hubs for an entire afternoon.  
* **The Haven Impact:** Anjali is on **Plan 1**. Her dashboard alerts her that the zone is "Disrupted." After the 6-hour threshold is met, she seamlessly receives **70% of her average daily earnings**, covering her lost shift.

---

## ⚙️ 2. End-to-End User Workflow

<div align="center">
  <i>*(Image to be added here)*</i>
</div>
<br>

**Step 1: Installation & Platform Authentication**  
The worker installs Haven. The first gate is **Platform Verification**. The user enters their unique ID from platforms like Swiggy or Zomato. The app connects to our Mock Swiggy API to verify the worker's active status and historical earning data.

**Step 2: Identity & Demographic Verification**  
Haven integrates with **DigiLocker** for seamless KYC. We fetch verified Name, DOB, Gender, and PAN. This data is fed into the AI Risk Engine to determine age-based multipliers and ensure the user meets the eligibility age (20+).

**Step 3: Dynamic Plan Onboarding**  
The user is presented with three tailored plans. The premiums are not flat; they are **Dynamic**. The app calculates a custom price based on the worker's average daily salary and their primary operating zone's risk level.

**Step 4: Financial Setup & MPIN**  
The user provides bank account details for automated payouts and sets a secure 6-digit MPIN. This MPIN is required for any high-level changes to the policy or viewing sensitive transaction logs.

**Step 5: Anti-Fraud Liveness Checks**  
Before the policy activates, the user undergoes:
- 🤳 **Selfie & Liveness Check:** AI verifies the user is a real person and matches the DigiLocker ID.
- ✍️ **Virtual Signing:** A digital acceptance of the 75-page Terms & Conditions through a secure gesture-based signature.

**Step 6: The Persona Dashboard**  
Once activated, the user enters a personalized dashboard. It displays their <mark style="background-color: #d4edda; color: #155724; padding: 2px 5px; border-radius: 4px;">"Safe"</mark> vs. <mark style="background-color: #f8d7da; color: #721c24; padding: 2px 5px; border-radius: 4px;">"High Risk"</mark> status in real-time. If a parametric event starts, a progress bar shows how close the event is to hitting the 6-hour payout trigger.

---

## 💎 3. Premium Plans

| Plan Tier | Base Rate | Payout | Waiting Period | Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Plan 1 (Economy)** | `7%` | **70%** | 2 Weeks | Budget-friendly safety net. |
| **Plan 2 (Value)** | `10%` | **100%** | 4 Weeks | Full income replacement for veterans. |
| **Plan 3 (Elite)** | `20%` | **100%** | *Zero* | Immediate, high-priority protection. |

---

## 🔔 4. Parametric Triggers

<br><br><br>

## 🧠 5. AI/ML Integration

### 🤖 AI-Driven Premium Calculation Plan
The core of Haven’s financial logic is the **Automated Actuarial Engine**, which calculates the weekly premium using a multi-variable formula driven by real-time data ingestion.

#### 1️⃣ The Dynamic Pricing Formula
Every premium is custom-generated at the start of the billing cycle using the following supervised learning variables:

> `Premium = Avg Daily Salary × Base Rate × Risk Multiplier × Age Multiplier`

* **Average Daily Salary (The Feature Base):** The AI analyzes a 7–30 day lookback period of transaction records from the Mock Swiggy API to establish an income baseline.
* **Base Rate (The Plan Selection):** Automatically assigned based on the user's chosen plan (7% for P1, 10% for P2, or 20% for P3).
* **Risk & Age Multipliers (The ML Weights):** These are dynamic weights predicted by our **XGBoost Regression** model based on the worker's persona and operating environment.

#### 2️⃣ Integration Strategy: XGBoost Regression Model
To calculate the final multipliers, we utilize Supervised Learning (XGBoost) to perform Risk Scoring.
* **Data Ingestion (DigiLocker & API):** The system fetches verified age from DigiLocker and location/activity data from the platform.
* **Feature Engineering:** The model processes these inputs to categorize the user. For example, a 26-year-old in a flood-prone Tier-1 city is assigned an `Age Multiplier` of 1.2 and a `Risk Multiplier` of 1.2.
* **Premium Normalization:** The AI identifies "Income Spikes" (e.g., abnormally high earnings during a festival) and normalizes them to prevent the user from being overcharged in their next premium cycle.

#### 3️⃣ Real-Time Dynamic Adjustment Mechanism
Unlike traditional insurance, Haven’s AI continuously revises the user's risk profile.
* **Claim History Loading:** If the Isolation Forest fraud model confirms a clean record, the user may qualify for **No-Claim Bonus (NCB)** discounts (5%–15%). Conversely, frequent claim behavior may trigger "risk loading," increasing the premium for the next cycle.
* **Geographic Risk Volatility:** If a specific zone sees a sudden increase in disaster frequency (e.g., early monsoon onset), the Haven Server dynamically reclassifies that zone from "Mid" to "High" risk, adjusting premiums prospectively.

## 🕵️‍♂️ 6. Fraud Detection

<br><br><br>

---

## 💻 7. Tech Stack

### 📱 User App

| Category | Technology |
| :--- | :--- |
| **Framework** | React Native 0.74 (Expo SDK 51) |
| **Language** | TypeScript |
| **State** | Zustand 4.x |
| **Navigation** | Expo Router v3 |
| **Identity/Security** | Expo Camera & Biometrics |
| **Communication** | Firebase FCM & Expo Notifications |
| **UI/UX** | Lottie & Reanimated |

### 🛠️ Admin Panel

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS & shadcn/ui |
| **Data Fetching** | TanStack Query v5 |
| **Analytics** | Recharts |
| **Auth** | NestJS Admin JWT |
| **Hosting** | Firebase Hosting |

### 🌐 Backend Server

| Category | Technology |
| :--- | :--- |
| **Runtime** | Node.js 20 LTS (NestJS 10) |
| **Database** | Supabase (PostgreSQL) |
| **Scheduler** | @nestjs/schedule (CRON) |
| **External APIs** | OpenWeatherMap & WAQI |
| **CI/CD** | GitHub Actions & Railway |
| **Validation** | Zod |

---
