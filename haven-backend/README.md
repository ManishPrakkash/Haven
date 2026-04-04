# 🛡️ Haven: Zero-Trust Parametric Insurance Engine
### *The decentralized backbone for next-generation risk mitigation.*

![Haven Banner](https://img.shields.io/badge/Status-v1.2--CLOUD-blue.svg?style=for-the-badge&logo=nestJS)
![Node.js](https://img.shields.io/badge/Node.js-v18+-6DA55F.svg?style=for-the-badge&logo=node.js)
![Redis](https://img.shields.io/badge/Redis-Upstash-DC382D.svg?style=for-the-badge&logo=redis)
![Supabase](https://img.shields.io/badge/Supabase-DB%20%26%20Auth-3ECF8E.svg?style=for-the-badge&logo=supabase)

---

## 🌟 Overview

**Haven** is a high-availability, decentralized backend engine built with NestJS. It revolutionizes the insurance industry by automating claims validation and payouts using **parametric triggers** (e.g., extreme weather events). 

By combining **Supabase** (Permanent Ledger) with **Upstash Serverless Redis** (Real-time Coordination), Haven achieves a stateless, cloud-native architecture that is both highly resilient and zero-trust.

---

## 🧠 System Intelligence & Implementation

### ☁️ 1. Stateless Cloud Infrastructure
We have transitioned from local Docker dependencies to a **100% Serverless Cloud Stack**.
*   **Centralized Source of Truth**: All policies, claims, and identities are managed by **Supabase**.
*   **Real-time Neural Network**: **Upstash Redis** handles high-speed distributed locking and the BullMQ job queue.
*   **Portability**: Zero local setup. Run on any machine with just an `.env` file.

### 🛡️ 2. The Zero-Trust Fraud Engine
Haven implements a rigorous, multi-layered verification pipeline for every claim:
-   **Layer 1: Binary Veto**: Validation of policy status and waiting periods.
-   **Layer 2: Geo-Velocity Intelligence**: Uses **H3 Hexagonal Spatial Indexing** to detect "Impossible Move" fraud (e.g., a policyholder claiming from two different states simultaneously).
-   **Layer 3: Peer Corroboration**: Claims are cross-referenced with other users in the same H3 cell. Legitimate events require consensus from multiple sources.

### 🌦️ 3. Multi-Source Weather Consensus
Haven does not trust a single data point.
*   **Dynamic Scrapers**: It cross-references data from OpenWeatherMap and secondary meteorological APIs to calculate a **Consensus Score**.
*   **Trust Guard**: Only claims with a **Consensus Score > 0.8** are automatically processed for payout. All others are flagged for manual review.

### ⚡ 4. Asynchronous Pipeline (BullMQ)
Processing extreme logic at scale requires non-blocking execution.
*   **The Producer**: The API accepts claims in **<10ms**, instantly returning a tracking ID.
*   **The Consumer**: A background worker cluster picks up the job and executes the full fraud-check suite.
*   **Exponential Backoff**: If external APIs are down, the worker intelligently retries with increasing delays, ensuring zero job loss.

---

## 🚀 Getting Started

### 1. Environment Configuration
Ensure your `.env` contains the specialized cloud connection strings:

```bash
# Core Port
PORT=3000

# Cloud Database & Auth (Supabase)
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_KEY

# Serverless Global Redis (Upstash)
REDIS_URL=rediss://default:YOUR_PASSWORD@YOUR_UPSTASH_HOST:6379

# Intelligence APIs
OWM_API_KEY=YOUR_OPENWEATHERMAP_KEY
```

### 2. Rapid Deployment
```bash
# 📦 Install Dependencies
npm install

# 🚀 Start Production-Ready Dev Server
npm run start:dev
```

---

## 📡 API Architecture

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/claims` | Submit a claim to the Async Queue |
| `GET` | `/policy/:id` | Fetch live coverage and status |
| `GET` | `/weather/consensus` | View verified rain/temp data |
| `POST` | `/payout/manual` | (Admin Only) Override automated veto |

---

## 📜 Version History

> [!NOTE]
> **v1.2-CLOUD (Current Branch)**:
> - Full transition to Upstash Serverless Redis.
> - Removal of all local Docker/Mock logic.
> - Implemented H3 Spatial Geo-Velocity Fraud Checks.
> - Integrated SSL/TLS Cloud connection strings.

---

> [!TIP]
> **Production Ready?** Yes. The architecture is now **Stateless, Self-Healing, and Scalable.**

---
#### *Developed with ❤️ by the Haven Core Team.*
