import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../../services/mock.services';
import { useAuthStore } from '../../store/auth.store';
import { Colors } from '../../constants/colors';

export default function KycOtpScreen() {
  const { tempPhone, setLoggedIn, setRegistrationToken } = useAuthStore();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(interval); setCanResend(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError(null);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const code = newOtp.join('');
    if (code.length === 6) {
      handleVerify(code);
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    if (!tempPhone || loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await authService.verifyOtp(tempPhone, code);
      if (result.isNewUser) {
        setRegistrationToken(result.registrationToken, tempPhone);
        router.push('/(auth)/kyc-documents');
      } else {
        setLoggedIn(result.userId ?? '');
        router.replace('/(main)/home');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message ?? 'Incorrect OTP';
      setError(msg);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      shakeError();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || !tempPhone) return;
    try {
      await authService.sendOtp(tempPhone);
      setCountdown(30);
      setCanResend(false);
      setError(null);
    } catch {
      setError('Could not resend OTP. Try again.');
    }
  };

  const maskedPhone = tempPhone?.replace(/(\+91)(\d{5})(\d{5})/, '$1 XXXXX$3') || '+91 XXXXX00000';

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#14532D', '#16A34A']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.dlLabel}>DigiLocker</Text>
          <Text style={styles.headerTitle}>OTP Verification</Text>
          <Text style={styles.headerSub}>Verifying your DigiLocker account</Text>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.title}>Enter the OTP</Text>
        <Text style={styles.subtitle}>A 6-digit OTP was sent to {maskedPhone}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.changeNumber}>Change number</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.otpContainer, { transform: [{ translateX: shakeAnim }] }]}>
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => { inputRefs.current[index] = ref; }}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : {},
                  error ? styles.otpBoxError : {},
                ]}
                value={digit}
                onChangeText={text => handleOtpChange(text.replace(/\D/g, ''), index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>
        </Animated.View>

        {error && (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={14} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.resendRow}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendActive}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resendTimer}>Resend in 0:{String(countdown).padStart(2, '0')}</Text>
          )}
        </View>

        {loading && (
          <Text style={styles.verifying}>Verifying...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: { height: '35%', paddingTop: 50, paddingHorizontal: 20, justifyContent: 'flex-end', paddingBottom: 50 },
  back: { position: 'absolute', top: 50, left: 20 },
  headerContent: { alignItems: 'center' },
  dlLabel: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginTop: 4 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  card: {
    flex: 1, backgroundColor: Colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    marginTop: -30, padding: 24, paddingTop: 32,
  },
  title: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 6 },
  changeNumber: { fontSize: 13, color: Colors.dlGreen, marginTop: 8, textDecorationLine: 'underline' },
  otpContainer: { marginTop: 32 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  otpBox: {
    width: 48, height: 56, fontSize: 22, fontWeight: '600', borderRadius: 12, borderWidth: 1.5,
    borderColor: Colors.border, textAlign: 'center', color: Colors.textPrimary, backgroundColor: '#F8FAFC',
  },
  otpBoxFilled: { borderColor: Colors.dlGreen, backgroundColor: '#FFFFFF' },
  otpBoxError: { borderColor: Colors.error },
  errorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16 },
  errorText: { fontSize: 13, color: Colors.error },
  resendRow: { alignItems: 'center', marginTop: 24 },
  resendActive: { fontSize: 14, color: Colors.dlGreen, fontWeight: '600', textDecorationLine: 'underline' },
  resendTimer: { fontSize: 13, color: Colors.textSecondary },
  verifying: { fontSize: 13, color: Colors.textHint, textAlign: 'center', marginTop: 16 },
});
