import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { height, width } = Dimensions.get('window');

/**
 * OTP Verification Screen component.
 * Designed to match the provided UI design precisely.
 */
export default function OtpScreen() {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // Countdown timer for resend
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value.length > 0 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit.length > 0);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      
      {/* Green Header Gradient */}
      <LinearGradient
        colors={['#108546', '#065F2F']}
        style={[styles.gradientBackground, { height: height * 0.35 }]}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Progress indicators */}
        <View style={styles.progressContainer}>
           <View style={[styles.progressBar, styles.progressBarCompleted]} />
           <View style={[styles.progressBar, styles.progressBarActive]} />
           <View style={[styles.progressBar, styles.progressBarNext]} />
        </View>

        {/* Header Title section */}
        <View style={styles.headerContent}>
          <View style={styles.logoBox}>
            <Ionicons name="document-lock" size={32} color="white" />
          </View>
          <View style={styles.brandTextWrapper}>
            <Typography variant="h1" color="white" style={styles.brandTitle}>OTP Verification</Typography>
            <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" style={styles.brandSubtitle}>
              Verifying your DigiLocker account
            </Typography>
          </View>
        </View>

        {/* Main Card */}
        <KeyboardAvoidingView 
           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
           style={{ flex: 1 }}
        >
          <View style={[
            styles.card, 
            { 
              paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40,
              minHeight: height * 0.65
            }
          ]}>
            <Typography variant="h2" style={styles.mainTitle}>Enter the OTP</Typography>
            <Typography variant="body" color={BrandColors.text.secondary} style={styles.description}>
              A 6-digit OTP was sent to{' '}
              <Typography variant="bodySemiBold" color={BrandColors.text.primary}>+91 98XXX 43210</Typography>
            </Typography>
            <TouchableOpacity onPress={() => router.back()}>
              <Typography variant="caption" color={BrandColors.accent} style={styles.changeNumber}>
                Change number
              </Typography>
            </TouchableOpacity>

            {/* OTP Inputs */}
            <View style={styles.otpGrid}>
              {otp.map((digit, index) => (
                <View 
                   key={index} 
                   style={[
                     styles.otpBox, 
                     otp[index] !== '' || (index === 0 && otp[0] === '') ? styles.otpBoxActive : null
                   ]}
                >
                  <TextInput
                    ref={(ref) => { inputRefs.current[index] = ref; }}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(v: string) => handleOtpChange(v, index)}
                    onKeyPress={(e: any) => handleKeyPress(e, index)}
                    autoFocus={index === 0}
                  />
                </View>
              ))}
            </View>

            <Typography variant="caption" color={BrandColors.text.secondary} style={styles.resendText}>
              Resend OTP in <Typography variant="caption" color={BrandColors.text.primary} style={{ fontWeight: '700' }}>0:{timer < 10 ? `0${timer}` : timer}</Typography>
            </Typography>

            <View style={{ flex: 1 }} />

            {/* Action Section */}
            <Button 
              title="Verify OTP" 
              variant="primary"
              disabled={!isOtpComplete}
              onPress={() => router.push('/documents-preview')}
              style={[styles.verifyButton, !isOtpComplete && styles.verifyButtonDisabled]}
              textStyle={!isOtpComplete ? styles.verifyButtonTextDisabled : null}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Footer background to match dark green at bottom */}
      <View style={[styles.bottomBg, { height: height * 0.4 }]} />

      {/* Back Button Override */}
      <TouchableOpacity 
        style={[styles.backButton, { top: insets.top + 10 }]} 
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#065F2F',
    zIndex: -1,
  },
  safeArea: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBarCompleted: {
    backgroundColor: '#34D399', // Cyan/Green
  },
  progressBarActive: {
    backgroundColor: '#FFFFFF',
  },
  progressBarNext: {
     backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  brandTextWrapper: {
    gap: 2,
  },
  brandTitle: {
    fontSize: 24,
  },
  brandSubtitle: {
    fontSize: 12,
  },
  card: {
    flex: 1,
    backgroundColor: BrandColors.ui.card,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 36,
    shadowColor: BrandColors.ui.shadow,
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 24,
  },
  mainTitle: {
    fontSize: 22,
    color: '#00474F', // Dark Teal
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  changeNumber: {
    fontWeight: '700',
    marginBottom: 32,
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    width: 48,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  otpBoxActive: {
    borderColor: '#22C55E', // Green
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: BrandColors.text.primary,
  },
  resendText: {
    fontSize: 14,
    color: BrandColors.text.secondary,
  },
  verifyButton: {
    backgroundColor: BrandColors.accent,
    height: 58,
    borderRadius: 14,
  },
  verifyButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
  verifyButtonTextDisabled: {
    color: '#94A3B8',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});
