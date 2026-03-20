<div align="center" style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
  <h1 style="font-family: 'Trebuchet MS', sans-serif; letter-spacing: 8px;">H A V E N</h1>
  <p><strong style="font-family: 'Garamond', 'Times New Roman', serif; letter-spacing: 1px;">PARAMETRIC INCOME PROTECTION FOR THE GIG ECONOMY</strong></p>
  <br>
  <p>An automated, data-driven insurance ecosystem designed to protect India's 12-million-strong gig workforce.</p>
  <p style="font-family: 'Courier New', monospace; font-size: 0.95em; color: #2c3e50;"><strong>[ Persona Focus: Food Delivery Partners (Swiggy) ]</strong></p>
</div>

---

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
  <strong style="font-family: 'Courier New', monospace; font-weight: 800;">CORE DIRECTIVE</strong>
</div>
<blockquote style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-size: 1.05em; border-left: 4px solid #34495e; padding-left: 10px;">
By moving away from traditional indemnity insurance and adopting a <strong>Parametric Trigger</strong> model, Haven ensures that delivery partners and gig workers receive instant financial support when environmental disasters or social disruptions prevent them from earning.
</blockquote>

---

<h3 style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">I. THE PROBLEM & PERSONA SCENARIOS</h3>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">THE "INCOME GAP" REALITY</strong>
<p>Traditional insurance requires physical damage and long claim cycles. For a gig worker, "damage" isn't just a broken bike; it is a 6-hour rainstorm or a local strike that makes the road inaccessible.</p>
<blockquote><strong>"NO WORK = NO PAY"</strong> — If they don't ride, they don't eat.</blockquote>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">SCENARIO A: THE HIGH-INTENSITY PROFESSIONAL</strong>
<ul>
  <li><strong>Target:</strong> Rajesh, 34 (Full-time delivery partner, Chennai — High-Risk Zone)</li>
  <li><strong>Trigger Event:</strong> Sudden cyclone causes waterlogging for 8+ hours.</li>
  <li><strong>Resolution:</strong> Rajesh is enrolled in <strong>Plan 3</strong>. Since the disruption is verified by the system as >6 hours, Haven automatically triggers a <strong>100% daily income replacement</strong> to his bank account by evening. No forms, no calls.</li>
</ul>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">SCENARIO B: THE SUPPLEMENTAL EARNER</strong>
<ul>
  <li><strong>Target:</strong> Anjali, 22 (Student working part-time, Indore — Medium-Risk Zone)</li>
  <li><strong>Trigger Event:</strong> Local protest blocks major delivery hubs for an entire afternoon.</li>
  <li><strong>Resolution:</strong> Anjali is on <strong>Plan 1</strong>. Her dashboard alerts her that the zone is "Disrupted." After the 6-hour threshold is met, she seamlessly receives <strong>70% of her average daily earnings</strong>, covering her lost shift.</li>
</ul>

</div>

---

<h3 style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">II. END-TO-END USER WORKFLOW</h3>

<div align="center">
  <img src="workflow-labelled.png" alt="Haven Insurance Onboarding Journey" width="800"/>
</div>
<br>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">

<table width="100%">
  <tr>
    <td width="20%" align="center" valign="middle">
      <img src="https://img.shields.io/badge/01-PLATFORM_AUTH-007EC6?style=for-the-badge" alt="Platform Auth">
    </td>
    <td width="80%" valign="top">
      The worker installs Haven. The first gate is Platform Verification. The user enters their unique ID from platforms like Swiggy or Zomato. The app connects to our Mock Swiggy App(for data source we created it) API to verify active status and historical earning data.
    </td>
  </tr>
  <tr>
    <td align="center" valign="middle">
      <img src="https://img.shields.io/badge/02-DIGILOCKER_KYC-8E44AD?style=for-the-badge" alt="DigiLocker KYC">
    </td>
    <td valign="top">
      Haven integrates with DigiLocker for seamless KYC. We fetch verified Name, DOB, Gender, and PAN. This data feeds into the AI Risk Engine to determine age-based multipliers and ensure eligibility (20+).
    </td>
  </tr>
  <tr>
    <td align="center" valign="middle">
      <img src="https://img.shields.io/badge/03-DYNAMIC_PLANS-27AE60?style=for-the-badge" alt="Dynamic Plans">
    </td>
    <td valign="top">
      The user is presented with three tailored plans. The premiums are dynamic—calculated via custom pricing based on average daily salary and primary operating zone risk level.
    </td>
  </tr>
  <tr>
    <td align="center" valign="middle">
      <img src="https://img.shields.io/badge/04-BANK_&_MPIN-F39C12?style=for-the-badge" alt="Bank & MPIN">
    </td>
    <td valign="top">
      The user provides bank account details auto-payouts and sets a secure 6-digit MPIN for high-level policy changes or sensitive logs.
    </td>
  </tr>
  <tr>
    <td align="center" valign="middle">
      <img src="https://img.shields.io/badge/05-LIVENESS_&_SIGNING-16A085?style=for-the-badge" alt="Liveness & Signing">
    </td>
    <td valign="top">
      Before policy activation:<br>
      • <em>Liveness Check:</em> AI verifies user authenticity against the DigiLocker ID.<br>
      • <em>Virtual Signing:</em> Digital acceptance of Terms & Conditions via secure gesture signature.
    </td>
  </tr>
  <tr>
    <td align="center" valign="middle">
      <img src="https://img.shields.io/badge/06-PERSONA_DASHBOARD-2980B9?style=for-the-badge" alt="Persona Dashboard">
    </td>
    <td valign="top">
      Displays <code>[ SAFE ]</code> vs. <code>[ HIGH RISK ]</code> status in real-time. If a parametric event triggers, a deterministic progress bar displays the countdown to the 6-hour payout lock-in.
    </td>
  </tr>
