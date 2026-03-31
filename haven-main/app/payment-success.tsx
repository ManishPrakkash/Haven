import React from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

const ExpectItem = ({ icon, color, title, subtitle }: { icon: any, color: string, title: string, subtitle: string }) => (
  <View style={styles.expectItem}>
    <View style={[styles.expectIconBox, { backgroundColor: color }]}>
       <Ionicons name={icon} size={20} color="#1E293B" />
    </View>
    <View style={styles.expectContent}>
       <Typography variant="bodySemiBold" style={styles.expectTitle}>{title}</Typography>
       <Typography variant="caption" color="#64748B" style={styles.expectSubtitle}>{subtitle}</Typography>
    </View>
  </View>
);

export default function PaymentSuccessScreen() {
  const handleViewPolicy = () => {
    // Navigate to policies tab
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" translucent />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Header Success Section */}
        <View style={styles.headerHero}>
           <View style={styles.successIconBox}>
              <Ionicons name="checkmark-circle" size={48} color="#0D9488" />
           </View>
           <Typography variant="h1" align="center" style={styles.title}>You're Protected!</Typography>
           <Typography variant="body" align="center" color="#64748B" style={styles.subtitle}>
              Your GigShield Economy policy is now active
           </Typography>
           <Typography variant="caption" align="center" color="#94A3B8" style={styles.dateInfo}>
              Coverage starts on June 12, 2026 — your 7-day waiting period ends
           </Typography>
        </View>

        {/* Policy Details Card */}
        <View style={styles.policyCard}>
           <View style={styles.docIconBox}>
             <MaterialCommunityIcons name="file-document-outline" size={32} color="#94A3B8" />
           </View>
           <View style={styles.policyInfo}>
             <Typography variant="caption" color="#94A3B8" style={styles.policyLabel}>POLICY NUMBER</Typography>
             <Typography variant="bodySemiBold" style={styles.policyNumber}>GS-2026-ECO-004821</Typography>
             <View style={styles.validityRow}>
                <Ionicons name="calendar-outline" size={14} color="#0D9488" style={{ marginRight: 6 }} />
                <Typography variant="caption" style={{ color: '#0D9488', fontWeight: '600' }}>Valid until cancelled</Typography>
             </View>
           </View>
        </View>

        {/* What to expect section */}
        <View style={styles.expectSection}>
          <Typography variant="caption" color="#1E293B" style={styles.sectionHeader}>YOUR POLICY IS ACTIVE — HERE'S WHAT TO EXPECT</Typography>
          
          <ExpectItem 
            icon="cloud-download-outline" 
            color="#ECFDF5" 
            title="Instant Access" 
            subtitle="A digital copy of your policy has been sent to your registered email and stored in your vault."
          />
          
          <ExpectItem 
            icon="cash-outline" 
            color="#FFF7ED" 
            title="Automated Payouts" 
            subtitle="Claims for hospital cash and income loss are processed automatically through our partner network."
          />
          
          <ExpectItem 
            icon="notifications-outline" 
            color="#F1F5F9" 
            title="Real-time Alerts" 
            subtitle="We'll notify you via WhatsApp if we detect a work disruption in your area covered by your plan."
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <Button 
            title="View My Policy" 
            onPress={handleViewPolicy}
            style={styles.viewPolicyButton}
          />
          
          <TouchableOpacity style={styles.outlineButton}>
            <Typography variant="bodySemiBold" color="#0D9488">Set Up UPI for Payouts</Typography>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareRow}>
             <Ionicons name="share-social-outline" size={18} color="#64748B" style={{ marginRight: 8 }} />
             <Typography variant="caption" color="#64748B" style={{ fontWeight: '700' }}>Share my GigShield policy</Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerHero: {
    paddingTop: height * 0.1,
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 40,
  },
  successIconBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 12,
  },
  dateInfo: {
    lineHeight: 18,
    fontSize: 12,
  },
  policyCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  docIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  policyInfo: {
    flex: 1,
  },
  policyLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  policyNumber: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 6,
  },
  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expectSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  expectItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  expectIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  expectContent: {
    flex: 1,
  },
  expectTitle: {
    fontSize: 15,
    marginBottom: 4,
  },
  expectSubtitle: {
    lineHeight: 18,
    fontSize: 12,
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  viewPolicyButton: {
    backgroundColor: '#FF761E', // Orange color from design
    width: '100%',
    height: 56,
    borderRadius: 12,
    marginBottom: 16,
  },
  outlineButton: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  }
});
