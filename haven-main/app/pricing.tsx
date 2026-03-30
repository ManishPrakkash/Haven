import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;
const CARD_MARGIN = 16;

const PLANS = [
  {
    id: 'lite',
    name: 'Lite',
    price: '$15',
    period: '/week',
    description: 'Basic coverage for part-time gig workers.',
    buttonText: 'Select Lite',
    recommended: false,
    features: [
      { text: '$500k General Liability', included: true },
      { text: 'Basic Injury Protection', included: true },
      { text: 'Income Replacement', included: false },
    ]
  },
  {
    id: 'economy',
    name: 'Economy',
    price: '$29',
    period: '/week',
    description: 'Per month, billed annually or $35 billed weekly',
    buttonText: 'Select Economy',
    recommended: true,
    tag: 'MOST POPULAR',
    features: [
      { text: '$1M General Liability', included: true },
      { text: 'Comprehensive Injury', included: true },
      { text: 'Income Replacement (70%)', included: true },
      { text: '24/7 Legal Support Line', included: true },
      { text: 'Equipment Protection', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$45',
    period: '/week',
    description: 'Full coverage for full-time independent contractors.',
    buttonText: 'Select Pro',
    recommended: false,
    features: [
      { text: '$2M General Liability', included: true },
      { text: 'Max Injury Protection', included: true },
      { text: 'Income Replacement (100%)', included: true },
      { text: 'Full Equipment Protection', included: true },
    ]
  }
];

export default function PricingScreen() {
  const insets = useSafeAreaInsets();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      
      {/* Dark Teal Header Gradient */}
      <LinearGradient
        colors={['#004771', '#00253B']}
        style={[styles.headerGradient, { height: height * 0.3 }]}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.navButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.logoRow}>
             {/* Replace with your actual logo component if available */}
             <View style={styles.logoIcon}>
                <Ionicons name="shield-checkmark" size={20} color={BrandColors.secondary} />
             </View>
             <Typography variant="h2" color="white" style={styles.logoText}>GigShield</Typography>
          </View>

          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="help-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Pricing Toggle */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            {/* Removed "Pricing" title as requested */}
            
            {/* Billing Toggle */}
            <View style={styles.toggleContainer}>
               <TouchableOpacity 
                  onPress={() => setBillingCycle('annual')}
                  style={[styles.toggleBtn, billingCycle === 'annual' && styles.toggleBtnActive]}
               >
                  <Typography 
                    variant="caption" 
                    color={billingCycle === 'annual' ? 'white' : 'rgba(255,255,255,0.6)'} 
                    style={{ fontWeight: '700' }}
                  >
                    Annual
                  </Typography>
               </TouchableOpacity>
               <TouchableOpacity 
                  onPress={() => setBillingCycle('monthly')}
                  style={[styles.toggleBtn, billingCycle === 'monthly' && styles.toggleBtnActive]}
               >
                  <Typography 
                    variant="caption" 
                    color={billingCycle === 'monthly' ? 'white' : 'rgba(255,255,255,0.6)'} 
                    style={{ fontWeight: '700' }}
                  >
                    Monthly
                  </Typography>
               </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.subtitleRow}>
            <Typography variant="body" color="rgba(255, 255, 255, 0.8)" style={styles.subtitle}>
              Choose the coverage that fits your gig.
            </Typography>
            <View style={styles.stepIndicator}>
               <View style={styles.stepDot} />
               <View style={[styles.stepDot, styles.stepDotActive]} />
               <View style={styles.stepDot} />
            </View>
          </View>
        </View>

        {/* Main Content Card */}
        <View style={styles.contentCard}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {/* Recommendation Alert */}
            <View style={styles.recommendationAlert}>
              <View style={styles.alertIconBg}>
                <Ionicons name="information" size={16} color="#005B9E" />
              </View>
              <View style={styles.alertContent}>
                <Typography variant="bodySemiBold" style={styles.alertTitle}>
                  Based on your profile, we recommend the Economy plan.
                </Typography>
                <Typography variant="caption" color={BrandColors.text.secondary}>
                  Includes the specific liability protections for rideshare drivers.
                </Typography>
              </View>
            </View>

            {/* Horizontal Pricing Scroll */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pricingScrollContent}
              snapToInterval={CARD_WIDTH + CARD_MARGIN}
              decelerationRate="fast"
            >
              {PLANS.map((plan) => (
                <View 
                  key={plan.id} 
                  style={styles.planCard}
                >
                  <Typography variant="h2" style={styles.planName}>{plan.name}</Typography>
                  
                  <View style={styles.priceRow}>
                    <Typography variant="h1" style={styles.priceText}>{plan.price}</Typography>
                    <Typography variant="body" color={BrandColors.text.muted} style={styles.periodText}>{plan.period}</Typography>
                  </View>

                  <Typography variant="caption" color={BrandColors.text.muted} style={styles.planDescription}>
                    {plan.description}
                  </Typography>

                  <Button 
                    title={plan.id === 'economy' ? 'Select Economy' : plan.buttonText}
                    variant="outline"
                    onPress={() => router.push('/review-selection')}
                    style={[
                      styles.planButton,
                      { borderColor: BrandColors.secondary }
                    ]}
                    textStyle={{ color: BrandColors.secondary }}
                  />

                  <Typography variant="bodySemiBold" style={styles.includesLabel}>Includes:</Typography>
                  
                  <View style={styles.featuresList}>
                    {plan.features.map((feature, idx) => (
                      <View key={idx} style={styles.featureItem}>
                        <Ionicons 
                          name={feature.included ? "checkmark-circle" : "close-circle"} 
                          size={18} 
                          color={feature.included ? "#FF761E" : "#CBD5E1"} 
                        />
                        <Typography 
                          variant="caption" 
                          color={feature.included ? BrandColors.text.primary : BrandColors.text.muted} 
                          style={styles.featureText}
                        >
                          {feature.text}
                        </Typography>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity 
                    style={styles.viewDetailsRow}
                    onPress={() => router.push('/plan-details')}
                  >
                    <Typography variant="caption" color={BrandColors.accent} style={styles.viewDetailsText}>
                      View Details
                    </Typography>
                    <Ionicons name="chevron-forward" size={14} color={BrandColors.accent} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </SafeAreaView>
      
      {/* Bottom padding background */}
      <View style={[styles.bottomBg, { height: height * 0.4 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  headerGradient: {
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
    backgroundColor: 'white',
    zIndex: -1,
  },
  safeArea: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleSection: {
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 30,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 36,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 4,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  toggleBtnActive: {
    backgroundColor: '#FF761E', // Orange
  },
  subtitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 15,
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 6,
  },
  stepDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  stepDotActive: {
    width: 12,
    backgroundColor: '#FF761E',
  },
  contentCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 20,
  },
  recommendationAlert: {
    flexDirection: 'row',
    backgroundColor: '#F0F9FF',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    gap: 12,
    marginBottom: 32,
  },
  alertIconBg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
    gap: 2,
  },
  alertTitle: {
    fontSize: 14,
    color: '#00474F',
  },
  pricingScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  planCard: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 24,
    marginHorizontal: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 450,
  },
  recommendedCard: {
    borderColor: '#FF761E',
    borderWidth: 2,
  },
  tagWrapper: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    zIndex: 10,
  },
  recommendedTag: {
    backgroundColor: '#00253B',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 22,
    color: '#00253B',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#00253B',
  },
  periodText: {
    fontSize: 16,
    marginLeft: 4,
  },
  planDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 24,
  },
  planButton: {
    height: 50,
    marginBottom: 32,
  },
  includesLabel: {
    fontSize: 15,
    color: '#00253B',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: 12,
    gap: 4,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '700',
  }
});