</table>
</div>

---

<h3 style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">III. PREMIUM PLANS</h3>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">

| Plan Tier | Base Rate | Payout | Waiting Period | Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Plan 1 (Economy)** | `7%` | **70%** | 2 Weeks | Budget-friendly safety net. |
| **Plan 2 (Value)** | `10%` | **100%** | 4 Weeks | Full income replacement for veterans. |
| **Plan 3 (Elite)** | `20%` | **100%** | *Zero* | Immediate, high-priority protection. |

</div>

---

<h3 style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">IV. PARAMETRIC TRIGGERS</h3>

<p style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-style: italic;">(Data definitions pending)</p>

<br>

<h3 style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">V. AI/ML INTEGRATION</h3>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">AI-DRIVEN PREMIUM CALCULATION</strong>
<p>The core of Haven’s financial logic is the Automated Actuarial Engine, outputting weekly premiums using a multi-variable formula driven by real-time data ingestion.</p>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">A. THE DYNAMIC PRICING FORMULA</strong>
<p>Every premium is custom-generated at the start of the billing cycle:</p>

<pre style="background: #f8f9fa; padding: 10px; border-left: 4px solid #34495e;">
<code>Premium = Avg Daily Salary × Base Rate × Risk Multiplier × Age Multiplier</code>
</pre>

<ul>
  <li><strong>Avg Daily Salary (Feature Base):</strong> AI analyzes a 7–30 day lookback period of transaction records from the Mock Swiggy API as the income baseline.</li>
  <li><strong>Base Rate (Plan Selection):</strong> Auto-assigned based on chosen plan (7% for P1, 10% for P2, 20% for P3).</li>
  <li><strong>Risk & Age Multipliers (ML Weights):</strong> Dynamic weights predicted by our <strong>XGBoost Regression</strong> model utilizing persona and operating environment data.</li>
</ul>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">B. XGBOOST REGRESSION MODEL INTEGRATION</strong>
<p>Supervised Learning (XGBoost) calculates final Risk Scoring multipliers.</p>
<ul>
  <li><strong>Data Ingestion:</strong> System fetches verified age (DigiLocker) and location/activity (Platform API).</li>
  <li><strong>Feature Engineering:</strong> Model categorizes inputs. Example: A 26-year-old in a flood-prone Tier-1 city receives an Age Multiplier of <code>1.2</code> and Risk Multiplier of <code>1.2</code>.</li>
  <li><strong>Premium Normalization:</strong> AI isolates "Income Spikes" (e.g., festival earnings) to normalize the dataset, preventing overcharging in the next premium cycle.</li>
</ul>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">C. REAL-TIME DYNAMIC ADJUSTMENT</strong>
<p>Unlike static policies, Haven’s AI continuously revises risk profiles.</p>
<ul>
  <li><strong>Claim History Loading:</strong> Isolation Forest fraud modeling confirms clean records, qualifying users for <strong>No-Claim Bonus (NCB)</strong> discounts (5%–15%). Frequent claim behavior triggers risk loading premiums.</li>
  <li><strong>Geographic Risk Volatility:</strong> High-frequency disaster spikes trigger deterministic reclassification by the Haven Server (e.g., <code>Mid</code> -> <code>High</code> risk), adjusting premiums prospectively.</li>
</ul>
</div>

<br>

<h3 style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">VI. FRAUD DETECTION</h3>

<p style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-style: italic;">(System architecture pending)</p>

<br>

---

<h3 style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">VII. TECHNOLOGY STACK</h3>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">USER APP (Client Interface)</strong>

| Category | Technology |
| :--- | :--- |
| **Framework** | React Native 0.74 (Expo SDK 51) |
| **Language** | TypeScript |
| **State** | Zustand 4.x |
| **Navigation** | Expo Router v3 |
| **Identity/Security** | Expo Camera & Biometrics |
| **Communication** | Firebase FCM & Expo Notifications |
| **UI/UX** | Lottie & Reanimated |

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">ADMIN PANEL (Actuarial Portal)</strong>

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS & shadcn/ui |
| **Data Fetching** | TanStack Query v5 |
| **Analytics** | Recharts |
| **Auth** | NestJS Admin JWT |
| **Hosting** | Firebase Hosting |

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">BACKEND ENGINE</strong>

| Category | Technology |
| :--- | :--- |
| **Runtime** | Node.js 20 LTS (NestJS 10) |
| **Database** | Supabase (PostgreSQL) |
| **Scheduler** | @nestjs/schedule (CRON) |
| **External APIs** | OpenWeatherMap & WAQI |
| **CI/CD** | GitHub Actions & Railway |
| **Validation** | Zod |

</div>

---

<h3 style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">VIII. PLATFORM CHOICES JUSTIFICATION</h3>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">NATIVE MOBILE (User App)</strong>
<p>The delivery partner's workplace is the road, not a desk. A native mobile application is the only viable interface for this demographic.</p>
<ul>
  <li><strong>Hardware Sensors:</strong> Native GPS is mandatory for "Proof of Presence" to trigger parametric payouts. Local Camera access enables required AI-driven liveness checks to prevent identity fraud.</li>
</ul>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">WEB PORTAL (Admin Panel)</strong>
<ul>
  <li><strong>Data Density:</strong> Managing 12 million global profiles requires high-resolution Risk Heatmaps and Recharts analytics—only effective on large desktop displays.</li>
  <li><strong>Actuarial Management:</strong> Adjusting XGBoost weights, reviewing insurance pool solvency, and generating manual trigger overrides demand a secure, high-speed input web environment.</li>
</ul>

</div>
