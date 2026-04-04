import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Typography } from '../ui/typography';
import { BrandColors } from '../../constants/theme';

export function TelemetryCard({ workerId }: { workerId: string }) {
  const [status, setStatus] = useState<any>(null);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Pulse animation for the "Live" indicator
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:3000/telemetry/status/${workerId}`);
        const json = await res.json();
        if (json.status === 'ONLINE') {
          setStatus(json.telemetry);
        } else {
          setStatus(null);
        }
      } catch (e) {
        setStatus(null);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [workerId]);

  if (!status) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.statusRow}>
          <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />
          <Typography variant="caption" color={BrandColors.text.primary} style={styles.liveText}>
            SENSORY NODE CONNECTED
          </Typography>
        </View>
        <Ionicons name="wifi" size={16} color="#22C55E" />
      </View>

      <Typography variant="bodySemiBold" style={styles.platformText}>
        External Feed: Swiggy Partner App
      </Typography>

      <View style={styles.gridInfo}>
        <View style={styles.infoBlock}>
          <Typography variant="caption" color={BrandColors.text.muted}>H3 CELL (RES 9)</Typography>
          <Typography variant="bodySemiBold" style={styles.hexCode}>{status.h3Cell}</Typography>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoBlock}>
          <Typography variant="caption" color={BrandColors.text.muted}>RISK RADIUS</Typography>
          <Typography variant="bodySemiBold">174m Hexagon</Typography>
        </View>
      </View>

      <View style={styles.footer}>
        <MaterialCommunityIcons name="shield-check" size={14} color="#007A8B" />
        <Typography variant="caption" color="#007A8B" style={styles.footerText}>
          Location verified via Background Telemetry
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0F9FF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },
  liveText: {
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  platformText: {
    fontSize: 13,
    marginBottom: 16,
  },
  gridInfo: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  infoBlock: {
    flex: 1,
  },
  hexCode: {
    fontSize: 12,
    color: '#0369A1',
    fontFamily: 'System', // Use monospace if available
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '700',
  }
});
