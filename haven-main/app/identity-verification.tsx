import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { height } = Dimensions.get('window');

const StepItem = ({ 
  number, 
  title, 
  description, 
  color, 
  isLast = false 
}: { 
  number: string, 
  title: string, 
  description: string, 
  color: string,
  isLast?: boolean
}) => (
  <View style={styles.stepRow}>
    <View style={styles.stepLeftColumn}>
      <View style={[styles.stepCircle, { backgroundColor: color }]}>
        <Typography variant="bodySemiBold" color="white" style={{ fontSize: 14 }}>{number}</Typography>
      </View>
      {!isLast && <View style={styles.stepConnector} />}
    </View>
    <View style={styles.stepRightColumn}>
      <Typography variant="bodySemiBold" style={styles.stepTitle}>{title}</Typography>
      <Typography variant="caption" color={BrandColors.text.secondary} style={styles.stepDescription}>
        {description}
      </Typography>
    </View>
  </View>
);

export default function IdentityVerificationScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#004771', '#007A8B', '#00253B']}
        locations={[0, 0.5, 1]}
        style={[styles.gradientBackground, { height: height * 0.45 }]}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Custom Header */}
        <View style={styles.customHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Typography variant="bodySemiBold" color="white" style={{ fontSize: 16 }}>
            Identity Verification
          </Typography>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Progress Indicator */}
          <View style={styles.progressSection}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
            </View>
            <Typography variant="caption" color="rgba(255, 255, 255, 0.8)" style={styles.stepText}>
              STEP 4 OF 4
            </Typography>
          </View>

          {/* Hero Content */}
          <View style={styles.heroContainer}>
            <View style={styles.faceIconCircle}>
              <MaterialCommunityIcons name="face-man-profile" size={32} color="white" />
            </View>
            <Typography variant="h1" color="white" align="center" style={styles.mainTitle}>
              Verify Your Identity
            </Typography>
            <Typography variant="body" color="rgba(255, 255, 255, 0.7)" align="center" style={styles.mainSubtitle}>
              Takes less than 60 seconds
            </Typography>
          </View>

          {/* Card Section */}
          <View style={[
            styles.card, 
            { paddingBottom: Math.max(insets.bottom, 20) + 40 }
          ]}>
            <Typography variant="h4" style={styles.cardHeading}>
              We need to confirm it's really you
            </Typography>
            <Typography variant="body" color={BrandColors.text.secondary} style={styles.cardInfoText}>
              As required by IRDAI guidelines, we conduct a quick identity check before issuing your policy. This includes a selfie match with your DigiLocker photo.
            </Typography>

            {/* Steps */}
            <View style={styles.stepsContainer}>
              <StepItem 
                number="1" 
                title="Selfie Check" 
                description="Take a quick selfie — we compare it to your DigiLocker photo"
                color="#00A381"
              />
              <StepItem 
                number="2" 
                title="Liveness Test" 
                description="Blink or smile to confirm you're physically present"
                color="#FF761E"
              />
              <StepItem 
                number="3" 
                title="Digital Consent" 
                description="Sign with your finger to acknowledge your agreement"
                color="#2E3A59"
                isLast
              />
            </View>

            {/* Camera Access Hint */}
            <View style={styles.hintBox}>
              <View style={styles.hintIconContainer}>
                <Ionicons name="videocam" size={20} color="#B45309" />
              </View>
              <Typography variant="caption" color="#92400E" style={styles.hintText}>
                This step requires camera access. We do not store your selfie video. Only a still frame comparison is performed.
              </Typography>
            </View>

            <View style={{ flex: 1, minHeight: 40 }} />

            {/* Actions */}
            <Button 
              title="Begin Verification" 
              variant="secondary"
              onPress={() => router.push('/face-verification')}
              style={styles.beginButton}
            />

            <TouchableOpacity 
              onPress={() => router.push('/(tabs)')} 
              style={styles.skipButton}
            >
              <Typography variant="body" color={BrandColors.text.secondary} style={styles.skipText}>
                Skip for now — verify later
              </Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  progressSection: {
    paddingHorizontal: 24,
    marginTop: 10,
    alignItems: 'center',
  },
  progressTrack: {
    flexDirection: 'row',
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    gap: 6,
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressSegmentActive: {
    backgroundColor: '#FFFFFF',
  },
  stepText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  faceIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  mainTitle: {
    fontSize: 28,
    marginBottom: 4,
    fontWeight: '700',
  },
  mainSubtitle: {
    fontSize: 15,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 20,
  },
  cardHeading: {
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  cardInfoText: {
    lineHeight: 20,
    fontSize: 14,
    marginBottom: 32,
  },
  stepsContainer: {
    marginBottom: 32,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  stepLeftColumn: {
    alignItems: 'center',
    width: 32,
    marginRight: 16,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  stepRightColumn: {
    flex: 1,
    paddingBottom: 24,
  },
  stepTitle: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  stepDescription: {
    lineHeight: 18,
  },
  hintBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  hintIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  hintText: {
    flex: 1,
    lineHeight: 18,
    fontSize: 12,
    fontWeight: '500',
  },
  beginButton: {
    backgroundColor: '#FF761E',
    height: 56,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#FF761E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  }
});
