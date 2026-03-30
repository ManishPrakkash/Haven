import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

const PolicyItem = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.policyRow}>
    <Typography variant="caption" color="#64748B" style={{ fontSize: 13 }}>{label}</Typography>
    <Typography variant="bodySemiBold" style={{ fontSize: 13, color: '#1E293B' }}>{value}</Typography>
  </View>
);

const AccordionItem = ({ icon, title, iconColor = "#0369A1", bgColor = "#F0F9FF" }: { icon: string, title: string, iconColor?: string, bgColor?: string }) => (
  <TouchableOpacity style={styles.accordionHeader} activeOpacity={0.7}>
    <View style={styles.accordionLeft}>
      <View style={[styles.accordionIconContainer, { backgroundColor: bgColor }]}>
        <Ionicons name={icon as any} size={18} color={iconColor} />
      </View>
      <Typography variant="bodySemiBold" style={{ fontSize: 14 }}>{title}</Typography>
    </View>
    <Ionicons name="chevron-down" size={18} color="#94A3B8" />
  </TouchableOpacity>
);

const CheckboxItem = ({ label, checked, onPress }: { label: any, checked: boolean, onPress: () => void }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Ionicons name="checkmark" size={14} color="white" />}
    </View>
    <View style={{ flex: 1 }}>
      {typeof label === 'string' ? (
        <Typography variant="caption" color="#475569" style={{ lineHeight: 18, fontSize: 12 }}>{label}</Typography>
      ) : (
        label
      )}
    </View>
  </TouchableOpacity>
);

export default function PolicyAgreementScreen() {
  const [consents, setConsents] = useState([true, false, false]);

  const toggleConsent = (index: number) => {
    const newConsents = [...consents];
    newConsents[index] = !newConsents[index];
    setConsents(newConsents);
  };

  const acceptAll = () => setConsents([true, true, true]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#004771', '#00253B']}
        style={styles.headerGradient}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Nav Header */}
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Typography variant="bodySemiBold" color="white" style={{ fontSize: 16 }}>Policy Agreement</Typography>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.documentIconContainer}>
               <MaterialCommunityIcons name="file-document-edit" size={40} color="#004771" />
            </View>
            <Typography variant="h2" color="white" align="center" style={{ marginTop: 24, fontSize: 26 }}>Review & Accept</Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.7)" align="center" style={{ marginTop: 4 }}>Please read carefully before signing</Typography>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressTextRow}>
                <Typography variant="caption" color="white" style={{ fontSize: 10, fontWeight: '700', letterSpacing: 0.5 }}>STEP 3 OF 5</Typography>
                <Typography variant="caption" color="white" style={{ fontSize: 10, fontWeight: '700', letterSpacing: 0.5 }}>60% COMPLETE</Typography>
              </View>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
            </View>
          </View>

          {/* Main Card */}
          <View style={styles.mainCard}>
            <Typography variant="h4" style={{ marginBottom: 16, fontSize: 16, color: '#1E293B' }}>Your Policy Summary</Typography>
            
            <View style={styles.summaryTable}>
              <PolicyItem label="Plan" value="Economy" />
              <PolicyItem label="Weekly Premium" value="Rs.59" />
              <PolicyItem label="Coverage Limit" value="Rs.3,500/week" />
              <PolicyItem label="Waiting Period" value="7 days" />
              <PolicyItem label="Triggers" value="4 of 5" />
              <PolicyItem label="Type" value="Parametric" />
            </View>

            <Typography variant="h4" style={{ marginTop: 32, marginBottom: 16, fontSize: 16, color: '#1E293B' }}>What you need to know</Typography>
            
            <View style={styles.accordionContainer}>
              <AccordionItem icon="calendar-outline" title="When will my policy be active?" />
              <AccordionItem icon="time-outline" title="When will I receive a payout?" />
              <AccordionItem icon="close-circle-outline" title="What is NOT covered?" iconColor="#EF4444" bgColor="#FEF2F2" />
              <AccordionItem icon="arrow-undo-outline" title="Can I cancel this policy?" />
            </View>

            {/* Consent & Terms */}
            <View style={styles.consentSection}>
              <View style={styles.consentHeader}>
                <Typography variant="caption" color="#64748B" style={{ fontWeight: '700', letterSpacing: 0.5, fontSize: 11 }}>CONSENT & TERMS</Typography>
                <TouchableOpacity onPress={acceptAll}>
                  <Typography variant="caption" color="#0369A1" style={{ fontWeight: '700' }}>Accept All</Typography>
                </TouchableOpacity>
              </View>

              <CheckboxItem 
                checked={consents[0]} 
                onPress={() => toggleConsent(0)}
                label={
                  <Typography variant="caption" color="#475569" style={{ lineHeight: 18, fontSize: 12 }}>
                    I have read and agree to the <Typography variant="caption" color="#0369A1" style={{ fontWeight: '700', fontSize: 12 }}>Terms of Service</Typography> and <Typography variant="caption" color="#0369A1" style={{ fontWeight: '700', fontSize: 12 }}>Policy Document</Typography>.
                  </Typography>
                }
              />

              <CheckboxItem 
                checked={consents[1]} 
                onPress={() => toggleConsent(1)}
                label="I authorize GigShield to verify my employment status with integrated platform partners."
              />

              <CheckboxItem 
                checked={consents[2]} 
                onPress={() => toggleConsent(2)}
                label="I provide explicit consent for processing my personal data as per DPDPA 2023 guidelines."
              />
            </View>

            <Button 
              title="Continue to Identity Verification" 
              variant="secondary"
              onPress={() => router.push('/identity-verification')}
              style={styles.continueButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={{ height: 40, backgroundColor: 'white' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
  },
  safeArea: {
    flex: 1,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  documentIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  progressContainer: {
    width: '100%',
    marginTop: 40,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#FF761E',
  },
  mainCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -20,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
  },
  summaryTable: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 0,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  policyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  accordionContainer: {
    gap: 12,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  accordionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accordionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consentSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    gap: 20,
    marginBottom: 32,
  },
  consentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -2,
  },
  checkboxChecked: {
    backgroundColor: '#0369A1',
    borderColor: '#0369A1',
  },
  continueButton: {
    backgroundColor: '#FF761E',
    height: 60,
    borderRadius: 16,
    marginBottom: 20,
  }
});
