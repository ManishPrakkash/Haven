import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Platform as RNPlatform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

const { width } = Dimensions.get('window');

const TABS = ['Overview', 'Coverage', 'Claims', 'Legal'];

export default function PlanDetailsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Overview');
  const [expandedSection, setExpandedSection] = useState<string | null>('Rain Trigger');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent />
      
      {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#00253B" />
          </TouchableOpacity>
          <Typography variant="bodySemiBold" style={styles.headerTitle}>Economy Plan</Typography>
          <View style={{ width: 40 }} />
        </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={['#004771', '#00253B']}
          style={styles.heroSection}
        >
          <View style={styles.heroTag}>
            <Typography variant="caption" color="white" style={{ fontWeight: '800', fontSize: 10 }}>
              POPULAR FOR DELIVERY PARTNERS
            </Typography>
          </View>
          <Typography variant="h1" color="white" style={styles.heroTitle}>Economy</Typography>
          <Typography variant="body" color="rgba(255,255,255,0.8)" style={styles.heroSubtitle}>
            Essential protection for daily earners. Stay covered against weather disruptions and health emergencies.
          </Typography>
          
          <View style={styles.priceBadge}>
            <Typography variant="h2" color="white" style={styles.priceText}>
              {'Rs. 59 '}
              <Typography variant="caption" color="white">/ week</Typography>
            </Typography>
          </View>
        </LinearGradient>

        {/* Tab Selection */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
            {TABS.map((tab) => (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setActiveTab(tab)}
                style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              >
                <Typography 
                  variant="caption" 
                  color={activeTab === tab ? '#00253B' : '#64748B'} 
                  style={[styles.tabText, activeTab === tab && styles.activeTabText]}
                >
                  {tab}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* What's Covered */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>What's Covered</Typography>
          
          <View style={styles.coveredCard}>
             <View style={[styles.coveredIconContainer, { backgroundColor: '#F0F9FF' }]}>
               <Ionicons name="cloud-outline" size={20} color="#005B9E" />
             </View>
             <View style={styles.coveredContent}>
               <Typography variant="bodySemiBold">Rain Protection</Typography>
               <Typography variant="caption" color="#64748B">Payout if rain {'<'} 5mm/hr during shift</Typography>
             </View>
          </View>

          <View style={[styles.coveredCard, { borderLeftColor: '#FF761E' }]}>
             <View style={[styles.coveredIconContainer, { backgroundColor: '#FFF7ED' }]}>
               <Ionicons name="sunny-outline" size={20} color="#FF761E" />
             </View>
             <View style={styles.coveredContent}>
               <Typography variant="bodySemiBold">Air Quality Index</Typography>
               <Typography variant="caption" color="#64748B">Protection when AQI exceeds 400</Typography>
             </View>
          </View>

          <View style={[styles.coveredCard, { borderLeftColor: '#EF4444' }]}>
             <View style={[styles.coveredIconContainer, { backgroundColor: '#FEF2F2' }]}>
               <Ionicons name="thermometer-outline" size={20} color="#EF4444" />
             </View>
             <View style={styles.coveredContent}>
               <Typography variant="bodySemiBold">Heat Wave</Typography>
               <Typography variant="caption" color="#64748B">Coverage for temps above 45°C</Typography>
             </View>
          </View>
        </View>

        {/* What's Not Covered */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>What's Not Covered</Typography>
          <View style={styles.notCoveredItem}>
            <Ionicons name="remove-circle-outline" size={16} color="#CBD5E1" />
            <Typography variant="body" color="#64748B" style={styles.notCoveredText}>Pre-existing injuries</Typography>
          </View>
          <View style={styles.notCoveredItem}>
            <Ionicons name="remove-circle-outline" size={16} color="#CBD5E1" />
            <Typography variant="body" color="#64748B" style={styles.notCoveredText}>Mechanical breakdowns</Typography>
          </View>
        </View>

        {/* Weekly Premium Breakdown */}
        <View style={styles.breakdownCard}>
          <Typography variant="bodySemiBold" color="white" style={styles.breakdownTitle}>Weekly Premium Breakdown</Typography>
          
          <View style={styles.breakdownRow}>
            <Typography variant="caption" color="rgba(255,255,255,0.7)">Base Protection</Typography>
            <Typography variant="caption" color="white">Rs. 42.00</Typography>
          </View>
          <View style={styles.breakdownRow}>
            <Typography variant="caption" color="rgba(255,255,255,0.7)">Weather Surcharge</Typography>
            <Typography variant="caption" color="white">Rs. 8.50</Typography>
          </View>
          <View style={styles.breakdownRow}>
            <Typography variant="caption" color="rgba(255,255,255,0.7)">Platform Fee</Typography>
            <Typography variant="caption" color="white">Rs. 3.50</Typography>
          </View>
          
          <View style={styles.breakdownDivider} />
          
          <View style={styles.breakdownRow}>
            <Typography variant="bodySemiBold" color="white">Total Payable</Typography>
            <Typography variant="h3" color="#FF761E">Rs. 59.00</Typography>
          </View>
        </View>

        {/* Key Policy Terms */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Key Policy Terms</Typography>
          <View style={styles.termsGrid}>
            <View style={styles.termBox}>
              <Typography variant="caption" color="#94A3B8" style={styles.termLabel}>MAX PAYOUT</Typography>
              <Typography variant="bodySemiBold">₹15,000</Typography>
            </View>
            <View style={styles.termBox}>
              <Typography variant="caption" color="#94A3B8" style={styles.termLabel}>WAITING PERIOD</Typography>
              <Typography variant="bodySemiBold">24 Hrs</Typography>
            </View>
            <View style={styles.termBox}>
              <Typography variant="caption" color="#94A3B8" style={styles.termLabel}>VALID FOR</Typography>
              <Typography variant="bodySemiBold">7 Days</Typography>
            </View>
            <View style={styles.termBox}>
              <Typography variant="caption" color="#94A3B8" style={styles.termLabel}>CANCELLATIONS</Typography>
              <Typography variant="bodySemiBold">No Refund</Typography>
            </View>
            <View style={styles.termBox}>
              <Typography variant="caption" color="#94A3B8" style={styles.termLabel}>GEO-FENCE</Typography>
              <Typography variant="bodySemiBold">City-wide</Typography>
            </View>
            <View style={styles.termBox}>
              <Typography variant="caption" color="#94A3B8" style={styles.termLabel}>CLAIMS/MAX</Typography>
              <Typography variant="bodySemiBold">Unlimited</Typography>
            </View>
          </View>
        </View>

        {/* Detailed Conditions */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Detailed Conditions</Typography>
          
          <TouchableOpacity 
            style={styles.accordionHeader} 
            onPress={() => setExpandedSection(expandedSection === 'Rain Trigger' ? null : 'Rain Trigger')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name="umbrella-outline" size={20} color="#005B9E" />
              <Typography variant="bodySemiBold">Rain Trigger</Typography>
            </View>
            <Ionicons 
              name={expandedSection === 'Rain Trigger' ? "chevron-up" : "chevron-down"} 
              size={20} color="#64748B" 
            />
          </TouchableOpacity>
          {expandedSection === 'Rain Trigger' && (
            <View style={styles.accordionPadding}>
              <Typography variant="caption" color="#64748B" style={{ lineHeight: 18 }}>
                Payout is triggered when official meteorological data for your registered city records rainfall exceeding 5mm per hour during your active shift hours.
              </Typography>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.accordionHeader, { marginTop: 12 }]} 
            onPress={() => setExpandedSection(expandedSection === 'Extreme Heat' ? null : 'Extreme Heat')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name="sunny-outline" size={20} color="#FF761E" />
              <Typography variant="bodySemiBold">Extreme Heat</Typography>
            </View>
            <Ionicons 
              name={expandedSection === 'Extreme Heat' ? "chevron-up" : "chevron-down"} 
              size={20} color="#64748B" 
            />
          </TouchableOpacity>
          {expandedSection === 'Extreme Heat' && (
            <View style={styles.accordionPadding}>
              <Typography variant="caption" color="#64748B" style={{ lineHeight: 18 }}>
                Payout is triggered if the temperature exceeds 45°C in your shift area.
              </Typography>
            </View>
          )}
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Typography variant="h3" align="center" style={styles.sectionTitle}>How It Works</Typography>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}>
              <Typography variant="bodySemiBold" color="white">1</Typography>
            </View>
            <Typography variant="bodySemiBold" style={{ marginTop: 12 }}>Go-Online</Typography>
            <Typography variant="caption" color="#64748B" align="center">Start your shift on your partner app.</Typography>
          </View>

          <View style={styles.stepConnector} />

          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}>
              <Typography variant="bodySemiBold" color="white">2</Typography>
            </View>
            <Typography variant="bodySemiBold" style={{ marginTop: 12 }}>Event Triggered</Typography>
            <Typography variant="caption" color="#64748B" align="center">Weather sensor detects a payout event.</Typography>
          </View>

          <View style={styles.stepConnector} />

          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}>
              <Typography variant="bodySemiBold" color="white">3</Typography>
            </View>
            <Typography variant="bodySemiBold" style={{ marginTop: 12 }}>Instant Payout</Typography>
            <Typography variant="caption" color="#64748B" align="center">Money is credited to your GigShield wallet.</Typography>
          </View>
        </View>

        {/* Payout Process */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Payout Process</Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.processScroll}>
             <View style={styles.processBox}>
                <Typography variant="bodySemiBold" color="#005B9E" style={{ fontSize: 10 }}>#01</Typography>
                <Typography variant="caption" color="#00253B" style={{ fontWeight: '700' }}>Detection</Typography>
             </View>
             <View style={styles.processBox}>
                <Typography variant="bodySemiBold" color="#005B9E" style={{ fontSize: 10 }}>#02</Typography>
                <Typography variant="caption" color="#00253B" style={{ fontWeight: '700' }}>Verification</Typography>
             </View>
             <View style={styles.processBox}>
                <Typography variant="bodySemiBold" color="#005B9E" style={{ fontSize: 10 }}>#03</Typography>
                <Typography variant="caption" color="#00253B" style={{ fontWeight: '700' }}>Approval</Typography>
             </View>
             <View style={styles.processBox}>
                <Typography variant="bodySemiBold" color="#005B9E" style={{ fontSize: 10 }}>#04</Typography>
                <Typography variant="caption" color="#00253B" style={{ fontWeight: '700' }}>Transfer</Typography>
             </View>
          </ScrollView>

          <View style={styles.payoutMethodCard}>
            <View style={styles.payoutMethodInfo}>
               <Typography variant="bodySemiBold">Payout Methods</Typography>
               <Typography variant="caption" color="#64748B">UPI, Bank Transfer, or Wallet</Typography>
            </View>
            <View style={styles.methodIcons}>
               <View style={styles.methodIcon}><Ionicons name="card-outline" size={16} color="#005B9E" /></View>
               <View style={styles.methodIcon}><Ionicons name="wallet-outline" size={16} color="#005B9E" /></View>
            </View>
          </View>
        </View>

        {/* Policy Documents */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Policy Documents</Typography>
          <View style={styles.docCard}>
            <Typography variant="bodySemiBold" color="#005B9E" style={{ textDecorationLine: 'underline', marginBottom: 12 }}>
              Terms & Conditions - Economy Plan v2.4
            </Typography>
            
            {[
              "Coverage is only applicable during the active hours logged on partnered gig platforms.",
              "Weather data is sourced from India Meteorological Department (IMD) or verified 3rd party hyper-local sensors.",
              "The insurer reserves the right to audit gig platform activity logs to verify claims.",
              "Fraudulent claim attempts will lead to immediate policy termination without refund."
            ].map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <Typography variant="caption" style={{ width: 20 }}>{`${index + 1}.`}</Typography>
                <Typography variant="caption" color="#64748B" style={{ flex: 1, lineHeight: 18 }}>{point}</Typography>
              </View>
            ))}

            <TouchableOpacity style={styles.downloadBtn}>
               <Ionicons name="download-outline" size={20} color="#64748B" />
               <Typography variant="bodySemiBold" color="#64748B" style={{ marginLeft: 10 }}>Download Full Policy PDF</Typography>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60 + 20, // Rough estimate with inset
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: '#00253B',
  },
  heroSection: {
    padding: 24,
    paddingTop: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heroTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 32,
  },
  priceBadge: {
    backgroundColor: '#FF761E',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
  },
  tabsContainer: {
    backgroundColor: 'white',
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    gap: 30,
    paddingBottom: 12,
  },
  tabItem: {
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: '#005B9E',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#00253B',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#00253B',
    marginBottom: 20,
  },
  coveredCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderLeftWidth: 4,
    borderLeftColor: '#005B9E',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  coveredIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coveredContent: {
    flex: 1,
    gap: 4,
  },
  notCoveredItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  notCoveredText: {
    fontSize: 14,
  },
  breakdownCard: {
    backgroundColor: '#00253B',
    margin: 24,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  breakdownTitle: {
    fontSize: 15,
    marginBottom: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 4,
  },
  termsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  termBox: {
    width: (width - 48 - 12) / 2,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 4,
  },
  termLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  accordionPadding: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#F1F5F9',
    marginTop: -8,
    zIndex: -1,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#005B9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepConnector: {
    width: 2,
    height: 30,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
  },
  processScroll: {
    gap: 12,
    paddingRight: 24,
  },
  processBox: {
    width: width * 0.22,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 4,
  },
  payoutMethodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E2EEF5',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  payoutMethodInfo: {
    gap: 4,
  },
  methodIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  methodIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#94A3B8',
  },
  docCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  pointRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
  }
});
