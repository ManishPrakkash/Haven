import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

export default function IdentityVerifiedSummaryScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
        duration: 3500,
        useNativeDriver: false,
      })
    ]).start();

    // Auto-navigate to pricing after 3.5 seconds
    const timer = setTimeout(() => {
      router.replace('/pricing');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
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
          {/* Success Checkmark Card Icon */}
          <View style={styles.successIconWrapper}>
            <View style={styles.successIconBox}>
               <Ionicons name="checkmark-circle" size={80} color="white" />
            </View>
          </View>

          <Typography variant="h1" align="center" color="white" style={styles.title}>
            Identity Verified
          </Typography>
          
          <Typography variant="body" align="center" color="rgba(255, 255, 255, 0.6)" style={styles.subtitle}>
            Your policy agreement is signed and verified
          </Typography>

          {/* Verification Status Card */}
          <View style={styles.verificationCard}>
            <View style={styles.verificationRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                <Typography variant="bodySemiBold" style={styles.rowLabel}>Selfie Match</Typography>
              </View>
              <Typography variant="caption" color={BrandColors.text.muted} style={styles.rowStatus}>VERIFIED</Typography>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.verificationRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                <Typography variant="bodySemiBold" style={styles.rowLabel}>Liveness Confirmed</Typography>
              </View>
              <Typography variant="caption" color={BrandColors.text.muted} style={styles.rowStatus}>VERIFIED</Typography>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.verificationRow}>
              <View style={styles.rowLeft}>
                <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                <Typography variant="bodySemiBold" style={styles.rowLabel}>Signature Captured</Typography>
              </View>
              <Typography variant="caption" color={BrandColors.text.muted} style={styles.rowStatus}>VERIFIED</Typography>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Progress Section */}
        <View style={styles.footer}>
          <Typography variant="caption" align="center" color="rgba(255, 255, 255, 0.6)" style={styles.footerText}>
            Moving to payment...
          </Typography>
          
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
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
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
    marginTop: -height * 0.05,
  },
  successIconWrapper: {
    marginBottom: 32,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  successIconBox: {
    width: 140,
    height: 140,
    borderRadius: 30,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 48,
    maxWidth: '80%',
  },
  verificationCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLabel: {
    fontSize: 15,
    color: '#1E293B',
  },
  rowStatus: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#67E8F9',
  },
  footerText: {
    fontSize: 13,
  }
});
