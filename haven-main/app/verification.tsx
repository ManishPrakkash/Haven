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
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';

const { height } = Dimensions.get('window');

const PLATFORMS = [
  { id: 'swiggy', name: 'Swiggy' },
  { id: 'zomato', name: 'Zomato' },
  { id: 'empty1', name: '' },
  { id: 'empty2', name: '' },
];

export default function VerificationScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPlatform, setSelectedPlatform] = useState('swiggy');
  const [partnerId, setPartnerId] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      
      {/* Dark Teal Header Gradient */}
      <LinearGradient
        colors={['#004771', '#00253B']}
        style={[styles.gradientBackground, { height: height * 0.4 }]}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            {/* Pagination Dots */}
            <View style={styles.paginationDots}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

            <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" align="center" style={styles.stepText}>
              STEP 1 OF 3
            </Typography>

            <View style={styles.logoCircle}>
              <Ionicons name="shield-checkmark" size={32} color={BrandColors.text.white} />
            </View>

            <Typography variant="h1" color={BrandColors.text.white} align="center" style={styles.title}>
              Partner Verification
            </Typography>
            <Typography variant="body" color="rgba(255, 255, 255, 0.7)" align="center" style={styles.subtitle}>
              Confirm you're an active delivery partner
            </Typography>
          </View>

          {/* Verification Card */}
          <View style={[
            styles.card, 
            { 
              paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40,
              minHeight: height * 0.65
            }
          ]}>
            <Typography variant="bodySemiBold" style={styles.label}>Which platform do you deliver for?</Typography>
            
            {/* Platform Selection */}
            <View style={styles.platformSelection}>
              {PLATFORMS.map((platform) => (
                <TouchableOpacity
                  key={platform.id}
                  onPress={() => platform.name && setSelectedPlatform(platform.id)}
                  style={[
                    styles.platformItem,
                    selectedPlatform === platform.id && styles.selectedPlatformItem,
                    !platform.name && styles.emptyPlatformItem
                  ]}
                >
                  <Typography 
                    variant="body" 
                    color={selectedPlatform === platform.id ? BrandColors.accent : BrandColors.text.secondary}
                    style={styles.platformText}
                  >
                    {platform.name}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>

            <Input 
              label="Your Delivery Partner ID"
              value={partnerId}
              onChangeText={setPartnerId}
              placeholder="Enter Partner ID"
              rightElement={
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={12} color="#4ADE80" />
                </View>
              }
              containerStyle={styles.idInputContainer}
            />

            <View style={styles.hintContainer}>
              <Ionicons name="information-circle-outline" size={16} color={BrandColors.text.muted} />
              <Typography variant="caption" style={styles.hintText}>
                Find your ID in the Swiggy Partner app profile section.
              </Typography>
            </View>

            {/* Instruction Box */}
            <View style={styles.instructionBox}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#005B9E" />
              <Typography variant="caption" color={BrandColors.accent} style={styles.instructionText}>
                Open Swiggy Partner App → Tap photo → Your ID is shown below name.
              </Typography>
            </View>

            <View style={{ flex: 1 }} />

            {/* CTA */}
            <Button 
              title="Verify My ID" 
              variant="secondary"
              disabled={!partnerId.trim()}
              onPress={() => {
                if (partnerId.trim()) {
                  router.push('/verified-success');
                }
              }}
              style={[
                styles.verifyButton,
                !partnerId.trim() && { opacity: 0.5 }
              ]}
            />

            <View style={styles.lockFooter}>
              <Ionicons name="lock-closed" size={12} color={BrandColors.text.muted} />
              <Typography variant="caption" style={styles.lockText}>
                VERIFICATION IS INSTANT AND FREE
              </Typography>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      
      {/* Back button override for navigation */}
      <TouchableOpacity 
        style={[styles.backButton, { top: insets.top + 10 }]} 
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color={BrandColors.text.white} />
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
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    marginTop: 40,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: '#00A3FF',
    width: 12,
  },
  stepText: {
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 24,
  },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
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
  label: {
    marginBottom: 16,
    fontSize: 16,
  },
  platformSelection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  platformItem: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPlatformItem: {
    borderColor: '#005B9E',
    backgroundColor: '#E0F2FF',
  },
  emptyPlatformItem: {
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  platformText: {
    fontWeight: '600',
  },
  idInputContainer: {
    marginBottom: 8,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EAFFF2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4ADE80',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  hintText: {
    fontSize: 13,
  },
  instructionBox: {
    flexDirection: 'row',
    backgroundColor: '#E6F9FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  instructionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  verifyButton: {
    marginBottom: 16,
    shadowColor: BrandColors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  lockFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  lockText: {
    fontWeight: '700',
    letterSpacing: 0.5,
    fontSize: 11,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});
