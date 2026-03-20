import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../../services/mock.services';
import { useAuthStore } from '../../store/auth.store';
import { Colors } from '../../constants/colors';

export default function KycMobileScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const { setRegistrationToken } = useAuthStore();

  const isValidPhone = /^\d{10}$/.test(phone);
  const canProceed = isValidPhone && agreed;

  const handleSendOtp = async () => {
    if (!canProceed || loading) return;
    setLoading(true);
    setError(null);
    try {
      const fullPhone = `+91${phone}`;
      await authService.sendOtp(fullPhone);
      setRegistrationToken('temp-token', fullPhone);
      router.push('/(auth)/kyc-otp');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#14532D', '#16A34A']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.stepRow}>
            {[1, 2, 3].map(i => (
              <View key={i} style={[styles.stepDot, i <= 2 && styles.stepDotActive]} />
            ))}
          </View>
          <Text style={styles.stepLabel}>STEP 2 OF 3</Text>
          <View style={styles.dlBadge}>
            <Ionicons name="finger-print" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.dlTitle}>DigiLocker</Text>
          <Text style={styles.headerTitle}>KYC Verification</Text>
          <Text style={styles.headerSub}>Link your DigiLocker to verify identity</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.card} contentContainerStyle={styles.cardContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Enter your mobile number</Text>
        <Text style={styles.subtitle}>
          We'll send an OTP to verify your DigiLocker-linked number
        </Text>

        <View style={styles.phoneRow}>
          <View style={styles.prefix}>
            <Text style={styles.prefixText}>+91</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={t => { setPhone(t.replace(/\D/g, '').substring(0, 10)); setError(null); }}
            placeholder="Enter 10-digit number"
            placeholderTextColor={Colors.textHint}
            keyboardType="number-pad"
            maxLength={10}
          />
          {isValidPhone && <Ionicons name="checkmark-circle" size={20} color={Colors.success} />}
        </View>

        {error && (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={14} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.consentRow} onPress={() => setAgreed(!agreed)} activeOpacity={0.7}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text style={styles.consentText}>
            I consent to share my Aadhaar and PAN details from DigiLocker for KYC verification.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, !canProceed && styles.btnDisabled]}
          onPress={handleSendOtp}
          disabled={!canProceed || loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Text style={styles.btnText}>Send OTP</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={16} color={Colors.dlGreen} />
          <Text style={styles.securityText}>
            Your data is encrypted and secured by DigiLocker. We only access your name, Aadhaar (masked), and PAN.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: { height: '38%', paddingTop: 50, paddingHorizontal: 20 },
  back: { marginBottom: 8 },
  headerContent: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingBottom: 40 },
  stepRow: { flexDirection: 'row', gap: 8 },
  stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  stepDotActive: { backgroundColor: '#FFFFFF', width: 20, borderRadius: 4 },
  stepLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 6, letterSpacing: 1 },
  dlBadge: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  dlTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginTop: 10 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginTop: 4 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  card: { flex: 1, backgroundColor: Colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -30 },
  cardContent: { padding: 24, paddingTop: 32 },
  title: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 6, lineHeight: 22 },
  phoneRow: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: 12, height: 56, marginTop: 24, backgroundColor: '#F8FAFC', overflow: 'hidden',
  },
  prefix: { backgroundColor: '#F1F5F9', height: '100%', justifyContent: 'center', paddingHorizontal: 16, borderRightWidth: 1, borderRightColor: Colors.border },
  prefixText: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  phoneInput: { flex: 1, fontSize: 17, color: Colors.textPrimary, paddingHorizontal: 14, letterSpacing: 1 },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  errorText: { fontSize: 12, color: Colors.error },
  consentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginTop: 24 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkboxChecked: { backgroundColor: Colors.dlGreen, borderColor: Colors.dlGreen },
  consentText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  btn: {
    backgroundColor: Colors.dlGreen, borderRadius: 12, height: 52,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28,
  },
  btnDisabled: { backgroundColor: Colors.textDisabled },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  securityNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 24, backgroundColor: Colors.dlGreenBg, padding: 14, borderRadius: 12 },
  securityText: { flex: 1, fontSize: 12, color: Colors.dlGreenDark, lineHeight: 18 },
});
