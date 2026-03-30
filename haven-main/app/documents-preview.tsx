import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { height } = Dimensions.get('window');

/**
 * Documents Preview Screen component showing fetched documents from DigiLocker.
 * Part of Step 2 of 3.
 */
export default function DocumentsPreviewScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      
      {/* Dark Green Header */}
      <View style={[styles.headerBg, { paddingTop: insets.top + 10 }]}>
         <View style={styles.headerTopRow}>
           <TouchableOpacity onPress={() => router.back()} style={styles.navButton}>
             <Ionicons name="chevron-back" size={24} color="white" />
           </TouchableOpacity>
           
           <View style={styles.stepContainer}>
             <View style={styles.stepProgressBarBg}>
                <View style={styles.stepProgressBarFill} />
             </View>
             <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" style={styles.stepText}>
               STEP 2 OF 3
             </Typography>
           </View>
         </View>

         <View style={styles.headerTitleSection}>
            <Typography variant="h1" color="white" style={styles.mainTitle}>Your Documents</Typography>
            <View style={styles.subtitleRow}>
               <Typography variant="body" color="rgba(255, 255, 255, 0.7)">Fetched from DigiLocker</Typography>
               <View style={styles.headerCheckCircle}>
                  <Ionicons name="checkmark" size={10} color="white" />
               </View>
            </View>
         </View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Main Card */}
          <View style={[
            styles.card, 
            { 
              paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40,
              minHeight: height * 0.75
            }
          ]}>
            {/* Success Alert */}
            <View style={styles.successAlert}>
              <View style={styles.successIconBox}>
                 <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Typography variant="bodySemiBold" color="#065F46" style={styles.alertText}>
                Documents fetched successfully
              </Typography>
            </View>

            {/* Aadhaar Card Section */}
            <View style={styles.docSection}>
              <View style={styles.docAccentLine} />
              <View style={styles.docSectionContent}>
                <View style={styles.docHeader}>
                  <View style={styles.docIconBox}>
                    <MaterialCommunityIcons name="card-account-details-outline" size={22} color="#475569" />
                  </View>
                  <View style={styles.docTitleGroup}>
                     <Typography variant="h3">Aadhaar Card</Typography>
                     <View style={styles.verifiedRow}>
                        <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                        <Typography variant="caption" color="#10B981" style={styles.verifiedText}>VERIFIED</Typography>
                     </View>
                  </View>
                </View>

                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <Typography variant="caption" color={BrandColors.text.muted}>FULL NAME</Typography>
                    <Typography variant="bodySemiBold">Ravi Kumar</Typography>
                  </View>
                  <View style={styles.detailItem}>
                    <Typography variant="caption" color={BrandColors.text.muted}>AADHAAR NUMBER</Typography>
                    <Typography variant="bodySemiBold">XXXX-XXXX-4821</Typography>
                  </View>
                  <View style={styles.detailItem}>
                    <Typography variant="caption" color={BrandColors.text.muted}>DATE OF BIRTH</Typography>
                    <Typography variant="body">12/05/1992</Typography>
                  </View>
                  <View style={styles.detailItem}>
                    <Typography variant="caption" color={BrandColors.text.muted}>GENDER</Typography>
                    <Typography variant="body">Male</Typography>
                  </View>
                  <View style={[styles.detailItem, { width: '100%' }]}>
                    <Typography variant="caption" color={BrandColors.text.muted}>REGISTERED ADDRESS</Typography>
                    <Typography variant="body" style={styles.addressText}>
                      H.No 452, Sector 21, Gandhinagar, Gujarat - 382021
                    </Typography>
                  </View>
                </View>
              </View>
            </View>

            {/* PAN Card Section */}
            <View style={[styles.docSectionAlt]}>
               <View style={styles.docHeader}>
                  <View style={styles.docIconBoxThin}>
                    <MaterialCommunityIcons name="card-text-outline" size={22} color="#475569" />
                  </View>
                  <View style={styles.docTitleGroup}>
                     <Typography variant="h3">PAN Card</Typography>
                     <View style={styles.verifiedRow}>
                        <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                        <Typography variant="caption" color="#10B981" style={styles.verifiedText}>VERIFIED</Typography>
                     </View>
                  </View>
               </View>
               <View style={styles.detailsGrid}>
                  <View style={styles.detailItemHalf}>
                    <Typography variant="caption" color={BrandColors.text.muted}>PAN NUMBER</Typography>
                    <Typography variant="bodySemiBold">ABCPK1234F</Typography>
                  </View>
                  <View style={styles.detailItemHalf}>
                    <Typography variant="caption" color={BrandColors.text.muted}>NAME ON CARD</Typography>
                    <Typography variant="bodySemiBold">Ravi Kumar</Typography>
                  </View>
               </View>
            </View>

            {/* OTP Status Badge */}
            <View style={styles.otpBadge}>
              <View style={styles.otpBadgeLeft}>
                <Ionicons name="phone-portrait-outline" size={18} color={BrandColors.text.secondary} />
                <Typography variant="bodySemiBold" style={{ marginLeft: 8 }}>+91 98765 43210</Typography>
              </View>
              <View style={styles.verifiedRow}>
                <Typography variant="caption" color="#10B981" style={[styles.verifiedText, { marginRight: 4 }]}>OTP Verified</Typography>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              </View>
            </View>

            {/* Trust Badges */}
            <View style={styles.trustRow}>
               <View style={styles.trustItem}>
                 <Ionicons name="lock-closed" size={12} color={BrandColors.text.muted} />
                 <Typography variant="caption" color={BrandColors.text.muted} style={{ marginLeft: 4 }}>
                   AES-256 ENCRYPTED STORAGE
                 </Typography>
               </View>
               <View style={styles.poweredBox}>
                 <Typography variant="caption" color={BrandColors.text.muted} style={{ fontSize: 9 }}>POWERED BY</Typography>
                 <Typography variant="caption" color="#005B9E" style={{ fontWeight: '900', fontSize: 10, marginLeft: 3 }}>DigiLocker</Typography>
               </View>
            </View>

            {/* Actions */}
            <Button 
               title="Confirm & Continue"
               variant="secondary"
               onPress={() => router.push('/pricing')}
               style={styles.confirmButton}
               rightIcon={<Ionicons name="shield-checkmark-outline" size={20} color="white" style={{ marginLeft: 8 }} />}
            />

            <TouchableOpacity style={styles.reFetchButton}>
               <Typography variant="bodySemiBold" color={BrandColors.accent}>
                 Something wrong? <Typography variant="bodySemiBold" color="#005B9E" style={{ textDecorationLine: 'underline' }}>Re-fetch documents</Typography>
               </Typography>
            </TouchableOpacity>

            <Typography variant="caption" color={BrandColors.text.muted} align="center" style={styles.termsText}>
              By clicking confirm, you agree to allow GigShield to store and use these documents for verification purposes in accordance with our <Typography variant="caption" color="#005B9E" style={{ textDecorationLine: 'underline' }}>Terms of Service</Typography> and <Typography variant="caption" color="#005B9E" style={{ textDecorationLine: 'underline' }}>Privacy Policy</Typography>.
            </Typography>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  headerBg: {
    backgroundColor: '#064E3B', // Dark Green
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  stepContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  stepProgressBarBg: {
    width: 80,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  stepProgressBarFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#FF761E', // Orange
  },
  stepText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitleSection: {
    gap: 4,
  },
  mainTitle: {
    fontSize: 26,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerCheckCircle: {
     width: 16,
     height: 16,
     borderRadius: 8,
     backgroundColor: '#10B981',
     justifyContent: 'center',
     alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
    backgroundColor: BrandColors.ui.card,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 36,
    shadowColor: BrandColors.ui.shadow,
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 24,
  },
  successAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
    gap: 10,
  },
  successIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 14,
  },
  docSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  docAccentLine: {
    width: 5,
    backgroundColor: '#065F46',
  },
  docSectionContent: {
    flex: 1,
    padding: 16,
  },
  docHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  docIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docIconBoxThin: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docTitleGroup: {
    flex: 1,
    gap: 2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    width: '45%',
    gap: 4,
  },
  detailItemHalf: {
     flex: 1,
     gap: 4,
  },
  addressText: {
    lineHeight: 20,
    fontSize: 13,
  },
  docSectionAlt: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  otpBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 24,
  },
  otpBadgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poweredBox: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingLeft: 12,
     borderLeftWidth: 1,
     borderLeftColor: '#E2E8F0',
  },
  confirmButton: {
    marginBottom: 16,
    shadowColor: BrandColors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  reFetchButton: {
    alignItems: 'center',
    marginBottom: 32,
  },
  termsText: {
    fontSize: 11,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
});
