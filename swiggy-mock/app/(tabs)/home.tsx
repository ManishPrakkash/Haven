import React, { useMemo } from 'react';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserStore } from '../store/userStore';

const zoneAlerts = [
  { id: 'rain', label: 'Heavy Rain', icon: 'weather-rainy', color: '#87A9DE' },
  { id: 'aqi', label: 'Poor Air Quality', icon: 'weather-windy', color: '#C2A086' },
  { id: 'heat', label: 'Heat Wave', icon: 'white-balance-sunny', color: '#F2A06C' },
  { id: 'outage', label: 'App Outage', icon: 'alert', color: '#DC7E7B' },
  { id: 'curfew', label: 'Curfew in effect', icon: 'clock-alert-outline', color: '#E4B271' },
];

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function WorkerHomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile, setDrift, setLocationOffset } = useUserStore();

  const firstName = profile.name.split(' ')[0];
  const { todayEarnings, deliveriesToday, hoursToday, isOnline, deliveryZone } = profile.homeStats;
  const rating = profile.performance.rating;

  const handleSimulate = async (alertId: string, label: string) => {
    try {
      // 10+ Year Dev Strategy: Simulate geospatial spoofing and noise
      const payload = {
        workerId: profile.id,
        lat: profile.homeStats.lat + profile.homeStats.locationOffset.lat, 
        lng: profile.homeStats.lng + profile.homeStats.locationOffset.lng,   
        eventType: alertId,
        zone: profile.homeStats.deliveryZone,
        timestamp: new Date().toISOString()
      };

      const res = await fetch('http://localhost:3000/triggers/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        const result = data.result;
        const distanceStr = result.distance ? `\n\n[Spatial Proof]: ${result.distance} from epicenter.` : '';

        if (result.status === 'APPROVED') {
          Alert.alert(
            "Claim Approved!", 
            `Haven Fraud Engine verified your physical presence. Payout of ${result.payout} initiated via UPI.${distanceStr}`,
            [{ text: "Great!" }]
          );
        } else if (result.status === 'DENIED') {
          Alert.alert(
            "Claim Denied (Fraud Engine)", 
            `Vetoed at Layer ${result.layer}: ${result.reason}${distanceStr}`,
            [{ text: "Understood" }]
          );
        } else if (result.status === 'ESCROW') {
          Alert.alert(
            "Sent to Escrow", 
            `Layer ${result.layer} flagging: ${result.reason}. Circuit Breaker status maintained.${distanceStr}`,
            [{ text: "OK" }]
          );
        }
      } else {
        Alert.alert("Simulation Blocked", "The backend trigger service rejected the execution.");
      }
    } catch (e) {
      Alert.alert("Error", "Backend simulator offline.");
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* ---------- HEADER ---------- */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>swiggy</Text>
          <View>
            <Text style={styles.name}>{firstName}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.city}>{profile.city}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color="#FC8019" />
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.havenBadge}>
             <View style={[styles.pulseDot, isOnline && styles.pulseDotActive]} />
             <Text style={styles.havenBadgeText}>HAVEN SENSORY NODE</Text>
          </View>
          <View style={{ position: 'relative' }}>
            <Ionicons name="notifications-outline" size={22} color="#6B7280" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* ---------- EARNINGS CARD ---------- */}
        <View style={styles.card}>
          <View style={styles.earningsTop}>
            <Text style={styles.greeting}>Good morning, {firstName}!</Text>
            <Text style={styles.amount}>{formatCurrency(todayEarnings)}</Text>
            <Text style={styles.caption}>Today's Earnings</Text>
          </View>

          <View style={styles.metrics}>
            <Metric label="DELIVERIES" value={deliveriesToday} icon="bicycle" />
            <Divider />
            <Metric label="HOURS" value={`${hoursToday.toFixed(1)}h`} icon="time-outline" />
            <Divider />
            <Metric label="RATING" value={rating} icon="star" />
          </View>
        </View>

        {/* ---------- ONLINE STATUS ---------- */}
        <View style={[styles.onlineCard, !isOnline && styles.offlineCard]}>
          {!isOnline && <View style={styles.offlineAccent} />}
          <View style={styles.onlineText}>
            <Text style={styles.status}>You are {isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
            <Text style={styles.subStatus}>
              {isOnline ? 'You can now receive delivery orders' : 'Tap to start receiving orders'}
            </Text>
          </View>

          <Pressable style={[styles.onlineBtn, !isOnline && styles.offlineBtn]}>
            <Text style={styles.onlineBtnText}>{isOnline ? 'GO OFFLINE' : 'GO ONLINE'}</Text>
          </Pressable>
        </View>

        {/* ---------- ENTERPRISE CONTROLS (NEW) ---------- */}
        <View style={styles.card}>
          <View style={styles.precisionHeader}>
             <MaterialCommunityIcons name="satellite-variant" size={18} color="#0D9488" />
             <Text style={styles.precisionTitle}>PRECISION CONTROLS</Text>
          </View>
          <View style={styles.precisionContent}>
             <Pressable 
               style={[styles.smallBtn, profile.homeStats.isDrifting && styles.smallBtnActive]}
               onPress={() => useUserStore.getState().setDrift(!profile.homeStats.isDrifting)}
             >
                <Text style={[styles.smallBtnText, profile.homeStats.isDrifting && styles.smallBtnTextActive]}>
                  MOTIVE DRIFT: {profile.homeStats.isDrifting ? 'ON' : 'OFF'}
                </Text>
             </Pressable>
             <Pressable 
               style={styles.smallBtn}
               onPress={() => {
                 const newLat = profile.homeStats.locationOffset.lat + 0.003;
                 useUserStore.getState().setLocationOffset(newLat, 0);
               }}
             >
                <Text style={styles.smallBtnText}>MOVE WORKER (+300m)</Text>
             </Pressable>
          </View>
          <View style={styles.offsetIndicator}>
             <Text style={styles.offsetText}>Active Offset: {profile.homeStats.locationOffset.lat.toFixed(4)} LAT</Text>
          </View>
        </View>

        {/* ---------- ZONE ---------- */}
        <View style={styles.card}>
          <View style={styles.zoneHeader}>
            <Text style={styles.zoneTitle}>Delivery Zone</Text>
            <Text style={styles.zoneName}>{deliveryZone}</Text>
          </View>

          <View style={styles.map}>
            <MaterialIcons name="location-on" size={26} color="#FC8019" />
            <View style={styles.locationTag}>
              <Text style={{ fontSize: 12 }}>Your Location</Text>
            </View>
          </View>
        </View>

        {/* ---------- ALERTS ---------- */}
        <View style={styles.alertSection}>
          <View style={styles.alertHeader}>
            <Text style={styles.zoneTitle}>Zone Alerts</Text>
            <Text style={styles.simulate}>SIMULATE</Text>
          </View>

          <View style={styles.alertGrid}>
            {zoneAlerts.map((a) => (
              <Pressable
                key={a.id}
                style={[styles.alertBox, a.id === 'curfew' && { width: '100%' }]}
                onPress={() => handleSimulate(a.id, a.label)}
              >
                <MaterialCommunityIcons name={a.icon as any} size={16} color={a.color} />
                <Text style={styles.alertText}>{a.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>


    </View>
  );
}

// ---------- SMALL COMPONENTS ----------
function Metric({ label, value, icon }: any) {
  const iconComponent =
    label === 'DELIVERIES' ? (
      <MaterialCommunityIcons name={icon} size={16} color="#FC8019" />
    ) : (
      <Ionicons name={icon} size={16} color="#FC8019" />
    );

  return (
    <View style={styles.metric}>
      {iconComponent}
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={{ width: 1, backgroundColor: '#E5E7EB' }} />;
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F5',
  },

  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  havenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  havenBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0D9488',
    marginLeft: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
  },
  pulseDotActive: {
    backgroundColor: '#10B981',
  },
  logo: {
    color: '#FC8019',
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'System',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  city: {
    color: '#FC8019',
    fontSize: 13,
    fontWeight: '500',
  },

  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#F88531',
    borderRadius: 8,
    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  earningsTop: {
    backgroundColor: '#FFF3EB',
    padding: 16,
  },

  greeting: {
    fontSize: 14,
    color: '#686B78',
  },

  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FC8019',
    marginTop: 4,
  },

  caption: {
    fontSize: 14,
    color: '#686B78',
    marginTop: 2,
  },

  metrics: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  metric: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    gap: 4,
  },

  metricValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1A1A1A',
  },

  metricLabel: {
    fontSize: 11,
    color: '#93959F',
    letterSpacing: 0.5,
  },

  onlineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EBF8EE',
    padding: 14,
    borderRadius: 20,
    marginBottom: 14,
  },
  offlineCard: {
    backgroundColor: '#FFF0F0',
  },
  offlineAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#E23744',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  onlineText: {
    flex: 1,
  },

  status: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1A1A1A',
  },

  subStatus: {
    fontSize: 13,
    color: '#686B78',
    marginTop: 2,
  },

  onlineBtn: {
    backgroundColor: '#E23744',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  offlineBtn: {
    backgroundColor: '#3AB04B',
  },
  onlineBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    alignItems: 'center',
  },

  zoneTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1A1A1A',
  },

  zoneName: {
    color: '#FC8019',
    fontWeight: '500',
  },

  map: {
    height: 180,
    backgroundColor: '#C7DAD4',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  locationTag: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E9E9EB',
  },

  alertSection: {
    margin: 16,
  },

  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 4,
  },

  simulate: {
    color: '#FC8019',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  alertGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },

  alertBox: {
    width: '48.5%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  alertText: {
    fontSize: 12,
    color: '#686B78',
    flex: 1,
  },
  precisionHeader: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  precisionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0D9488',
    letterSpacing: 1,
  },
  precisionContent: {
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  smallBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  smallBtnActive: {
    backgroundColor: '#0D9488',
    borderColor: '#0D9488',
  },
  smallBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  smallBtnTextActive: {
    color: '#FFFFFF',
  },
  offsetIndicator: {
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  offsetText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
