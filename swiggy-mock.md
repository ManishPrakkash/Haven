# SwiggyMock Delivery Partner App — Complete Development Guide
### React Native · Expo · Supabase Direct · Swiggy Orange Theme · Phase 1 → Production

---

## TABLE OF CONTENTS

1. [App Purpose & Scope](#1-app-purpose--scope)
2. [Design System](#2-design-system)
3. [Bootstrap & Project Setup](#3-bootstrap--project-setup)
4. [Folder Structure](#4-folder-structure)
5. [Supabase Integration Layer](#5-supabase-integration-layer)
6. [State Management](#6-state-management)
7. [Navigation Setup](#7-navigation-setup)
8. [Screen-by-Screen Implementation](#8-screen-by-screen-implementation)
9. [Shared Components](#9-shared-components)
10. [Edge Cases & Error Handling](#10-edge-cases--error-handling)
11. [APK Build & Distribution](#11-apk-build--distribution)
12. [Testing Checklist](#12-testing-checklist)

---

## 1. APP PURPOSE & SCOPE

### What SwiggyMock Is
SwiggyMock is a **data simulator disguised as the Swiggy Delivery Partner app**. It looks and behaves exactly like the real Swiggy Delivery Partner app but contains no real server connection. Its only job is to write data to shared Supabase tables so the Haven Insurance app can read it.

### What SwiggyMock Writes to Supabase (Only These — Nothing Else)
| User Action | Supabase Write | Haven App Impact |
|---|---|---|
| Select worker profile | `mock_platform_workers.is_selected = true` | Dashboard loads that worker's data |
| Toggle Go Online | `delivery_sessions.is_online = true/false` | Online status in Haven |
| Sync activity sliders | `delivery_sessions.hours_worked/earnings/deliveries` | Risk score and recommendation changes |
| Tap any disruption button | INSERT into `trigger_events` | Haven auto-creates claim if policy is ACTIVE |
| Tap Clear All | UPDATE `trigger_events.is_active = false` | Trigger cleared in Haven |
| Accept/complete delivery | UPDATE `delivery_sessions.deliveries++` | Delivery count in Haven dashboard |

### What SwiggyMock Does NOT Do
- No authentication (no OTP, no login — opens directly to profile selector)
- No real Swiggy server connection
- No real GPS tracking
- No real order assignment
- No real payment processing
- No calls to Haven Server (NestJS) — only Supabase direct writes

### Supabase Direct Access Rules
SwiggyMock is the **only** client app allowed to write to Supabase directly.  
It writes to these tables only: `mock_platform_workers`, `delivery_sessions`, `trigger_events`  
It never reads or writes: `haven_users`, `policies`, `claims`, `payouts`, `insurance_plans`

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette (Exact Swiggy Values — Never Deviate)

```typescript
// constants/colors.ts
export const SwiggyColors = {
  // Brand
  primary:          '#FC8019',  // Swiggy Orange — all CTAs, earnings, active icons
  primaryDark:      '#E8701A',  // Pressed state
  primaryLight:     '#FFF3EB',  // Card backgrounds, selected states
  
  // Backgrounds
  background:       '#F0F0F5',  // Scaffold — slightly cool grey, NOT pure white
  card:             '#FFFFFF',  // All cards, bottom sheets
  
  // Text
  textPrimary:      '#1A1A1A',  // Headings, earnings, worker name
  textSecondary:    '#686B78',  // Subtitles, labels, distances
  textDisabled:     '#93959F',  // Disabled states
  textHint:         '#B6B7BD',  // Placeholder text
  
  // Status
  online:           '#3AB04B',  // Go online toggle, success ticks
  onlineBg:         '#EBF8EE',  // Online card background
  offline:          '#E23744',  // Offline/reject states
  offlineBg:        '#FFF0F0',  // Offline card background
  
  // UI
  divider:          '#E9E9EB',  // List dividers
  border:           '#F0F0F0',  // Card borders
  shadow:           '#00000015', // Elevation 2 shadow
  
  // Disruption button accents
  rain:             '#1565C0',  // Heavy Rain — blue
  aqi:              '#5D4037',  // Poor AQI — brown/grey
  heat:             '#BF360C',  // Heat Wave — deep orange/red
  outage:           '#E23744',  // App Outage — red
  curfew:           '#F57C00',  // Curfew — amber
  
  // Stars
  star:             '#F3B814',
  
  // Notification badge
  badge:            '#F88531',
};
```

### 2.2 Typography
```typescript
// constants/typography.ts
export const Typography = {
  // Display — earnings amount
  earningsLarge: { fontSize: 32, fontWeight: '700', fontFamily: 'Roboto' },
  // Headlines
  screenTitle:   { fontSize: 22, fontWeight: '600', fontFamily: 'Roboto' },
  cardTitle:     { fontSize: 18, fontWeight: '600', fontFamily: 'Roboto' },
  sectionTitle:  { fontSize: 16, fontWeight: '600', fontFamily: 'Roboto' },
  // Body
  bodyLarge:     { fontSize: 16, fontWeight: '400', fontFamily: 'Roboto' },
  bodyMedium:    { fontSize: 14, fontWeight: '400', fontFamily: 'Roboto' },
  bodySmall:     { fontSize: 13, fontWeight: '400', fontFamily: 'Roboto' },
  // Labels
  labelOrange:   { fontSize: 13, fontWeight: '500', color: '#FC8019', fontFamily: 'Roboto' },
  labelGrey:     { fontSize: 12, fontWeight: '400', color: '#686B78', fontFamily: 'Roboto' },
  caption:       { fontSize: 11, fontWeight: '400', color: '#93959F', fontFamily: 'Roboto' },
};
```

### 2.3 Component Standards
- All cards: `borderRadius: 12, elevation: 2, backgroundColor: '#FFFFFF'`
- Buttons: `borderRadius: 8, height: 48` for primary, `height: 44` for secondary
- Bottom nav: `height: 60, backgroundColor: '#FFFFFF', elevation: 8`
- Status bar: dark icons (`barStyle: 'dark-content'`) on all screens except Splash

---

## 3. BOOTSTRAP & PROJECT SETUP

### 3.1 Create Project
```bash
npx create-expo-app swiggy-mock-app --template blank-typescript
cd swiggy-mock-app
```

### 3.2 Install All Dependencies
```bash
# Navigation
npx expo install expo-router
npx expo install react-native-safe-area-context react-native-screens

# UI and Animation
npx expo install react-native-reanimated react-native-gesture-handler
npx expo install expo-font expo-splash-screen expo-status-bar

# Storage (for persisting selected worker)
npx expo install @react-native-async-storage/async-storage

# Supabase (direct DB access)
npm install @supabase/supabase-js

# State management
npm install zustand

# Charts (earnings bar chart)
npm install react-native-chart-kit
npx expo install react-native-svg

# Network state
npx expo install @react-native-community/netinfo

# Connectivity
npx expo install expo-network

# Icons
npx expo install @expo/vector-icons
```

### 3.3 package.json Main Entry
```json
{
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "build:preview": "eas build --platform android --profile preview"
  }
}
```

### 3.4 app.json Configuration
```json
{
  "expo": {
    "name": "Swiggy Delivery",
    "slug": "swiggy-mock-delivery",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "swiggy-mock",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FC8019"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#FC8019"
      },
      "package": "com.gigshield.swiggymock",
      "minSdkVersion": 21,
      "targetSdkVersion": 34
    },
    "plugins": [
      "expo-router",
      "expo-font"
    ]
  }
}
```

### 3.5 Environment Setup
Create `.env` in project root:
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 4. FOLDER STRUCTURE

```
swiggy-mock-app/
├── app/
│   ├── _layout.tsx              # Root layout — font load, error boundary
│   ├── splash.tsx               # Splash screen (2s orange screen)
│   ├── profile-select.tsx       # Worker profile selector (root screen)
│   └── (tabs)/
│       ├── _layout.tsx          # Bottom tab navigator
│       ├── home.tsx             # Earnings + online toggle + zone alerts
│       ├── orders.tsx           # Mock order card + delivery timeline
│       ├── earnings.tsx         # Bar chart + activity sliders + sync
│       ├── performance.tsx      # Rating + metrics + streak badge
│       └── me.tsx               # Worker profile + switch button
│
├── components/
│   ├── cards/
│   │   ├── EarningsSummaryCard.tsx    # Today's earnings hero card
│   │   ├── OnlineToggleCard.tsx       # Go Online / Offline
│   │   ├── ZoneMapCard.tsx            # City map preview
│   │   ├── ZoneAlertsPanel.tsx        # 5 disruption buttons
│   │   └── WorkerProfileCard.tsx      # Profile selector card
│   ├── orders/
│   │   ├── ActiveOrderCard.tsx        # Mock order with accept/reject
│   │   └── DeliveryTimeline.tsx       # 3-step delivery progress
│   ├── charts/
│   │   └── WeeklyBarChart.tsx         # Earnings bar chart
│   ├── shared/
│   │   ├── SwiggyAppBar.tsx           # Custom app bar with logo + city
│   │   ├── StatChip.tsx               # Delivery count / hours / rating chip
│   │   ├── DisruptionButton.tsx       # Individual zone alert button
│   │   ├── SkeletonCard.tsx           # Shimmer loading placeholder
│   │   ├── ErrorBanner.tsx            # Error state with retry
│   │   └── OfflineBanner.tsx          # No internet connection banner
│   └── sliders/
│       └── ActivitySliders.tsx        # Hours/earnings/deliveries sliders
│
├── lib/
│   ├── supabase.ts              # Supabase client + all DB operation functions
│   └── constants.ts            # Worker profiles + trigger mock values
│
├── store/
│   └── worker.store.ts          # Zustand: selected worker + session state
│
├── constants/
│   ├── colors.ts                # Swiggy color palette
│   ├── typography.ts            # Text style presets
│   └── workers.ts               # 4 worker profile constants
│
├── utils/
│   ├── format.ts                # formatCurrency, formatHours
│   └── earnings.ts              # deterministic daily earnings generator
│
├── assets/
│   ├── images/
│   │   ├── icon.png
│   │   ├── splash.png
│   │   ├── worker_ravi.png
│   │   ├── worker_priya.png
│   │   ├── worker_ahmed.png
│   │   └── worker_deepa.png
│   └── icons/
│       └── (svg icons)
│
├── .env
├── app.json
├── eas.json
└── package.json
```

---

## 5. SUPABASE INTEGRATION LAYER

### lib/supabase.ts (Complete — All DB Operations Here)
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Worker Operations ───────────────────────────────────────────────────────

export async function fetchAllWorkers() {
  const { data, error } = await supabase
    .from('mock_platform_workers')
    .select('*')
    .eq('is_active', true)
    .order('profile_index', { ascending: true });
  if (error) throw new Error(`Failed to fetch workers: ${error.message}`);
  return data ?? [];
}

export async function selectWorkerProfile(workerId: string): Promise<void> {
  // Deselect all others first
  const { error: deselErr } = await supabase
    .from('mock_platform_workers')
    .update({ is_selected: false })
    .neq('worker_id', workerId);
  if (deselErr) throw new Error(`Deselect failed: ${deselErr.message}`);

  // Select the chosen worker
  const { error: selErr } = await supabase
    .from('mock_platform_workers')
    .update({ is_selected: true })
    .eq('worker_id', workerId);
  if (selErr) throw new Error(`Select failed: ${selErr.message}`);
}

// ── Session Operations ──────────────────────────────────────────────────────

export async function fetchTodaySession(workerId: string) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('delivery_sessions')
    .select('*')
    .eq('worker_id', workerId)
    .eq('session_date', today)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message); // PGRST116 = no rows
  return data;
}

export async function upsertSession(workerId: string, city: string, cityCode: string, data: {
  hours_worked?: number;
  earnings?: number;
  deliveries?: number;
  is_online?: boolean;
  is_current?: boolean;
}): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const { error } = await supabase
    .from('delivery_sessions')
    .upsert(
      { worker_id: workerId, session_date: today, city, city_code: cityCode, ...data },
      { onConflict: 'worker_id,session_date' }
    );
  if (error) throw new Error(`Session update failed: ${error.message}`);
}

export async function updateOnlineStatus(workerId: string, city: string, cityCode: string, isOnline: boolean): Promise<void> {
  await upsertSession(workerId, city, cityCode, { is_online: isOnline });
}

export async function incrementDelivery(workerId: string, city: string, cityCode: string, payoutAmount: number): Promise<void> {
  const session = await fetchTodaySession(workerId);
  if (!session) {
    await upsertSession(workerId, city, cityCode, { deliveries: 1, earnings: payoutAmount });
    return;
  }
  await upsertSession(workerId, city, cityCode, {
    deliveries: (session.deliveries ?? 0) + 1,
    earnings: (session.earnings ?? 0) + payoutAmount,
  });
}

export async function syncActivityToSupabase(workerId: string, city: string, cityCode: string, data: {
  hours_worked: number; earnings: number; deliveries: number;
}): Promise<void> {
  await upsertSession(workerId, city, cityCode, data);
}

// ── Trigger Operations ──────────────────────────────────────────────────────

const MOCK_TRIGGER_VALUES: Record<string, { measured: number; threshold: number; unit: string }> = {
  RAIN_EXTREME:      { measured: 72.3,  threshold: 64.5, unit: 'mm/24hr' },
  AQI_SEVERE:        { measured: 315.0, threshold: 300,  unit: 'AQI'     },
  HEAT_EXTREME:      { measured: 46.2,  threshold: 45.0, unit: '°C'      },
  PLATFORM_OUTAGE:   { measured: 180.0, threshold: 120,  unit: 'minutes' },
  SOCIAL_DISRUPTION: { measured: 8.0,   threshold: 6.0,  unit: 'hours'   },
};

export async function fireDisruption(triggerType: string, city: string, cityCode: string): Promise<void> {
  // Check if already active (prevent duplicates)
  const { data: existing } = await supabase
    .from('trigger_events')
    .select('id')
    .eq('city_code', cityCode)
    .eq('trigger_type', triggerType)
    .eq('is_active', true)
    .limit(1);

  if (existing?.length) {
    // Already active — no-op (idempotent)
    return;
  }

  const vals = MOCK_TRIGGER_VALUES[triggerType];
  if (!vals) throw new Error(`Unknown trigger type: ${triggerType}`);

  const { error } = await supabase.from('trigger_events').insert({
    city,
    city_code: cityCode,
    trigger_type: triggerType,
    measured_value: vals.measured,
    threshold: vals.threshold,
    unit: vals.unit,
    source: 'MOCK_SWIGGY',
    is_active: true,
  });

  if (error) throw new Error(`Trigger fire failed: ${error.message}`);
}

export async function clearAllDisruptions(cityCode: string): Promise<void> {
  const { error } = await supabase
    .from('trigger_events')
    .update({
      is_active: false,
      cleared_at: new Date().toISOString(),
      cleared_by: 'MOCK_SWIGGY_CLEAR_ALL',
    })
    .eq('city_code', cityCode)
    .eq('is_active', true);

  if (error) throw new Error(`Clear disruptions failed: ${error.message}`);
}

export async function fetchActiveTriggers(cityCode: string) {
  const { data, error } = await supabase
    .from('trigger_events')
    .select('trigger_type')
    .eq('city_code', cityCode)
    .eq('is_active', true);
  if (error) return [];
  return (data ?? []).map(t => t.trigger_type);
}
```

---

## 6. STATE MANAGEMENT

### store/worker.store.ts (Zustand)
```typescript
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WorkerProfile {
  workerId: string;
  name: string;
  city: string;
  cityCode: string;
  vehicleType: string;
  weeklyHours: number;
  weeklyEarnings: number;
  weeklyDeliveries: number;
  rating: number;
  activeZone: string;
  platform: string;
  profileIndex: number;
  isSelected: boolean;
  phone: string;
}

export interface SessionState {
  isOnline: boolean;
  todayEarnings: number;
  todayHours: number;
  todayDeliveries: number;
  lastSynced: string | null;
}

interface WorkerStore {
  selectedWorker: WorkerProfile | null;
  session: SessionState;
  activeDisruptions: string[];
  isLoading: boolean;
  error: string | null;

  setSelectedWorker: (worker: WorkerProfile) => void;
  setSession: (session: Partial<SessionState>) => void;
  setOnline: (isOnline: boolean) => void;
  addDisruption: (type: string) => void;
  removeDisruption: (type: string) => void;
  clearAllDisruptions: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWorkerStore = create<WorkerStore>()(
  persist(
    (set) => ({
      selectedWorker: null,
      session: {
        isOnline: false,
        todayEarnings: 0,
        todayHours: 0,
        todayDeliveries: 0,
        lastSynced: null,
      },
      activeDisruptions: [],
      isLoading: false,
      error: null,

      setSelectedWorker: (worker) => set({ selectedWorker: worker }),
      setSession: (partial) => set(state => ({ session: { ...state.session, ...partial } })),
      setOnline: (isOnline) => set(state => ({ session: { ...state.session, isOnline } })),
      addDisruption: (type) => set(state => ({
        activeDisruptions: state.activeDisruptions.includes(type)
          ? state.activeDisruptions
          : [...state.activeDisruptions, type]
      })),
      removeDisruption: (type) => set(state => ({
        activeDisruptions: state.activeDisruptions.filter(d => d !== type)
      })),
      clearAllDisruptions: () => set({ activeDisruptions: [] }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'swiggy-mock-worker',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedWorker: state.selectedWorker,
        session: { ...state.session, isOnline: false }, // Always start offline
        activeDisruptions: [], // Clear disruptions on restart
      }),
    }
  )
);
```

### constants/workers.ts (4 Profiles — Single Source of Truth)
```typescript
import { WorkerProfile } from '../store/worker.store';

export const WORKER_PROFILES: WorkerProfile[] = [
  {
    workerId: 'SW-CHE-004821', name: 'Ravi Kumar',
    city: 'Chennai', cityCode: 'CHE',
    vehicleType: 'Petrol Bike', weeklyHours: 48,
    weeklyEarnings: 4200, weeklyDeliveries: 126,
    rating: 4.8, activeZone: 'Anna Nagar',
    platform: 'Swiggy', profileIndex: 1, isSelected: true,
    phone: '+919876543210',
  },
  {
    workerId: 'SW-DEL-009341', name: 'Priya Sharma',
    city: 'Delhi', cityCode: 'DEL',
    vehicleType: 'Electric Scooter', weeklyHours: 22,
    weeklyEarnings: 1800, weeklyDeliveries: 63,
    rating: 4.6, activeZone: 'Connaught Place',
    platform: 'Swiggy', profileIndex: 2, isSelected: false,
    phone: '+919876543211',
  },
  {
    workerId: 'SW-MUM-002156', name: 'Ahmed Khan',
    city: 'Mumbai', cityCode: 'MUM',
    vehicleType: 'Petrol Bike', weeklyHours: 55,
    weeklyEarnings: 5800, weeklyDeliveries: 154,
    rating: 4.9, activeZone: 'Bandra West',
    platform: 'Swiggy', profileIndex: 3, isSelected: false,
    phone: '+919876543212',
  },
  {
    workerId: 'SW-BLR-007732', name: 'Deepa Nair',
    city: 'Bengaluru', cityCode: 'BLR',
    vehicleType: 'Bicycle', weeklyHours: 35,
    weeklyEarnings: 3100, weeklyDeliveries: 98,
    rating: 4.7, activeZone: 'Koramangala',
    platform: 'Swiggy', profileIndex: 4, isSelected: false,
    phone: '+919876543213',
  },
];

// City map coordinates
export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  CHE: { lat: 13.0827, lng: 80.2707 },
  DEL: { lat: 28.6139, lng: 77.2090 },
  MUM: { lat: 19.0760, lng: 72.8777 },
  BLR: { lat: 12.9716, lng: 77.5946 },
};

// Streak days per worker
export const STREAK_DAYS: Record<string, number> = {
  'SW-CHE-004821': 14,
  'SW-DEL-009341': 7,
  'SW-MUM-002156': 21,
  'SW-BLR-007732': 10,
};

// Mock orders per worker (realistic Indian addresses)
export const MOCK_ORDERS: Record<string, any[]> = {
  'SW-CHE-004821': [
    { id: 'ORD-8472911', restaurant: 'Pizza Hub', pickup: '23, Nehru Street, Anna Nagar', drop: '7, MKB Nagar', distance: '2.3 km', payout: 45 },
    { id: 'ORD-8472912', restaurant: 'Biryani Bros', pickup: '15, Saidapet Main Rd', drop: '88, Vadapalani', distance: '3.1 km', payout: 52 },
    { id: 'ORD-8472913', restaurant: 'Dosa Corner', pickup: '9, T Nagar West', drop: '42, Kodambakkam', distance: '1.8 km', payout: 38 },
  ],
  'SW-DEL-009341': [
    { id: 'ORD-9341001', restaurant: 'Butter Chicken Palace', pickup: 'CP Inner Circle', drop: 'Karol Bagh Main St', distance: '4.2 km', payout: 65 },
    { id: 'ORD-9341002', restaurant: 'North Indian Tadka', pickup: 'Janpath Market', drop: 'Lajpat Nagar', distance: '5.8 km', payout: 75 },
  ],
  'SW-MUM-002156': [
    { id: 'ORD-2156001', restaurant: 'Sea Food Delight', pickup: 'Linking Rd, Bandra', drop: 'Juhu Beach Area', distance: '3.7 km', payout: 58 },
    { id: 'ORD-2156002', restaurant: 'Vada Pav King', pickup: 'Hill Road Bandra', drop: 'Andheri West', distance: '6.2 km', payout: 80 },
  ],
  'SW-BLR-007732': [
    { id: 'ORD-7732001', restaurant: 'MTR 1924', pickup: '80 Feet Road, Koramangala', drop: 'HSR Layout Sector 2', distance: '2.9 km', payout: 48 },
    { id: 'ORD-7732002', restaurant: 'CTR Malleshwaram', pickup: '7th Block, Koramangala', drop: 'Indiranagar 12th Main', distance: '4.5 km', payout: 60 },
  ],
};
```

---

## 7. NAVIGATION SETUP

### app/_layout.tsx (Root)
```typescript
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useWorkerStore } from '../store/worker.store';

export default function RootLayout() {
  const selectedWorker = useWorkerStore(s => s.selectedWorker);

  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="profile-select" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      </Stack>
    </>
  );
}
```

### app/(tabs)/_layout.tsx (Bottom Navigation)
```typescript
import { Tabs, Redirect } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWorkerStore } from '../../store/worker.store';
import { SwiggyColors } from '../../constants/colors';

export default function TabsLayout() {
  const selectedWorker = useWorkerStore(s => s.selectedWorker);
  if (!selectedWorker) return <Redirect href="/profile-select" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: SwiggyColors.card,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          height: 60,
        },
        tabBarActiveTintColor: SwiggyColors.primary,
        tabBarInactiveTintColor: SwiggyColors.textDisabled,
      }}
    >
      <Tabs.Screen name="home" options={{
        tabBarIcon: ({ color, focused }) => (
          <TabIcon name="home" color={color} focused={focused} />
        ),
      }} />
      <Tabs.Screen name="orders" options={{
        tabBarIcon: ({ color, focused }) => (
          <TabIcon name="bag" color={color} focused={focused} />
        ),
      }} />
      <Tabs.Screen name="earnings" options={{
        tabBarIcon: ({ color, focused }) => (
          <TabIcon name="stats-chart" color={color} focused={focused} />
        ),
      }} />
      <Tabs.Screen name="performance" options={{
        tabBarIcon: ({ color, focused }) => (
          <TabIcon name="trophy" color={color} focused={focused} />
        ),
      }} />
      <Tabs.Screen name="me" options={{
        tabBarIcon: ({ color, focused }) => (
          <TabIcon name="person" color={color} focused={focused} />
        ),
      }} />
    </Tabs>
  );
}

function TabIcon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Ionicons name={name as any} size={24} color={color} />
      {focused && <View style={{
        width: 4, height: 4, borderRadius: 2,
        backgroundColor: SwiggyColors.primary, marginTop: 2,
      }} />}
    </View>
  );
}
```

---

## 8. SCREEN-BY-SCREEN IMPLEMENTATION

### app/splash.tsx
```typescript
import { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { SwiggyColors } from '../constants/colors';

export default function SplashScreen() {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(SwiggyColors.primary);
    const timer = setTimeout(() => router.replace('/profile-select'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>swiggy</Text>
      <Text style={styles.subtitle}>Delivery Partner</Text>
      <View style={styles.dots}>
        {[0, 1, 2].map(i => <View key={i} style={styles.dot} />)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SwiggyColors.primary, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 40, fontWeight: '700', color: '#FFFFFF', fontFamily: 'Roboto', letterSpacing: -1 },
  subtitle: { fontSize: 18, color: '#FFFFFF', marginTop: 8, opacity: 0.9 },
  dots: { position: 'absolute', bottom: 60, flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.6)' },
});
```

### app/profile-select.tsx (Complete)
```typescript
import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { fetchAllWorkers, selectWorkerProfile, upsertSession } from '../lib/supabase';
import { WorkerProfileCard } from '../components/cards/WorkerProfileCard';
import { SkeletonCard } from '../components/shared/SkeletonCard';
import { ErrorBanner } from '../components/shared/ErrorBanner';
import { useWorkerStore, WorkerProfile } from '../store/worker.store';
import { SwiggyColors } from '../constants/colors';

export default function ProfileSelectScreen() {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selecting, setSelecting] = useState<string | null>(null);

  const { selectedWorker, setSelectedWorker } = useWorkerStore();

  const loadWorkers = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchAllWorkers();
      setWorkers(data.map((w: any) => ({
        workerId: w.worker_id, name: w.name, city: w.city,
        cityCode: w.city_code, vehicleType: w.vehicle_type,
        weeklyHours: w.weekly_hours, weeklyEarnings: w.weekly_earnings,
        weeklyDeliveries: w.weekly_deliveries, rating: w.rating,
        activeZone: w.active_zone, platform: w.platform,
        profileIndex: w.profile_index, isSelected: w.is_selected,
        phone: w.phone,
      })));
    } catch (err: any) {
      setError(err.message ?? 'Failed to load profiles');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadWorkers(); }, [loadWorkers]);

  const handleSelectWorker = async (worker: WorkerProfile) => {
    if (selecting) return; // Prevent double-tap
    try {
      setSelecting(worker.workerId);
      // Optimistic UI update
      setWorkers(prev => prev.map(w => ({ ...w, isSelected: w.workerId === worker.workerId })));
      setSelectedWorker({ ...worker, isSelected: true });

      // Write to Supabase
      await selectWorkerProfile(worker.workerId);

      // Upsert today's session with daily averages
      const dailyHours = parseFloat((worker.weeklyHours / 7).toFixed(1));
      const dailyEarnings = parseFloat((worker.weeklyEarnings / 7).toFixed(0));
      const dailyDeliveries = Math.round(worker.weeklyDeliveries / 7);
      await upsertSession(worker.workerId, worker.city, worker.cityCode, {
        hours_worked: dailyHours,
        earnings: dailyEarnings,
        deliveries: dailyDeliveries,
        is_online: false,
        is_current: true,
      });

      router.replace('/(tabs)/home');
    } catch (err: any) {
      // Revert optimistic update on failure
      setWorkers(prev => prev.map(w => ({
        ...w, isSelected: w.workerId === selectedWorker?.workerId
      })));
      setError('Could not select profile. Check your connection.');
    } finally {
      setSelecting(null);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Delivery Partner</Text>
        <Text style={styles.subtitle}>Switch worker profile to simulate delivery data</Text>
      </View>

      {error && <ErrorBanner message={error} onRetry={loadWorkers} />}

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={i => String(i)}
          renderItem={() => <SkeletonCard style={styles.skeletonCard} />}
          contentContainerStyle={styles.list}
        />
      ) : (
        <FlatList
          data={workers}
          keyExtractor={w => w.workerId}
          renderItem={({ item }) => (
            <WorkerProfileCard
              worker={item}
              isSelected={item.workerId === selectedWorker?.workerId}
              isSelecting={selecting === item.workerId}
              onSelect={() => handleSelectWorker(item)}
            />
          )}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { setRefreshing(true); loadWorkers(); }}
              tintColor={SwiggyColors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: SwiggyColors.background },
  header: {
    backgroundColor: SwiggyColors.card,
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: SwiggyColors.divider,
  },
  title: { fontSize: 18, fontWeight: '600', color: SwiggyColors.textPrimary },
  subtitle: { fontSize: 13, color: SwiggyColors.textSecondary, marginTop: 4 },
  list: { padding: 16, gap: 12 },
  skeletonCard: { height: 120, marginBottom: 12 },
});
```

### app/(tabs)/home.tsx (Core Screen — Abbreviated Key Parts)
```typescript
import { useState, useEffect, useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, SafeAreaView } from 'react-native';
import { useWorkerStore } from '../../store/worker.store';
import { fetchTodaySession, updateOnlineStatus, fetchActiveTriggers } from '../../lib/supabase';
import { SwiggyAppBar } from '../../components/shared/SwiggyAppBar';
import { EarningsSummaryCard } from '../../components/cards/EarningsSummaryCard';
import { OnlineToggleCard } from '../../components/cards/OnlineToggleCard';
import { ZoneMapCard } from '../../components/cards/ZoneMapCard';
import { ZoneAlertsPanel } from '../../components/cards/ZoneAlertsPanel';
import { SkeletonCard } from '../../components/shared/SkeletonCard';
import { ErrorBanner } from '../../components/shared/ErrorBanner';
import { OfflineBanner } from '../../components/shared/OfflineBanner';
import { SwiggyColors } from '../../constants/colors';

