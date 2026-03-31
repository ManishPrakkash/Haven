import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';

import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

export default function PaymentProcessingScreen() {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotation animation
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();

    // Navigate to success after delay
    const timer = setTimeout(() => {
      router.replace('/payment-success');
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
      
      <SafeAreaView style={styles.content}>
        {/* Subtle Background Ripples (Visual Mock) */}
        <View style={styles.rippleContainer}>
           <View style={[styles.ripple, { width: width * 0.6, height: width * 0.6 }]} />
           <View style={[styles.ripple, { width: width * 1.0, height: width * 1.0 }]} />
           <View style={[styles.ripple, { width: width * 1.5, height: width * 1.5 }]} />
        </View>

        <View style={styles.centerContent}>
          {/* Circular Loader */}
          <View style={styles.loaderWrapper}>
            <View style={styles.loaderBase} />
            <Animated.View style={[styles.loaderFill, { transform: [{ rotate: spin }] }]} />
          </View>

          <Typography variant="h3" align="center" style={styles.title}>
            Processing Payment...
          </Typography>
          
          <Typography variant="body" align="center" color="#64748B" style={styles.subtitle}>
            Sending Rs.69.62 to GigShield via UPI
          </Typography>

          {/* Horizontal Progress Bar */}
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

        {/* Warning Footer */}
        <View style={styles.footer}>
           <View style={styles.warningBox}>
              <Ionicons name="warning" size={18} color="#475569" style={{ marginRight: 8 }} />
              <Typography variant="caption" color="#475569" style={{ fontWeight: '600' }}>
                Do not press Back or close the app
              </Typography>
           </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rippleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  ripple: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  centerContent: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  loaderWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  loaderBase: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#F1F5F9',
    position: 'absolute',
  },
  loaderFill: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: 'transparent',
    borderTopColor: '#22C55E',
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 40,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22C55E',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    paddingHorizontal: 40,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
