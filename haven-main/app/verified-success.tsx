import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  Animated 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

export default function VerifiedSuccessScreen() {
  const insets = useSafeAreaInsets();
  const [countdown, setCountdown] = useState(2);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Fade in effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Auto countdown
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      
      {/* Header Background */}
      <LinearGradient
        colors={['#004771', '#00253B']}
        style={[styles.gradientBackground, { height: height * 0.35 }]}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Navigation Header */}
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={BrandColors.text.white} />
          </TouchableOpacity>
          <Typography variant="bodySemiBold" color={BrandColors.text.white}>
            Step 1 of 3 — Complete
          </Typography>
        </View>

        {/* Step dots */}
        <View style={styles.paginationDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>
          {/* Main Card */}
          <View style={[
            styles.card, 
            { 
              paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40,
              minHeight: height * 0.7 
            }
          ]}>
            {/* Success Checkmark Circle */}
            <View style={styles.successCircleContainer}>
              <View style={styles.successCircleBg}>
                <View style={styles.successCircleInner}>
                  <Ionicons name="checkmark" size={48} color="white" />
                </View>
              </View>
            </View>

            <Typography variant="h1" align="center" style={styles.title}>Partner Verified!</Typography>
            <Typography variant="body" color={BrandColors.text.secondary} align="center" style={styles.subtitle}>
              Welcome, Ravi Kumar
            </Typography>

            {/* Partner ID Badge */}
            <View style={styles.badgeWrapper}>
              <View style={styles.badge}>
                 <View style={styles.swiggyIcon}>
                   <Typography variant="caption" color="white" style={{ fontWeight: '900', fontSize: 10 }}>S</Typography>
                 </View>
                 <Typography variant="caption" color={BrandColors.text.primary} style={styles.badgeText}>
                   SW-CHE-004821
                 </Typography>
              </View>
            </View>

            {/* Info Table */}
            <View style={styles.infoTableContainer}>
              <View style={styles.accentLine} />
              <View style={styles.tableContent}>
                <View style={styles.tableRow}>
                  <Typography variant="body" color={BrandColors.text.secondary}>City</Typography>
                  <Typography variant="bodySemiBold">Chennai</Typography>
                </View>
                <View style={styles.tableRow}>
                  <Typography variant="body" color={BrandColors.text.secondary}>Vehicle</Typography>
                  <Typography variant="bodySemiBold">Petrol Bike</Typography>
                </View>
                <View style={styles.tableRow}>
                  <Typography variant="body" color={BrandColors.text.secondary}>Avg. Weekly Earnings</Typography>
                  <Typography variant="bodySemiBold" style={{ fontSize: 16 }}>Rs.4,200</Typography>
                </View>
              </View>
            </View>

            {/* Next Steps Progress */}
            <View style={styles.nextStepContainer}>
               <View style={styles.nextStepLabelRow}>
                 <Typography variant="caption" color={BrandColors.text.secondary}>
                   Next: Link your identity via DigiLocker
                 </Typography>
                 <Typography variant="caption" color={BrandColors.accent} style={{ fontWeight: '700' }}>
                   33%
                 </Typography>
               </View>
               <View style={styles.progressBarBg}>
                 <View style={styles.progressBarFill} />
               </View>
            </View>

            {/* Action Section */}
            <View style={styles.footer}>
              <Button 
                title="Continue to DigiLocker" 
                variant="secondary"
                onPress={() => router.push('/digilocker')}
                style={styles.continueButton}
              />
              <Typography variant="caption" color={BrandColors.text.muted} align="center" style={styles.autoContinueText}>
                Continuing automatically in {countdown}s
              </Typography>
            </View>
          </View>
        </Animated.View>
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
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 56,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
    marginTop: 12,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeDot: {
    backgroundColor: '#22C55E', // Green
    borderColor: '#22C55E',
  },
  contentWrapper: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: BrandColors.ui.card,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 50,
  },
  successCircleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successCircleBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0FDF4', // Very light green
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badge: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#F1F5F9',
     paddingVertical: 6,
     paddingHorizontal: 12,
     borderRadius: 8,
     gap: 8,
  },
  swiggyIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#FC8019', // Swiggy Orange
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontWeight: '700',
    fontSize: 14,
  },
  infoTableContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 40,
    overflow: 'hidden',
  },
  accentLine: {
    width: 4,
    backgroundColor: '#005B9E',
  },
  tableContent: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextStepContainer: {
     marginBottom: 40,
  },
  nextStepLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
     width: '33%',
     height: '100%',
     backgroundColor: '#005B9E',
     borderRadius: 3,
  },
  footer: {
    marginTop: 'auto',
  },
  continueButton: {
    marginBottom: 16,
    shadowColor: BrandColors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  autoContinueText: {
    fontSize: 13,
    marginBottom: 10,
  },
});
