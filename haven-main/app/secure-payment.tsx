import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

const FooterBadge = ({ icon, label }: { icon: any, label: string }) => (
  <View style={styles.footerBadge}>
    <Ionicons name={icon} size={14} color="#64748B" />
    <Typography variant="caption" color="#64748B" style={styles.footerBadgeText}>{label}</Typography>
  </View>
);

const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <TouchableOpacity style={styles.navItem}>
    <Ionicons name={icon} size={24} color={active ? '#FF761E' : '#94A3B8'} />
    <Typography variant="caption" style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Typography>
  </TouchableOpacity>
);

export default function SecurePaymentScreen() {
  const [upiId, setUpiId] = useState('yourname@upi');
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'netbanking'>('upi');

  const handlePay = () => {
    // Payment logic or success navigation
    router.replace('/onboarding-complete');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" translucent />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="lock-closed" size={16} color="#059669" style={{ marginRight: 6 }} />
            <Typography variant="bodySemiBold" style={styles.headerTitle}>Secure Payment</Typography>
          </View>
          <View style={styles.sslBadge}>
            <Ionicons name="shield-checkmark-outline" size={12} color="#059669" style={{ marginRight: 4 }} />
            <Typography variant="caption" style={styles.sslText}>256-BIT SSL</Typography>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Green Hero Section */}
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.heroSection}
          >
            <View style={styles.rupeeCircle}>
               <MaterialCommunityIcons name="currency-inr" size={32} color="white" />
            </View>
            <Typography variant="bodySemiBold" color="white" style={styles.premiumTitle}>First Week's Premium</Typography>
            <Typography variant="h1" color="white" style={styles.amountText}>Rs.59</Typography>
            <Typography variant="caption" color="white" style={styles.planInfo}>Economy Plan — Weekly Auto-debit</Typography>
          </LinearGradient>

          {/* Price Breakdown Card */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Typography variant="body" color="#64748B">Plan (Economy Plan)</Typography>
              <Typography variant="bodySemiBold">Rs.59</Typography>
            </View>
            <View style={styles.breakdownRow}>
              <Typography variant="body" color="#64748B">GST 18%</Typography>
              <Typography variant="bodySemiBold">Rs.10.62</Typography>
            </View>
            <View style={styles.totalDivider} />
            <View style={styles.breakdownRow}>
              <Typography variant="bodySemiBold">Total</Typography>
              <Typography variant="h4" style={{ fontSize: 20 }}>Rs.69.62</Typography>
            </View>
            <Typography variant="caption" color="#94A3B8" style={styles.gstNote}>
              GST @18% as mandated by IRDAI. GST certificate will be provided with policy document.
            </Typography>
          </View>

          {/* Payment Methods */}
          <View style={styles.paymentMethodsSection}>
             <Typography variant="bodySemiBold" style={styles.sectionTitle}>Pay with</Typography>

             {/* UPI Option */}
             <TouchableOpacity 
               style={[
                 styles.methodCard, 
                 selectedMethod === 'upi' && styles.methodCardActive
               ]}
               onPress={() => setSelectedMethod('upi')}
             >
                <View style={styles.methodHeader}>
                   <View style={styles.methodIconContainer}>
                      <Ionicons name="card-outline" size={20} color="#059669" />
                   </View>
                   <View style={styles.methodLabelContainer}>
                      <Typography variant="bodySemiBold">UPI — Instant <View style={styles.instantBadge}><Typography variant="caption" style={styles.instantText}>INSTANT</Typography></View></Typography>
                   </View>
                   <View style={[styles.radioButton, selectedMethod === 'upi' && styles.radioButtonActive]}>
                      {selectedMethod === 'upi' && <View style={styles.radioButtonInner} />}
                   </View>
                </View>
                {selectedMethod === 'upi' && (
                  <View style={styles.upiInputContainer}>
                    <TextInput 
                      value={upiId} 
                      onChangeText={setUpiId}
                      style={styles.upiInput}
                      placeholder="yourname@upi"
                    />
                    <TouchableOpacity>
                       <Typography variant="caption" color="#059669" style={{ fontWeight: '700' }}>Verify UPI</Typography>
                    </TouchableOpacity>
                  </View>
                )}
             </TouchableOpacity>

             {/* Net Banking Option */}
             <TouchableOpacity 
               style={[
                 styles.methodCard, 
                 selectedMethod === 'netbanking' && styles.methodCardActive,
                 { opacity: 0.6 }
               ]}
               onPress={() => setSelectedMethod('netbanking')}
             >
                <View style={styles.methodHeader}>
                   <View style={styles.methodIconContainer}>
                      <Ionicons name="business-outline" size={20} color="#94A3B8" />
                   </View>
                   <View style={{ flex: 1 }}>
                      <Typography variant="body" color="#94A3B8">Net Banking / Bank Transfer</Typography>
                      <Typography variant="caption" color="#94A3B8">T+1 day</Typography>
                   </View>
                   <View style={styles.radioButton} />
                </View>
             </TouchableOpacity>
          </View>

          {/* Authorization Note */}
          <View style={styles.authNoteBox}>
             <View style={styles.authIconContainer}>
                <Ionicons name="information-circle" size={20} color="#92400E" />
             </View>
             <Typography variant="caption" color="#92400E" style={styles.authNoteText}>
               By proceeding, you authorize GigShield to automatically deduct Rs.59 every Monday for your weekly premium. You can cancel anytime from My Policy. First deduction is immediate.
             </Typography>
          </View>

          {/* Trust Badges */}
          <View style={styles.trustBadgesRow}>
             <View style={styles.trustColumn}>
                <FooterBadge icon="lock-closed-outline" label="ENCRYPTED" />
                <FooterBadge icon="shield-checkmark-outline" label="IRDAI LICENSED" />
             </View>
             <View style={styles.trustColumn}>
               <FooterBadge icon="shield-outline" label="SECURED BY RAZORPAY" />
               <FooterBadge icon="checkmark-circle-outline" label="100% SAFE" />
             </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Fixed Footer with Button and Navigation */}
        <View style={styles.fixedFooter}>
          <Button 
            title="Pay Rs.69.62 Now" 
            onPress={handlePay}
            style={styles.payButton}
            leftIcon={<Ionicons name="lock-closed" size={18} color="white" />}
          />
          
          <View style={styles.bottomNav}>
            <NavItem icon="home-outline" label="HOME" />
            <NavItem icon="shield-outline" label="POLICIES" />
            <NavItem icon="wallet-outline" label="PAYMENTS" active />
            <NavItem icon="help-circle-outline" label="SUPPORT" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: '#1E293B',
  },
  sslBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  sslText: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '700',
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    paddingVertical: 32,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  rupeeCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  amountText: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  planInfo: {
    fontSize: 13,
  },
  breakdownCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  gstNote: {
    marginTop: 12,
    lineHeight: 16,
    fontSize: 10,
  },
  paymentMethodsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  methodCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  methodCardActive: {
    borderColor: '#BFE8DF',
    backgroundColor: '#F0FDFB',
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodLabelContainer: {
    flex: 1,
  },
  instantBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  instantText: {
    fontSize: 9,
    color: 'white',
    fontWeight: '800',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#059669',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
  },
  upiInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: 'white',
  },
  upiInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
  },
  authNoteBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  authIconContainer: {
    marginRight: 12,
  },
  authNoteText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
  },
  trustBadgesRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  trustColumn: {
    gap: 8,
  },
  footerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerBadgeText: {
    fontSize: 10,
    marginLeft: 6,
    fontWeight: '700',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  payButton: {
    marginHorizontal: 20,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#22C55E',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '700',
    color: '#94A3B8',
  },
  navLabelActive: {
    color: '#FF761E',
  },
});