export default function HomeScreen() {
  const { selectedWorker, session, setSession, setOnline, activeDisruptions } = useWorkerStore();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [togglingOnline, setTogglingOnline] = useState(false);
  const [activeTriggerCount, setActiveTriggerCount] = useState(0);

  const loadData = useCallback(async () => {
    if (!selectedWorker) return;
    try {
      setError(null);
      const [sessionData, triggers] = await Promise.all([
        fetchTodaySession(selectedWorker.workerId),
        fetchActiveTriggers(selectedWorker.cityCode),
      ]);

      if (sessionData) {
        setSession({
          todayEarnings: sessionData.earnings,
          todayHours: sessionData.hours_worked,
          todayDeliveries: sessionData.deliveries,
          isOnline: sessionData.is_online,
        });
      }
      setActiveTriggerCount(triggers.length);
    } catch (err: any) {
      setError('Could not load data. Pull down to retry.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedWorker]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleToggleOnline = async () => {
    if (!selectedWorker || togglingOnline) return;
    try {
      setTogglingOnline(true);
      const newStatus = !session.isOnline;
      // Optimistic update
      setOnline(newStatus);
      await updateOnlineStatus(selectedWorker.workerId, selectedWorker.city, selectedWorker.cityCode, newStatus);
    } catch {
      // Revert
      setOnline(session.isOnline);
      setError('Could not update status. Try again.');
    } finally {
      setTogglingOnline(false);
    }
  };

  if (!selectedWorker) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <SwiggyAppBar
        workerName={selectedWorker.name.split(' ')[0]}
        city={selectedWorker.city}
        activeTriggerCount={activeTriggerCount}
      />
      <OfflineBanner />
      {error && <ErrorBanner message={error} onRetry={() => { setRefreshing(true); loadData(); }} />}
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); loadData(); }}
            tintColor={SwiggyColors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <>
            <SkeletonCard style={styles.skeletonHero} />
            <SkeletonCard style={styles.skeletonToggle} />
          </>
        ) : (
          <>
            <EarningsSummaryCard
              workerName={selectedWorker.name.split(' ')[0]}
              earnings={session.todayEarnings}
              deliveries={session.todayDeliveries}
              hours={session.todayHours}
              rating={selectedWorker.rating}
              isOnline={session.isOnline}
            />
            <OnlineToggleCard
              isOnline={session.isOnline}
              isLoading={togglingOnline}
              onToggle={handleToggleOnline}
            />
            <ZoneMapCard
              cityCode={selectedWorker.cityCode}
              zoneName={selectedWorker.activeZone}
            />
            <ZoneAlertsPanel
              city={selectedWorker.city}
              cityCode={selectedWorker.cityCode}
            />
          </>
        )}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: SwiggyColors.background },
  scroll: { flex: 1 },
  skeletonHero: { height: 160, margin: 12 },
  skeletonToggle: { height: 100, marginHorizontal: 12 },
});
```

---

## 9. SHARED COMPONENTS

### components/cards/ZoneAlertsPanel.tsx (Complete)
```typescript
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWorkerStore } from '../../store/worker.store';
import { fireDisruption, clearAllDisruptions } from '../../lib/supabase';
import { SwiggyColors } from '../../constants/colors';

