import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../../services/mock.services';
import { useAuthStore } from '../../store/auth.store';
import { useUserStore } from '../../store/user.store';
import { Colors } from '../../constants/colors';
import * as SecureStore from 'expo-secure-store';

export default function SetupCompleteScreen() {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { setLoggedIn, registrationToken, tempPhone } = useAuthStore();
  const { data: worker } = useUserStore();

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    async function completeSetup() {
      try {
        const result = await authService.completeRegistration({
          phone: tempPhone || '',
          workerId: worker?.workerId || '',
          name: worker?.name || '',
          city: worker?.city || '',
          cityCode: worker?.cityCode || '',
          vehicleType: worker?.vehicleType || '',
          weeklyHours: worker?.weeklyHours || 0,
          weeklyEarnings: worker?.weeklyEarnings || 0,
          kycName: worker?.name || '',
          kycAadhaarMasked: 'XXXX-XXXX-4821',
          kycAadhaarHash: 'mock-hash',
          kycPan: 'ABCDE1234F',
          kycDob: '1995-03-15',
          kycAddress: '42 Anna Nagar, Chennai',
          registrationToken: registrationToken || '',
        });

        await SecureStore.setItemAsync('access_token', result.accessToken);
        await SecureStore.setItemAsync('refresh_token', result.refreshToken);
        await SecureStore.setItemAsync('user_id', result.userId);
        setLoggedIn(result.userId);

        setTimeout(() => {
          router.replace('/(main)/plans');
        }, 2500);
      } catch (err) {
        console.error('Registration failed:', err);
        setTimeout(() => {
          router.replace('/(main)/plans');
        }, 2500);
      }
    }

    completeSetup();
  }, []);

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.checkContainer, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={48} color="#FFFFFF" />
        </View>
      </Animated.View>

      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>You're All Set!</Text>
        <Text style={styles.subtitle}>Your account has been created successfully</Text>

        <View style={styles.nextSteps}>
          <View style={styles.nextStep}>
            <View style={styles.nextStepIcon}>
              <Ionicons name="shield" size={18} color={Colors.teal} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nextStepTitle}>Choose Your Plan</Text>
              <Text style={styles.nextStepDesc}>Select the protection that fits your needs</Text>
            </View>
          </View>
          <View style={styles.nextStep}>
            <View style={styles.nextStepIcon}>
              <Ionicons name="card" size={18} color={Colors.orange} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nextStepTitle}>Quick Enrollment</Text>
              <Text style={styles.nextStepDesc}>Sign agreement and make your first payment</Text>
            </View>
          </View>
          <View style={styles.nextStep}>
            <View style={styles.nextStepIcon}>
              <Ionicons name="flash" size={18} color={Colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nextStepTitle}>Instant Protection</Text>
              <Text style={styles.nextStepDesc}>Your policy starts immediately after enrollment</Text>
            </View>
          </View>
        </View>

        <Text style={styles.redirectText}>Redirecting to plan selection...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', padding: 32 },
  checkContainer: { marginBottom: 32 },
  checkCircle: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.success,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.success, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8,
  },
  textContainer: { alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: 15, color: Colors.textSecondary, marginTop: 8, textAlign: 'center' },
  nextSteps: { marginTop: 40, gap: 16, width: '100%' },
  nextStep: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#F8FAFC', padding: 16, borderRadius: 14 },
  nextStepIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  nextStepTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  nextStepDesc: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  redirectText: { fontSize: 13, color: Colors.textHint, marginTop: 32 },
});
