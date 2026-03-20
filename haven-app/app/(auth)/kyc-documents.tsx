import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { kycService } from '../../services/mock.services';
import { useUserStore } from '../../store/user.store';
import { Colors } from '../../constants/colors';

export default function KycDocumentsScreen() {
  const [phase, setPhase] = useState<'fetching' | 'done'>('fetching');
  const [kycData, setKycData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const pulseAnim = useState(new Animated.Value(0.4))[0];
  const { data: worker } = useUserStore();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    async function fetchKyc() {
      try {
        const result = await kycService.fetchKyc(worker?.phone || '+919876543210');
        setKycData(result);
        setPhase('done');
      } catch (err: any) {
        setError('Could not fetch your DigiLocker data. Please try again.');
        setPhase('done');
      }
    }
    fetchKyc();
  }, []);

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#14532D', '#16A34A']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.dlLabel}>DigiLocker</Text>
          <Text style={styles.headerTitle}>
            {phase === 'fetching' ? 'Fetching Documents...' : 'Documents Verified'}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        {phase === 'fetching' ? (
          <View style={styles.fetchingContainer}>
            <Animated.View style={[styles.fetchIcon, { opacity: pulseAnim }]}>
              <Ionicons name="document-text" size={48} color={Colors.dlGreen} />
            </Animated.View>
            <Text style={styles.fetchTitle}>Connecting to DigiLocker...</Text>
            <Text style={styles.fetchSubtitle}>Securely fetching your Aadhaar and PAN details</Text>

            <View style={styles.stepsList}>
              {['Connecting to DigiLocker', 'Verifying consent', 'Fetching documents'].map((step, i) => (
                <View key={i} style={styles.stepItem}>
                  <Animated.View style={{ opacity: pulseAnim }}>
                    <Ionicons name="ellipse" size={8} color={Colors.dlGreen} />
                  </Animated.View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={48} color={Colors.error} />
            <Text style={styles.errorTitle}>Verification Failed</Text>
            <Text style={styles.errorSubtitle}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={() => router.back()}>
              <Text style={styles.retryText}>Try Different Number</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.successText}>KYC Documents Verified</Text>
            </View>

            <View style={styles.docCard}>
              <View style={styles.docHeader}>
                <Ionicons name="card" size={20} color={Colors.dlGreen} />
                <Text style={styles.docTitle}>Aadhaar Card</Text>
              </View>
              <View style={styles.docRow}>
                <Text style={styles.docLabel}>Name</Text>
                <Text style={styles.docValue}>{kycData?.name}</Text>
              </View>
              <View style={styles.docRow}>
                <Text style={styles.docLabel}>Aadhaar</Text>
                <Text style={styles.docValue}>{kycData?.aadhaarMasked}</Text>
              </View>
              <View style={styles.docRow}>
                <Text style={styles.docLabel}>DOB</Text>
                <Text style={styles.docValue}>{kycData?.dob}</Text>
              </View>
              <View style={[styles.docRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.docLabel}>Address</Text>
                <Text style={[styles.docValue, { flex: 1, textAlign: 'right' }]}>{kycData?.address}</Text>
              </View>
            </View>

            <View style={styles.docCard}>
              <View style={styles.docHeader}>
                <Ionicons name="document" size={20} color={Colors.dlGreen} />
                <Text style={styles.docTitle}>PAN Card</Text>
              </View>
              <View style={[styles.docRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.docLabel}>PAN</Text>
                <Text style={styles.docValue}>{kycData?.pan}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => router.push('/(auth)/setup-complete')}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>Confirm & Continue</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: { height: '30%', paddingTop: 50, paddingHorizontal: 20, justifyContent: 'flex-end', paddingBottom: 50 },
  back: { position: 'absolute', top: 50, left: 20 },
  headerContent: { alignItems: 'center' },
  dlLabel: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  card: {
    flex: 1, backgroundColor: Colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    marginTop: -30, padding: 24, paddingTop: 28,
  },
  fetchingContainer: { alignItems: 'center', paddingTop: 40 },
  fetchIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.dlGreenBg, alignItems: 'center', justifyContent: 'center' },
  fetchTitle: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary, marginTop: 24 },
  fetchSubtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 8, textAlign: 'center' },
  stepsList: { marginTop: 32, gap: 16 },
  stepItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepText: { fontSize: 14, color: Colors.textSecondary },
  errorContainer: { alignItems: 'center', paddingTop: 40 },
  errorTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginTop: 16 },
  errorSubtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 8, textAlign: 'center' },
  retryBtn: { backgroundColor: Colors.error, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, marginTop: 24 },
  retryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  successBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.successBg,
    padding: 12, borderRadius: 10, marginBottom: 20,
  },
  successText: { fontSize: 14, fontWeight: '600', color: Colors.success },
  docCard: { backgroundColor: '#F8FAFC', borderRadius: 14, padding: 16, marginBottom: 16 },
  docHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  docTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  docRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  docLabel: { fontSize: 13, color: Colors.textSecondary },
  docValue: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  btn: {
    backgroundColor: Colors.dlGreen, borderRadius: 12, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8,
  },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
