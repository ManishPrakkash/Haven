import React from 'react';
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

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { width } = Dimensions.get('window');

export default function ReviewSelectionScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Typography variant="h3" style={styles.headerTitle}>Review Selection</Typography>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Typography variant="caption" color="#005B9E" style={{ fontWeight: '700' }}>Enrollment Progress</Typography>
              <Typography variant="caption" color="#64748B">Step 2 of 3</Typography>
            </View>
            <View style={styles.progressBarBg}>
              <View style={styles.progressBarFill} />
            </View>
          </View>

          {/* Plan Card */}
          <View style={styles.planCard}>
            <View style={styles.planCardHeader}>
              <View>
                <Typography variant="h2" style={styles.planName}>Economy</Typography>
                <Typography variant="h3" color="#FF761E">Rs.59 / week</Typography>
              </View>
              <View style={styles.recommendedBadge}>
                <Typography variant="caption" color="#005B9E" style={{ fontWeight: '800', fontSize: 10 }}>RECOMMENDED</Typography>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <View style={styles.iconContainer}>
                   <MaterialCommunityIcons name="cash" size={20} color="#005B9E" />
                </View>
                <View>
                  <Typography variant="caption" style={styles.gridLabel}>MAX PAYOUT</Typography>
                  <Typography variant="bodySemiBold" style={styles.gridValue}>Rs.3,500</Typography>
                </View>
              </View>
              
              <View style={styles.gridItem}>
                <View style={styles.iconContainer}>
                   <MaterialCommunityIcons name="weather-rainy" size={20} color="#005B9E" />
                </View>
                <View>
                  <Typography variant="caption" style={styles.gridLabel}>TRIGGERS</Typography>
                  <Typography variant="bodySemiBold" style={styles.gridValue}>Rain, AQI, Heat...</Typography>
                </View>
              </View>

              <View style={styles.gridItem}>
                <View style={styles.iconContainer}>
                   <Ionicons name="time-outline" size={20} color="#005B9E" />
                </View>
                <View>
                  <Typography variant="caption" style={styles.gridLabel}>PAYOUT</Typography>
                  <Typography variant="bodySemiBold" style={styles.gridValue}>2 hours</Typography>
                </View>
              </View>

              <View style={styles.gridItem}>
                <View style={styles.iconContainer}>
                   <MaterialCommunityIcons name="calendar-clock" size={20} color="#005B9E" />
                </View>
                <View>
                  <Typography variant="caption" style={styles.gridLabel}>WAITING</Typography>
                  <Typography variant="bodySemiBold" style={styles.gridValue}>7 days</Typography>
                </View>
              </View>
            </View>
          </View>

          {/* Savings Information Card */}
          <View style={styles.savingsCard}>
             <Typography variant="body" color="#64748B" style={{ marginBottom: 12, fontSize: 14 }}>
               Your Estimated Annual Savings
             </Typography>
             
             <View style={styles.savingsContent}>
                <Typography variant="caption" color="#1E293B" style={styles.savingsText}>
                  Historical disruptions in <Typography variant="caption" style={styles.boldText}>Chennai</Typography> last year: <Typography variant="caption" style={styles.boldText}>18 days.</Typography>
                </Typography>
                <Typography variant="caption" color="#1E293B" style={styles.savingsText}>
                  Your estimated annual payout: <Typography variant="caption" style={styles.boldText}>Rs.7,200.</Typography> Your annual premium: <Typography variant="caption" style={styles.boldText}>Rs.3,068.</Typography>
                </Typography>
             </View>

             <Typography variant="bodySemiBold" color="#10B981" style={{ marginTop: 12 }}>
               Potential protection value: Rs.4,132
             </Typography>
          </View>

          {/* Before you're covered Section */}
          <View style={styles.stepsSection}>
            <Typography variant="h4" style={{ marginBottom: 20 }}>Before you're covered</Typography>
            
            <View style={styles.stepRow}>
              <View style={styles.stepIndicatorCol}>
                <View style={styles.stepCircle}>
                  <Typography variant="caption" color="white" style={{ fontWeight: '700' }}>1</Typography>
                </View>
                <View style={styles.dottedLine} />
              </View>
              <View style={styles.stepTextContent}>
                <Typography variant="bodySemiBold" style={{ fontSize: 14 }}>Review Agreement</Typography>
                <Typography variant="caption">— 2 min</Typography>
              </View>
            </View>

            <View style={styles.stepRow}>
              <View style={styles.stepIndicatorCol}>
                <View style={styles.stepCircle}>
                  <Typography variant="caption" color="white" style={{ fontWeight: '700' }}>2</Typography>
                </View>
                <View style={styles.dottedLine} />
              </View>
              <View style={styles.stepTextContent}>
                <Typography variant="bodySemiBold" style={{ fontSize: 14 }}>Verify Identity</Typography>
                <Typography variant="caption">— 1 min</Typography>
              </View>
            </View>

            <View style={styles.stepRow}>
              <View style={styles.stepIndicatorCol}>
                <View style={[styles.stepCircle, { marginBottom: 10 }]}>
                  <Typography variant="caption" color="white" style={{ fontWeight: '700' }}>3</Typography>
                </View>
              </View>
              <View style={styles.stepTextContent}>
                <Typography variant="bodySemiBold" style={{ fontSize: 14 }}>Confirm Payment</Typography>
                <Typography variant="caption">— 1 min</Typography>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <Button 
                title="Proceed to Agreement" 
                variant="secondary"
                leftIcon={<Ionicons name="document-text" size={20} color="white" style={{marginRight: 4}} />}
                onPress={() => router.push('/onboarding-complete')}
                style={styles.proceedButton}
            />
            
            <TouchableOpacity onPress={() => router.back()} style={styles.changePlanButton}>
              <Typography variant="link" color="#005B9E">Change Plan</Typography>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#F8FAFC' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#0F172A',
    fontWeight: '700',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#0369A1',
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  planName: {
    fontSize: 26,
    color: '#1E293B',
    marginBottom: 4,
  },
  recommendedBadge: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    width: (width - 100) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#64748B',
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '700',
  },
  savingsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#0369A1',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  savingsContent: {
    gap: 4,
  },
  savingsText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#475569',
  },
  boldText: {
    fontWeight: '700',
    color: '#1E293B',
    fontSize: 13,
  },
  stepsSection: {
    marginBottom: 40,
    paddingHorizontal: 4,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 16,
  },
  stepIndicatorCol: {
    alignItems: 'center',
    width: 32,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0369A1',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dottedLine: {
    width: 0,
    borderWidth: 1,
    borderColor: '#0369A1',
    borderStyle: 'dotted',
    flex: 1,
    opacity: 0.3,
    marginVertical: 4,
  },
  stepTextContent: {
    paddingBottom: 28,
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  actionSection: {
    gap: 16,
    alignItems: 'center',
    paddingBottom: 20,
  },
  proceedButton: {
    width: '100%',
    backgroundColor: '#FF761E',
    height: 60,
    borderRadius: 16,
  },
  changePlanButton: {
    padding: 8,
  }
});
