<div align="center">

  <!-- Banner -->
  <img src="banner.png" alt="HAVEN — Parametric Income Protection for the Gig Economy" width="100%" />

  <br/>

  <p><em>An automated, data-driven insurance ecosystem designed to protect India's 12-million-strong gig workforce.</em></p>

</div>

---

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
  <strong style="font-family: 'Courier New', monospace; font-weight: 800;">CORE DIRECTIVE</strong>
</div>
<blockquote style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-size: 1.05em; border-left: 4px solid #34495e; padding-left: 10px;">
By moving away from traditional indemnity insurance and adopting a <strong>Parametric Trigger</strong> model, Haven ensures that delivery partners and gig workers receive instant financial support when environmental disasters or social disruptions prevent them from earning.
</blockquote>

<br/>

<!-- ───────────────────── TABLE OF CONTENTS ───────────────────── -->

<details open>
<summary><strong>📑 Table of Contents</strong></summary>

<br/>

| # | Section | Description |
|:---:|:---|:---|
| Ⅰ | [The Problem & Persona Scenarios](#i-the-problem--persona-scenarios) | The income-gap crisis facing gig workers |
| Ⅱ | [Demo](#ii-demo) | Live product demonstration |
| Ⅲ | [End-to-End User Workflow (Onboarding)](#iii-end-to-end-user-workflow-onboarding) | Step-by-step onboarding journey |
| Ⅳ | [Premium Plans](#iv-premium-plans) | Tiered pricing — Economy, Value & Elite |
| Ⅴ | [Platform Choices Justification](#v-platform-choices-justification) | Why native mobile + web portal |
| Ⅵ | [Parametric Triggers](#vi-parametric-triggers) | Event-based automated payout logic |
| Ⅶ | [AI/ML Integration](#vii-aiml-integration) | XGBoost pricing & dynamic risk models |
| Ⅷ | [Adversarial Defence & Anti-Spoofing](#viii-adversarial-defence--anti-spoofing) | System resilience against manipulation |
| Ⅸ | [Fraud Detection](#ix-fraud-detection) | Isolation Forest anomaly detection |
| Ⅹ | [Technology Stack](#x-technology-stack) | Full-stack architecture overview |
| Ⅺ | [Development Plan](#xi-development-plan) | Roadmap & milestones |

</details>

---

<h3 id="i-the-problem--persona-scenarios" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">I. THE PROBLEM & PERSONA SCENARIOS</h3>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">THE "INCOME GAP" REALITY</strong>
<p>Traditional insurance requires physical damage and long claim cycles. For a gig worker, "damage" isn't just a broken bike; it is a 6-hour rainstorm or a local strike that makes the road inaccessible.</p>
<blockquote><strong>"NO WORK = NO PAY"</strong> — If they don't ride, they don't eat.</blockquote>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">SCENARIO A: THE HIGH-INTENSITY PROFESSIONAL</strong>
<ul style="margin-top: 5px; line-height: 1.6; color: #34495e;">
  <li><strong>Target Persona:</strong> Rajesh, 34 (Full-time delivery partner, Chennai — High-Risk Zone). Rajesh works 6 days a week to support his family; if he misses a day on the road, he misses a day of critical pay.</li>
  <li><strong>Trigger Event:</strong> A severe, unseasonal cyclone hits the coast, causing sudden and deep waterlogging across his primary operating zone. It becomes physically impossible to complete deliveries safely for over 8 hours.</li>
  <li><strong>Resolution:</strong> Rajesh is actively enrolled in <strong>Plan 3 (Elite)</strong>. Because Haven's parametric API autonomously detects the severe weather lockdown passing the 6-hour threshold, it instantly authorizes a payout. By the evening, a <strong>100% replacement of his average daily income</strong> is deposited directly into his bank account. Zero claim forms, zero phone calls, zero financial stress.</li>
</ul>

<br>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">SCENARIO B: THE SUPPLEMENTAL EARNER</strong>
<ul style="margin-top: 5px; line-height: 1.6; color: #34495e;">
  <li><strong>Target Persona:</strong> Anjali, 22 (University student working part-time, Indore — Medium-Risk Zone). Anjali rides just 3 days a week to supplement her tuition fees and relies on those specific shifts.</li>
  <li><strong>Trigger Event:</strong> An unexpected local political protest breaks out near the city center, blocking major commercial logistics hubs for the entire afternoon and resulting in a sudden city-wide lockdown for gig transit.</li>
  <li><strong>Resolution:</strong> Anjali is protected by <strong>Plan 1 (Economy)</strong>. Her app dashboard immediately flags her zone with a "Disrupted" status. Once the 6-hour commercial lockdown is officially met, she seamlessly receives <strong>70% of her anticipated daily earnings</strong> without ever interacting with a human agent, effortlessly covering the shift she lost.</li>
</ul>

</div>

---

<h3 id="ii-demo" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">II. DEMO</h3>

<p style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-style: italic;">(Demo video / link coming soon)</p>

---

<h3 id="iii-end-to-end-user-workflow-onboarding" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">III. END-TO-END USER WORKFLOW (ONBOARDING)</h3>

<div align="center">
  <img src="workflow-labelled.png" alt="Haven Insurance Onboarding Journey" width="800"/>
</div>
<br>

---

<h3 id="iv-premium-plans" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">IV. PREMIUM PLANS</h3>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">PLAN 1: ECONOMY (SAFETY NET)</strong>
<ul style="margin-top: 8px; margin-bottom: 16px; font-size: 0.95em; padding-left: 20px; line-height: 1.6;">
  <li>Budget-conscious workers seeking a low-cost entry point for basic protection.</li>
  <li><strong>70%</strong> of your average daily income replacement.</li>
  <li><strong>2 weeks</strong> standard activation period.</li>
</ul>

| Age Band | Avg Daily Salary | Base Rate | Risk Zone | Weekly Premium | Daily Payout | Waiting Time |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 20 - 25 | ₹600 | 7% | Low | ₹42 | ₹420 | 2 Weeks |
| 20 - 25 | ₹600 | 7% | Mid | ₹46 | ₹420 | 2 Weeks |
| 20 - 25 | ₹600 | 7% | High | ₹50 | ₹420 | 2 Weeks |
| 26 - 40 | ₹900 | 7% | Low | ₹76 | ₹630 | 2 Weeks |
| 26 - 40 | ₹900 | 7% | Mid | ₹83 | ₹630 | 2 Weeks |
| 26 - 40 | ₹900 | 7% | High | ₹91 | ₹630 | 2 Weeks |
| 40+ | ₹1,200 | 7% | Low | ₹126 | ₹840 | 2 Weeks |
| 40+ | ₹1,200 | 7% | Mid | ₹139 | ₹840 | 2 Weeks |
| 40+ | ₹1,200 | 7% | High | ₹151 | ₹840 | 2 Weeks |

<br>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">PLAN 2: VALUE (INCOME REPLACEMENT)</strong>
<ul style="margin-top: 8px; margin-bottom: 16px; font-size: 0.95em; padding-left: 20px; line-height: 1.6;">
  <li>Full-time professionals who depend entirely on their gig earnings for their livelihood.</li>
  <li><strong>100%</strong> of your average daily income replacement.</li>
  <li><strong>4 weeks</strong> standard activation period.</li>
</ul>

| Age Band | Avg Daily Salary | Base Rate | Risk Zone | Weekly Premium | Daily Payout | Waiting Time |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 20 - 25 | ₹600 | 10% | Low | ₹60 | ₹600 | 4 Weeks |
| 20 - 25 | ₹600 | 10% | Mid | ₹66 | ₹600 | 4 Weeks |
| 20 - 25 | ₹600 | 10% | High | ₹72 | ₹600 | 4 Weeks |
| 26 - 40 | ₹900 | 10% | Low | ₹108 | ₹900 | 4 Weeks |
| 26 - 40 | ₹900 | 10% | Mid | ₹119 | ₹900 | 4 Weeks |
| 26 - 40 | ₹900 | 10% | High | ₹130 | ₹900 | 4 Weeks |
| 40+ | ₹1,200 | 10% | Low | ₹180 | ₹1,200 | 4 Weeks |
| 40+ | ₹1,200 | 10% | Mid | ₹198 | ₹1,200 | 4 Weeks |
| 40+ | ₹1,200 | 10% | High | ₹216 | ₹1,200 | 4 Weeks |

<br>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">PLAN 3: ELITE (IMMEDIATE PROTECTION)</strong>
<ul style="margin-top: 8px; margin-bottom: 16px; font-size: 0.95em; padding-left: 20px; line-height: 1.6;">
  <li>High-intensity workers in volatile or high-risk zones who need immediate financial resilience.</li>
  <li><strong>100%</strong> of your average daily income replacement.</li>
  <li><strong>0 days</strong> (Instant activation the moment you sign the policy).</li>
</ul>

| Age Band | Avg Daily Salary | Base Rate | Risk Zone | Weekly Premium | Daily Payout | Waiting Time |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 20 - 25 | ₹600 | 20% | Low | ₹120 | ₹600 | 0 Days |
| 20 - 25 | ₹600 | 20% | Mid | ₹132 | ₹600 | 0 Days |
| 20 - 25 | ₹600 | 20% | High | ₹144 | ₹600 | 0 Days |
| 26 - 40 | ₹900 | 20% | Low | ₹216 | ₹900 | 0 Days |
| 26 - 40 | ₹900 | 20% | Mid | ₹238 | ₹900 | 0 Days |
| 26 - 40 | ₹900 | 20% | High | ₹259 | ₹900 | 0 Days |
| 40+ | ₹1,200 | 20% | Low | ₹360 | ₹1,200 | 0 Days |
| 40+ | ₹1,200 | 20% | Mid | ₹396 | ₹1,200 | 0 Days |
| 40+ | ₹1,200 | 20% | High | ₹432 | ₹1,200 | 0 Days |

<br>

<p style="font-size: 0.9em; color: #7f8c8d; font-style: italic; border-left: 3px solid #bdc3c7; padding-left: 10px; margin-top: 20px;">
  <strong>Data Source:</strong> All income benchmarks are derived from research findings at <a href="https://www.thefinthusiastic.com/post/india-gig-economy-all-you-need-to-know" style="color: #2980b9;">The Finthusiastic: India's Gig Economy</a>. These data parameters dictate how we calculate the premiums dynamically.
</p>

</div>

---

<h3 id="v-platform-choices-justification" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">V. PLATFORM CHOICES JUSTIFICATION</h3>

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

---

<h3 id="vi-parametric-triggers" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">VI. PARAMETRIC TRIGGERS</h3>

<p style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-style: italic;">(Data definitions pending)</p>

---

<h3 id="vii-aiml-integration" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">VII. AI/ML INTEGRATION</h3>

<div style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">AI-DRIVEN PREMIUM CALCULATION</strong>
<p>The core of Haven’s financial logic is the Automated Actuarial Engine. Unlike traditional "flat-rate" insurance, Haven calculates a personalized weekly premium by analyzing a worker's specific earning power and environmental risk in real-time.</p>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">1. TERMINOLOGY & DEFINITIONS</strong>
<p style="margin-bottom: 10px;">To ensure mathematical transparency, we define the variables that drive our engine:</p>
<ul style="margin-bottom: 20px;">
  <li><strong>Avg Daily Salary (S<sub>d</sub>):</strong> A 30-day weighted moving average of the worker's earnings, fetched via the Mock Swiggy API. It establishes the baseline income that needs protection.</li>
  <li><strong>Base Rate (R<sub>b</sub>):</strong> The primary percentage assigned based on the user's chosen plan:
    <ul style="margin-top: 5px;">
      <li>Economy (Plan 1): <strong>7%</strong></li>
      <li>Value (Plan 2): <strong>10%</strong></li>
      <li>Elite (Plan 3): <strong>20%</strong></li>
    </ul>
  </li>
  <li><strong>Risk Multiplier (M<sub>r</sub>):</strong> A dynamic weight (1.0x to 1.2x) predicted by our ML model based on the historical disruption frequency of the worker’s primary operating city.</li>
  <li><strong>Age Multiplier (M<sub>a</sub>):</strong> An actuarial weight (1.0x to 1.5x) reflecting risk exposure data correlated with the worker's age bracket (20-25, 26-40, 40+).</li>
</ul>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">2. THE MASTER EQUATION</strong>
<p style="margin-bottom: 10px;">Every premium is custom-generated at the start of the 7-day billing cycle using the following formula:</p>

<div align="center" style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #34495e; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 1.1em; font-weight: 800;">
  Weekly Premium = S<sub>d</sub> × R<sub>b</sub> × M<sub>r</sub> × M<sub>a</sub>
</div>

<strong style="font-family: 'Segoe UI', sans-serif;">Mathematical Walkthrough</strong><br>
<p style="margin-top: 5px;"><strong>Example Persona:</strong> A 28-year-old rider in a "High Risk" zone like Chennai (M<sub>a</sub> = 1.2, M<sub>r</sub> = 1.2) earning an average of ₹900/day, who selects the Value Plan (R<sub>b</sub> = 10%).</p>

<div align="center" style="background: #f8f9fa; padding: 10px; border-radius: 6px; border-left: 4px solid #27ae60; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 1.1em; color: #27ae60; font-weight: 800;">
  ₹900 × 0.10 × 1.2 × 1.2 = ₹129.60 / week
</div>

<p style="margin-bottom: 20px;">This ensures that pricing is mathematically "fair"—workers in safer zones do not subsidize the higher risk of those in volatile metros.</p>

<strong style="font-family: 'Courier New', monospace; font-size: 1.1em; color: #2c3e50; font-weight: 800;">3. THE MACHINE LEARNING ARCHITECTURE</strong>
<p style="margin-bottom: 20px;">We deploy a two-stage predictive pipeline to ensure the inputs are sanitized (free of fraud) and architected (fairly weighted).</p>

<strong style="font-family: 'Segoe UI', sans-serif; color: #2980b9;">Model A: Isolation Forest (The Data Sanitizer)</strong><br>
<em>Role: Unsupervised Anomaly Detection for Income Integrity.</em>
<p style="margin-top: 5px; margin-bottom: 15px;">In decentralized gig work, "Income Inflation" is a structural risk where users might attempt to fake high-value transactions to secure higher insurance payouts. Isolation Forest is our first line of defense, identifying these "Pump and Dump" schemes by explicitly isolating anomalies rather than profiling normal behavior.</p>

<p><strong>Technical Implementation:</strong> We represent each user’s income profile as a feature vector x ∈ ℝ<sup>4</sup>:</p>

<div align="center" style="background: #f8f9fa; padding: 10px; border-radius: 6px; border-left: 4px solid #34495e; margin: 15px 0; font-family: 'Courier New', monospace; font-weight: 800;">
  x = [Daily Earnings, Order Count, Avg Order Value, Peak Frequency]
</div>

<ul>
  <li><strong>Recursive Partitioning:</strong> The model builds an ensemble of iTrees. Because fraudulent "spikes" are few and different, they are isolated in very few splits, resulting in a short Path Length h(x).</li>
  <li><strong>Anomaly Scoring:</strong> We calculate the score s(x, n) to determine if the income data is "truthful":</li>
</ul>

<div align="center" style="background: #f8f9fa; padding: 10px; border-radius: 6px; border-left: 4px solid #34495e; margin: 15px 0; font-family: 'Courier New', monospace; font-weight: 800;">
  s(x, n) = 2<sup>-[E(h(x)) / c(n)]</sup>
</div>

<p style="margin-bottom: 30px;"><strong>Outcome:</strong> If s → 1 (High Anomaly), the system ignores the reported S<sub>d</sub> and normalizes it to the 90th Percentile Median for that worker's city tier, protecting the insurance pool's liquidity.</p>


<strong style="font-family: 'Segoe UI', sans-serif; color: #2980b9;">Model B: XGBoost Regression (The Risk Architect)</strong><br>
<em>Role: Supervised Non-Linear Risk Scoring.</em>
<p style="margin-top: 5px; margin-bottom: 15px;">Once the data is sanitized, XGBoost (Extreme Gradient Boosting) calculates the specific Risk (M<sub>r</sub>) and Age (M<sub>a</sub>) multipliers. We use XGBoost because the relationship between age, city density, and risk is non-linear—a 10% increase in age does not result in a flat 10% change in risk.</p>

<p><strong>Architectural Design:</strong> Even without a finalized live training set, the model is architected to minimize a Regularized Objective Function, ensuring premiums remain stable across diverse urban clusters.</p>

<div align="center" style="background: #f8f9fa; padding: 10px; border-radius: 6px; border-left: 4px solid #34495e; margin: 15px 0; font-family: 'Courier New', monospace; font-weight: 800;">
   L(Φ) = Σ l(ŷ<sub>i</sub>, y<sub>i</sub>) + Σ Ω(f<sub>k</sub>)
</div>

<ul style="margin-bottom: 15px;">
  <li><strong>Gradient Boosting:</strong> The model builds additive trees sequentially, where each new tree corrects the "residual errors" (pricing mistakes) of the previous trees using a second-order Taylor expansion for high-precision convergence.</li>
  <li><strong>Regularization (Ω):</strong> We apply L1/L2 regularization to prevent the model from "overfitting" to a single freak weather event. This ensures that a flood in Chennai doesn't unfairly skyrocket premiums for every worker in the region.</li>
</ul>

<p><strong>Outcome:</strong> The final leaves of the trees provide the precise numerical weights (M<sub>r</sub>, M<sub>a</sub>) fed directly into our master formula.</p>
</div>

---

<h3 id="viii-adversarial-defence--anti-spoofing" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">VIII. ADVERSARIAL DEFENCE & ANTI-SPOOFING</h3>

<p style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-style: italic;">(Architecture pending)</p>

---

<h3 id="ix-fraud-detection" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">IX. FRAUD DETECTION</h3>

<p style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-style: italic;">(System architecture pending)</p>

---

<h3 id="x-technology-stack" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">X. TECHNOLOGY STACK</h3>

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

<h3 id="xi-development-plan" style="font-family: Verdana, Geneva, sans-serif; font-weight: 600; letter-spacing: 1px;">XI. DEVELOPMENT PLAN</h3>

<p style="font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; font-style: italic;">(Roadmap & milestones pending)</p>
