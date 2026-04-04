import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { FeatureItem } from '@/components/common/feature-item';
import { TelemetryCard } from '@/components/dashboard/telemetry-card';

const { height } = Dimensions.get('window');

/**
 * HomeScreen component displaying the GigShield welcome page.
 * Refactored to use a clean, professional architecture.
 */
export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      
      {/* Deep Blue Header Background */}
      <LinearGradient
        colors={[BrandColors.primary, BrandColors.primaryDark]}
        style={[styles.gradientBackground, { height: height * 0.5 }]}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header Branding */}
          <View style={styles.headerContainer}>
            <View style={styles.logoOuterCircle}>
              <View style={styles.logoInnerCircle}>
                 <Ionicons name="shield" size={32} color={BrandColors.text.white} />
              </View>
            </View>
            <Typography variant="h1" color={BrandColors.text.white}>GigShield</Typography>
            <Typography 
              variant="body" 
              color={BrandColors.text.light} 
              align="center"
              style={styles.brandSubtitle}
            >
              Income Protection for Delivery{'\n'}Partners
            </Typography>
          </View>

          {/* Main Card Section */}
          <View style={[
            styles.mainCard, 
            { 
              paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40,
              minHeight: height * 0.55
            }
          ]}>
            <TelemetryCard workerId="worker-123" />
            <Typography variant="h2">Welcome</Typography>
            <Typography variant="body" style={styles.mainDescription}>
              GigShield provides seamless income protection tailored for delivery partners. Secure your earnings today.
            </Typography>

            {/* Features Listing */}
            <View style={styles.featuresList}>
              <FeatureItem 
                icon={<Ionicons name="shield-checkmark-outline" size={24} color={BrandColors.accent} />}
                iconBg="#E0F2FF"
                title="Verified Partner Only"
                subtitle="Only registered delivery workers can enroll"
              />
              <FeatureItem 
                icon={<FontAwesome6 name="indian-rupee-sign" size={20} color={BrandColors.secondary} />}
                iconBg="#FFF2E6"
                title="Instant Payouts"
                subtitle="Claims paid directly to your UPI account"
              />
              <FeatureItem 
                icon={<Ionicons name="time-outline" size={24} color="#3B82F6" />}
                iconBg="#E8F1FF"
                title="Auto-Claim"
                subtitle="No paperwork — triggers fire automatically"
              />
            </View>

            {/* Main Action Call */}
            <Button 
              title="Get Started" 
              variant="secondary"
              rightIcon={<Ionicons name="arrow-forward" size={18} color="white" />}
              onPress={() => router.push('/verification')}
              style={styles.ctaButton}
            />

            {/* Auth Link */}
            <View style={styles.signInWrapper}>
              <Typography variant="caption" color={BrandColors.text.secondary}>Already enrolled? </Typography>
              <TouchableOpacity onPress={() => {}}>
                <Typography variant="caption" color={BrandColors.accent} style={{ fontWeight: '700' }}>Sign In</Typography>
              </TouchableOpacity>
            </View>

            {/* Security Footer */}
            <View style={styles.securityFooter}>
              <Ionicons name="lock-closed" size={12} color={BrandColors.text.muted} />
              <Typography variant="caption" style={styles.securityText}>
                Your data is protected and never shared
              </Typography>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logoOuterCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoInnerCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  brandSubtitle: {
    marginTop: 8,
    lineHeight: 22,
    fontWeight: '500',
  },
  mainCard: {
    flex: 1,
    backgroundColor: BrandColors.ui.card,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 36,
    shadowColor: BrandColors.ui.shadow,
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 24,
  },
  mainDescription: {
    marginBottom: 32,
  },
  featuresList: {
    gap: 24,
    marginBottom: 40,
  },
  ctaButton: {
    shadowColor: BrandColors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signInWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  securityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  securityText: {
    marginLeft: 6,
    letterSpacing: 0.1,
  },
});
