import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../store/user.store';
import { Colors } from '../../constants/colors';

export default function VerifySuccessScreen() {
  const { data: worker } = useUserStore();

  return (
    <View style={styles.root}>
      <LinearGradient colors={[Colors.navy, Colors.teal]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.stepRow}>
            {[1, 2, 3].map(i => (
              <View key={i} style={[styles.stepDot, i <= 1 && styles.stepDotDone]} />
            ))}
          </View>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={36} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Partner Verified!</Text>
          <Text style={styles.headerSubtitle}>Your identity has been confirmed</Text>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profile Confirmed</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={28} color={Colors.teal} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{worker?.name || 'Ravi Kumar'}</Text>
            <Text style={styles.profileId}>{worker?.workerId || 'SW-CHE-004821'}</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.success} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          {[
            { label: 'Platform', value: worker?.platform?.charAt(0).toUpperCase() + worker?.platform?.slice(1) || 'Swiggy', icon: 'bicycle' },
            { label: 'City', value: worker?.city || 'Chennai', icon: 'location' },
            { label: 'Vehicle', value: worker?.vehicleType?.charAt(0).toUpperCase() + worker?.vehicleType?.slice(1) || 'Bike', icon: 'car-sport' },
            { label: 'Status', value: 'Active', icon: 'pulse' },
          ].map(item => (
            <View key={item.label} style={styles.detailItem}>
              <Ionicons name={item.icon as any} size={16} color={Colors.teal} />
              <View>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.nextStepCard}>
          <Ionicons name="document-text" size={20} color={Colors.info} />
          <View style={{ flex: 1 }}>
            <Text style={styles.nextStepTitle}>Next: KYC Verification</Text>
            <Text style={styles.nextStepDesc}>Link your DigiLocker to verify your identity</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textHint} />
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push('/(auth)/kyc-mobile')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>Continue to KYC</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: { height: '35%', justifyContent: 'flex-end', paddingBottom: 50, alignItems: 'center' },
  headerContent: { alignItems: 'center' },
  stepRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  stepDotDone: { backgroundColor: '#FFFFFF', width: 20, borderRadius: 4 },
  checkCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.success, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginTop: 16 },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  card: {
    flex: 1, backgroundColor: Colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    marginTop: -30, padding: 24, paddingTop: 28,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC',
    padding: 16, borderRadius: 14, gap: 12, marginBottom: 20,
  },
  avatarCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: `${Colors.teal}15`, alignItems: 'center', justifyContent: 'center' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  profileId: { fontSize: 13, color: Colors.textSecondary, marginTop: 2, letterSpacing: 0.5 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.successBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  verifiedText: { fontSize: 11, color: Colors.success, fontWeight: '600' },
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 8, width: '47%', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 10 },
  detailLabel: { fontSize: 10, color: Colors.textHint, textTransform: 'uppercase', letterSpacing: 0.5 },
  detailValue: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary, marginTop: 1 },
  nextStepCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.infoBg, padding: 16, borderRadius: 12, marginBottom: 24,
  },
  nextStepTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  nextStepDesc: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  btn: {
    backgroundColor: Colors.orange, borderRadius: 12, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