const DISRUPTIONS = [
  { id: 'RAIN_EXTREME',      label: 'Heavy Rain',       icon: 'water',         accent: SwiggyColors.rain   },
  { id: 'AQI_SEVERE',        label: 'Poor Air Quality', icon: 'cloud',         accent: SwiggyColors.aqi    },
  { id: 'HEAT_EXTREME',      label: 'Heat Wave',        icon: 'sunny',         accent: SwiggyColors.heat   },
  { id: 'PLATFORM_OUTAGE',   label: 'App Outage',       icon: 'phone-portrait-outline', accent: SwiggyColors.outage },
  { id: 'SOCIAL_DISRUPTION', label: 'Curfew / Strike',  icon: 'warning',       accent: SwiggyColors.curfew },
];

interface Props { city: string; cityCode: string; }

export function ZoneAlertsPanel({ city, cityCode }: Props) {
  const { activeDisruptions, addDisruption, removeDisruption, clearAllDisruptions: clearStore } = useWorkerStore();

  const handleDisruption = async (triggerType: string) => {
    if (activeDisruptions.includes(triggerType)) return; // Already active

    try {
      addDisruption(triggerType); // Optimistic update
      await fireDisruption(triggerType, city, cityCode);
    } catch (err: any) {
      removeDisruption(triggerType); // Revert on failure
      Alert.alert('Error', `Could not activate zone alert. ${err.message}`);
    }
  };

  const handleClearAll = async () => {
    if (!activeDisruptions.length) return;
    Alert.alert(
      'Clear All Alerts',
      'This will clear all active zone alerts. Haven app will stop generating new claims.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              clearStore(); // Optimistic
              await clearAllDisruptions(cityCode);
            } catch {
              Alert.alert('Error', 'Could not clear alerts. Try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Zone Alerts</Text>
        <Text style={styles.hint}>Simulate Disruption</Text>
      </View>

      <View style={styles.grid}>
        {DISRUPTIONS.map(d => {
          const isActive = activeDisruptions.includes(d.id);
          return (
            <TouchableOpacity
              key={d.id}
              style={[styles.button, isActive && { borderColor: d.accent, borderWidth: 2, backgroundColor: `${d.accent}15` }]}
              onPress={() => handleDisruption(d.id)}
              activeOpacity={0.7}
            >
              <Ionicons name={d.icon as any} size={18} color={isActive ? d.accent : SwiggyColors.textSecondary} />
              <Text style={[styles.buttonLabel, isActive && { color: d.accent }]}>{d.label}</Text>
              {isActive && (
                <View style={[styles.activeBadge, { backgroundColor: d.accent }]}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {activeDisruptions.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={handleClearAll}>
          <Ionicons name="refresh" size={14} color={SwiggyColors.textSecondary} />
          <Text style={styles.clearBtnText}>Clear All Alerts</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SwiggyColors.card, margin: 12, marginTop: 0,
    borderRadius: 12, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600', color: SwiggyColors.textPrimary },
  hint: { fontSize: 12, color: SwiggyColors.textSecondary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  button: {
    width: '47%', flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 10,
    paddingVertical: 10, position: 'relative',
    borderWidth: 1, borderColor: 'transparent',
  },
  buttonLabel: { fontSize: 12, fontWeight: '500', color: SwiggyColors.textSecondary, flex: 1 },
  activeBadge: {
    position: 'absolute', top: -6, right: -6,
    paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4,
  },
  activeBadgeText: { fontSize: 8, color: '#FFFFFF', fontWeight: '600' },
  clearBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, marginTop: 12, paddingVertical: 8,
  },
  clearBtnText: { fontSize: 13, color: SwiggyColors.textSecondary },
});
```

---

## 10. EDGE CASES & ERROR HANDLING

### All Edge Cases Handled

| Scenario | How Handled |
|---|---|
| No internet on app open | OfflineBanner shown, all screens show cached Zustand data |
| Worker profile not in Supabase | fetchAllWorkers throws, ErrorBanner shown with retry |
| Session row missing for today | `fetchTodaySession` returns null, screen shows zeros gracefully |
| Double-tap on Select Worker | `selecting` state guard prevents concurrent writes |
| Disruption already active | `fetchActiveTriggers` check before INSERT, silently skips |
| Supabase write fails (disruption) | Optimistic revert + Alert.alert with error message |
| Clear All when nothing active | Button not shown (conditional render when `activeDisruptions.length > 0`) |
| App killed mid-online toggle | Zustand `persist` stores false for isOnline always on restart |
| App killed with active disruptions | Zustand `persist` clears `activeDisruptions: []` on restart |
| Selected worker profile deleted from Supabase | Auth redirect check: if `selectedWorker` null, redirect to profile-select |
| Slider set to 0 earnings | Allowed — valid state (day off) |
| Very long worker name | All name displays use `numberOfLines={1} ellipsizeMode="tail"` |
| Tablet layout | `maxWidth: 480` centering applied to all cards, screen not optimized for tablet |

---

## 11. APK BUILD & DISTRIBUTION

### eas.json
```json
{
  "cli": { "version": ">= 5.0.0" },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      },
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "https://your-project.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your-anon-key"
      }
    }
  }
}
```

### Build Commands
```bash
# Login to EAS
eas login

# Build preview APK (for testing — no Play Store needed)
eas build --platform android --profile preview

# Download and install
# EAS provides a QR code and download link
# Install on Android: enable "Unknown sources" → tap APK

# For local testing during development
npx expo start --android
```

---

## 12. TESTING CHECKLIST

### Functional Tests (Manual — Do Before Each APK Build)

**Profile Selection**
- [ ] All 4 worker cards load from Supabase
- [ ] Tapping a card updates border to orange immediately (optimistic UI)
- [ ] Supabase `mock_platform_workers.is_selected` changes correctly
- [ ] Navigation to Home screen happens after selection
- [ ] App restarts to last selected worker (Zustand persist)
- [ ] Pull-to-refresh on profile select reloads workers

**Home Screen**
- [ ] Earnings amount shows today's session data from Supabase
- [ ] Delivery count and hours show correctly
- [ ] Go Online toggle writes `is_online = true` to Supabase
- [ ] Go Offline toggle writes `is_online = false` to Supabase
- [ ] Toggle shows loading state for ~500ms during Supabase write
- [ ] City zone card shows correct city name
- [ ] Bell badge count matches active trigger_events for city

**Zone Alerts (Critical — This Is How Haven Gets Triggered)**
- [ ] Heavy Rain button → INSERT into trigger_events with type RAIN_EXTREME
- [ ] Poor AQI button → INSERT with type AQI_SEVERE
- [ ] Heat Wave button → INSERT with type HEAT_EXTREME
- [ ] App Outage button → INSERT with type PLATFORM_OUTAGE
- [ ] Curfew/Strike button → INSERT with type SOCIAL_DISRUPTION
- [ ] Active button shows colored border and "Active" badge
- [ ] Tapping active button again does NOT create duplicate (check Supabase — should be 1 row)
- [ ] Clear All button appears when any disruption active
- [ ] Clear All sets `is_active = false` for all city triggers in Supabase
- [ ] After clear, Haven app home screen shows no trigger banner (verify manually)

**Earnings + Sliders**
- [ ] Bar chart shows 7 bars, today's bar is orange
- [ ] Hours slider (0-16) changes value correctly
- [ ] Deliveries slider (0-40) changes value correctly
- [ ] Earnings slider (0-2000) changes value correctly
- [ ] Sync button writes new values to Supabase delivery_sessions
- [ ] "Last synced: [time]" updates after successful sync

**Edge Cases**
- [ ] Airplane mode → OfflineBanner visible on all screens
- [ ] Airplane mode + tap disruption → Alert shows error, button reverts to inactive
- [ ] Switch profiles while disruptions are active → disruptions clear from local store

---

*SwiggyMock Delivery Partner App — Expo + Supabase Direct*
*Part of GigShield Platform | Aligns with: Haven Server · Haven App · Haven Admin*
