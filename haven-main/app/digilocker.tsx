import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  TextInput 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { height } = Dimensions.get('window');

/**
 * DigiLocker Screen component - Step 2 of 3.
 * Designed to match the provided UI design precisely.
 */
export default function DigiLockerScreen() {
  const insets = useSafeAreaInsets();
  const [mobile, setMobile] = useState('');
  const [consent, setConsent] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      
      {/* Green Header Gradient */}
      <LinearGradient
        colors={['#108546', '#065F2F']}
        style={[styles.gradientBackground, { height: height * 0.35 }]}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.headerSpacer} />
        
        {/* Step Indicator Header */}
        <View style={styles.headerContent}>
          <View style={styles.stepInfo}>
            <View style={styles.stepDots}>
              <View style={[styles.dot, styles.dotCompleted]} />
              <View style={[styles.dot, styles.dotActive]}>
                 <View style={styles.dotActiveInner} />
              </View>
              <View style={styles.dot} />
            </View>
            <Typography variant="bodySemiBold" color="white" style={styles.stepText}>
              Step 2 of 3
            </Typography>
          </View>

          {/* DigiLocker Brand */}
          <View style={styles.brandContainer}>
            <View style={styles.logoBox}>
              <Ionicons name="document-text" size={30} color="white" />
            </View>
            <View style={styles.brandTextWrapper}>
              <Typography variant="h1" color="white" style={styles.brandTitle}>DigiLocker</Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" style={styles.brandSubtitle}>
                National Digital Document Repository
              </Typography>
            </View>
          </View>
        </View>

        {/* Main Card */}
        <View style={[
          styles.card, 
          { 
            paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40,
            minHeight: height * 0.72
          }
        ]}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <Typography variant="h2" style={styles.mainTitle}>Link your DigiLocker account</Typography>
            <Typography variant="body" color={BrandColors.text.secondary} style={styles.description}>
              We'll fetch your Aadhaar, PAN, and address from DigiLocker to complete your verification instantly.
            </Typography>

            {/* Document Types Row */}
            <View style={styles.docsRow}>
              <View style={styles.docItem}>
                <View style={[styles.docIconBox, { backgroundColor: '#F0F5FF' }]}>
                  <MaterialCommunityIcons name="card-account-details-outline" size={24} color="#5C7CFA" />
                </View>
                <Typography variant="caption" style={styles.docLabel}>Aadhaar</Typography>
              </View>

              <View style={styles.docItem}>
                <View style={[styles.docIconBox, { backgroundColor: '#F0F9FF' }]}>
                  <FontAwesome5 name="id-card" size={20} color="#005B9E" />
                </View>
                <Typography variant="caption" style={styles.docLabel}>PAN Card</Typography>
              </View>

              <View style={styles.docItem}>
                <View style={[styles.docIconBox, { backgroundColor: '#F0FFF4' }]}>
                  <Ionicons name="home-outline" size={24} color="#22C55E" />
                </View>
                <Typography variant="caption" style={styles.docLabel}>Address</Typography>
              </View>
            </View>

            {/* Mobile Input Section */}
            <Typography variant="bodySemiBold" style={styles.inputLabel}>
              Mobile number linked to DigiLocker
            </Typography>
            <View style={styles.mobileInputContainer}>
              <View style={styles.countryCode}>
                <Typography variant="bodySemiBold" color={BrandColors.text.primary}>+91</Typography>
              </View>
              <TextInput 
                style={styles.mobileInput}
                placeholder="Enter 10-digit mobile"
                placeholderTextColor={BrandColors.text.muted}
                keyboardType="numeric"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
              />
            </View>

            <View style={styles.hintContainer}>
              <Ionicons name="information-circle-outline" size={16} color={BrandColors.text.muted} />
              <Typography variant="caption" color={BrandColors.text.secondary}>
                Use the number registered with your Aadhaar
              </Typography>
            </View>

            {/* Consent Checkbox */}
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => setConsent(!consent)} 
              style={styles.consentRow}
            >
              <View style={[styles.checkbox, consent && styles.checkboxActive]}>
                {consent && <Ionicons name="checkmark" size={12} color="white" />}
              </View>
              <Typography variant="caption" color={BrandColors.text.secondary} style={styles.consentText}>
                I consent to fetching my documents from DigiLocker for identity verification.{' '}
                <Typography variant="caption" color={BrandColors.accent} style={{ fontWeight: '700' }}>
                  Read Privacy Policy
                </Typography>
              </Typography>
            </TouchableOpacity>

            <View style={{ height: 40 }} />

            {/* Action Section */}
            <Button 
              title="Send OTP via SMS" 
              variant="primary"
              disabled={mobile.length !== 10 || !consent}
              onPress={() => {
                if (mobile.length === 10 && consent) {
                  router.push('/otp');
                }
              } }
              style={[
                styles.otpButton,
                (mobile.length !== 10 || !consent) && { opacity: 0.5, backgroundColor: '#94A3B8' }
              ]}
              leftIcon={<Ionicons name="chatbox-ellipses-outline" size={20} color="white" style={{ marginRight: 8 }} />}
            />
            
            <Typography variant="caption" color={BrandColors.text.muted} align="center" style={styles.footerText}>
              An OTP will be sent to this number via SMS for secure authentication with DigiLocker servers.
            </Typography>
          </ScrollView>
        </View>
      </SafeAreaView>

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
  safeArea: {
    flex: 1,
  },
  headerSpacer: {
    height: 40,
  },
  headerContent: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  stepInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  stepDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotCompleted: {
    backgroundColor: '#34D399', // Cyan/Green
    borderColor: '#34D399',
  },
  dotActive: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotActiveInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  stepText: {
    fontSize: 14,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    marginBottom: 32,
  },
  docsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  docItem: {
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  docIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docLabel: {
    fontSize: 13,
    color: BrandColors.text.secondary,
    fontWeight: '500',
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 12,
    color: BrandColors.text.primary,
  },
  mobileInputContainer: {
    flexDirection: 'row',
    height: 58,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  countryCode: {
    width: 60,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  mobileInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: BrandColors.text.primary,
    fontWeight: '500',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 32,
  },
  consentRow: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: BrandColors.accent,
    borderColor: BrandColors.accent,
  },
  consentText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  otpButton: {
    backgroundColor: '#22C55E', // Green
    height: 58,
    borderRadius: 14,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    color: BrandColors.text.muted,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});
