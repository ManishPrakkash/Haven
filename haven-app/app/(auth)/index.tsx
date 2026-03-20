import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const FEATURES = [
  { icon: 'shield-checkmark', title: 'Verified Partner Only', desc: 'Only registered delivery workers can enroll', color: Colors.teal },
  { icon: 'cash', title: 'Instant Payouts', desc: 'Claims paid directly to your UPI account', color: Colors.orange },
  { icon: 'flash', title: 'Auto-Claim', desc: 'No paperwork — triggers fire automatically', color: Colors.success },
];

export default function WelcomeScreen() {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[Colors.authGradientTop, Colors.authGradientBot]}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="shield" size={48} color="#FFFFFF" />
          <Text style={styles.appName}>Haven</Text>
          <Text style={styles.tagline}>Income Protection for Delivery Partners</Text>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome</Text>
        <Text style={styles.cardDesc}>
          Set up your income protection in 3 minutes. We verify your delivery partner
          status and link your identity securely.
        </Text>

        <View style={styles.features}>
          {FEATURES.map(f => (
            <View key={f.title} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: `${f.color}20` }]}>
                <Ionicons name={f.icon as any} size={18} color={f.color} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => router.push('/(auth)/worker-verify')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.trustRow}>
          <Ionicons name="lock-closed" size={12} color={Colors.textHint} />
          <Text style={styles.trustText}>Your data is protected and never shared</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: { height: '38%', justifyContent: 'flex-end', paddingBottom: 50, alignItems: 'center' },
  logoContainer: { alignItems: 'center', gap: 8 },
  appName: { fontSize: 32, fontWeight: '700', color: '#FFFFFF' },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
  card: {
    flex: 1, backgroundColor: Colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    marginTop: -30, padding: 24, paddingTop: 32,
  },
  cardTitle: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  cardDesc: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: 24 },
  features: { gap: 16, marginBottom: 28 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  featureIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  featureDesc: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  cta: {
    backgroundColor: Colors.orange, borderRadius: 12, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  ctaText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  trustRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16 },
  trustText: { fontSize: 11, color: Colors.textHint },
});
