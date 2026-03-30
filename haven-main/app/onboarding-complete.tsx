import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Animated,
  StatusBar as RNStatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

/**
 * Onboarding Complete Screen
 * Shows a final success state before redirecting to the dashboard.
 */
export default function OnboardingCompleteScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false, // Width animation
      })
    ]).start();

    // Auto-navigate to dashboard after 3.5 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <SafeAreaView style={styles.content}>
        <Animated.View 
          style={[
            styles.mainContent, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Success Checkmark Circle */}
          <View style={styles.successCircleWrapper}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={64} color="#FF761E" />
            </View>
          </View>

          <Typography variant="h1" align="center" color="white" style={styles.title}>
            You're all set, Ravi!
          </Typography>
          
          <Typography variant="body" align="center" color="rgba(255, 255, 255, 0.7)" style={styles.subtitle}>
            Your GigShield account is active
          </Typography>

          {/* Status Info Card */}
          <View style={styles.statusCard}>
            {/* Partner ID */}
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { borderColor: '#2DD4BF' }]} />
              <Typography variant="caption" color="rgba(255, 255, 255, 0.4)" align="center" style={styles.label}>
                Partner ID
              </Typography>
              <Typography variant="bodySemiBold" color="white" align="center" style={styles.value}>
                SW-CHE...
              </Typography>
            </View>

            <View style={styles.divider} />

            {/* KYC Status */}
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { borderColor: '#FF761E' }]} />
              <Typography variant="caption" color="rgba(255, 255, 255, 0.4)" align="center" style={styles.label}>
                KYC Status
              </Typography>
              <Typography variant="bodySemiBold" color="#10B981" align="center" style={styles.value}>
                Verified
              </Typography>
            </View>

            <View style={styles.divider} />

            {/* Policy Status */}
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { borderColor: '#2DD4BF' }]} />
              <Typography variant="caption" color="rgba(255, 255, 255, 0.4)" align="center" style={styles.label}>
                Policy
              </Typography>
              <Typography variant="bodySemiBold" color="white" align="center" style={styles.value}>
                Not enrolled
              </Typography>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Progress Section */}
        <View style={styles.footer}>
          <View style={styles.progressBarContainer}>
            <Animated.View 
              style={[
                styles.progressBarFill, 
                { 
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  }) 
                }
              ]} 
            />
          </View>
          <Typography variant="caption" align="center" color="rgba(255, 255, 255, 0.6)" style={styles.footerText}>
            Taking you to your dashboard...
          </Typography>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3D', // More accurate deep navy blue
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    alignItems: 'center',
    width: '100%',
    marginTop: -height * 0.1,
  },
  successCircleWrapper: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  successCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    letterSpacing: 0.3,
    marginBottom: 60,
  },
  statusCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  progressBarContainer: {
    width: width * 0.7,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2DD4BF', // Bright Teal
  },
  footerText: {
    fontSize: 12,
  }
});
