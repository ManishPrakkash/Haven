import React from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack, router } from 'expo-router';

import { BrandColors } from '@/constants/theme';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

const DetailCard = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.detailCard}>
    <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" style={styles.detailLabel}>{label}</Typography>
    <Typography variant="bodySemiBold" color="white" style={styles.detailValue}>{value}</Typography>
  </View>
);

const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <TouchableOpacity style={styles.navItem}>
    <Ionicons name={active ? icon : `${icon}-outline`} size={24} color={active ? '#007A8B' : '#64748B'} />
    <Typography variant="caption" style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Typography>
  </TouchableOpacity>
);

export default function HomeDashboardScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
      
      {/* Top Main Header */}
      <SafeAreaView edges={['top']} style={styles.topHeader}>
         <View style={styles.headerRow}>
           <Typography variant="h3" style={styles.logoText}>GigShield</Typography>
           <View style={styles.headerRight}>
             <Typography variant="bodySemiBold" style={{ marginRight: 12 }}>Ravi</Typography>
             <TouchableOpacity style={styles.notifButton}>
                <Ionicons name="notifications" size={24} color="#1E293B" />
                <View style={styles.notifDot} />
             </TouchableOpacity>
           </View>
         </View>
      </SafeAreaView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[]}
      >
        {/* Economy Plan Hero Card */}
        <View style={styles.heroContainer}>
          <View style={styles.planHeroCard}>
            <View style={styles.heroHeader}>
              <View>
                 <Typography variant="bodySemiBold" color="white" style={styles.planTitle}>Economy Plan</Typography>
                 <Typography variant="caption" color="rgba(255, 255, 255, 0.6)">GS-2026-ECO-004821</Typography>
              </View>
              <View style={styles.waitingBadge}>
                 <Typography variant="caption" style={styles.waitingBadgeText}>WAITING</Typography>
              </View>
            </View>

            <View style={styles.coverageLimitSection}>
               <Typography variant="h1" color="white" style={styles.limitAmount}>Rs.3,500 <Typography variant="h4" color="rgba(255, 255, 255, 0.8)">/week max</Typography></Typography>
               <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" style={styles.limitLabel}>COVERAGE LIMIT</Typography>
            </View>

            {/* Plan Small Details Row */}
            <View style={styles.heroDetailsRow}>
               <DetailCard label="PREMIUM" value="Rs.59/wk" />
               <DetailCard label="TRIGGERS" value="4 Covered" />
               <DetailCard label="PAYOUT" value="T+2hr Speed" />
            </View>
          </View>
        </View>

        {/* Rain Alert Box */}
        <View style={styles.alertCardOuter}>
           <View style={styles.alertCard}>
             <View style={styles.alertHeaderRow}>
               <View style={styles.alertIconBox}>
                 <MaterialCommunityIcons name="weather-rainy" size={28} color="#FF761E" />
               </View>
               <View style={styles.alertContent}>
                  <Typography variant="bodySemiBold" style={styles.alertTitle}>Active Alert: Heavy Rain in Chennai</Typography>
                  <Typography variant="caption" color="#64748B">Your policy is monitoring this event. Payout may be triggered.</Typography>
               </View>
             </View>
             <TouchableOpacity style={styles.viewDetailsLink}>
                <Typography variant="caption" color="#FF761E" style={{ fontWeight: '700' }}>VIEW DETAILS</Typography>
             </TouchableOpacity>
           </View>
        </View>

        {/* Waiting Period Status Section */}
        <View style={styles.sectionCard}>
           <Typography variant="caption" color="#1E293B" style={styles.sectionTitle}>WAITING PERIOD STATUS</Typography>
           <View style={styles.progressContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '55%' }]} />
              </View>
              <Typography variant="caption" color="#64748B" style={styles.progressStatusText}>
                <Typography variant="caption" style={{ fontWeight: '700', color: '#1E293B' }}>4 of 7 days complete</Typography> — Coverage active on June 19, 2026
              </Typography>
           </View>
        </View>

        {/* Weekly Summary Section */}
        <View style={styles.sectionCard}>
           <View style={styles.sectionHeaderInner}>
              <Typography variant="caption" color="#1E293B" style={styles.sectionTitle}>THIS WEEK</Typography>
              <View style={styles.dateBadge}>
                 <Typography variant="caption" color="#0369A1" style={{ fontSize: 10, fontWeight: '700' }}>JUN 12 - 18</Typography>
              </View>
           </View>
           
           <View style={styles.statsList}>
              <View style={styles.statsRow}>
                 <Typography variant="body" color="#64748B">Disruption Days Covered</Typography>
                 <Typography variant="bodySemiBold">(0)</Typography>
              </View>
              <View style={styles.statsDivider} />
              <View style={styles.statsRow}>
                 <Typography variant="body" color="#64748B">Claims Filed</Typography>
                 <Typography variant="bodySemiBold">(0)</Typography>
              </View>
              <View style={styles.statsDivider} />
              <View style={styles.statsRow}>
                 <Typography variant="body" color="#64748B">Total Paid Out</Typography>
                 <Typography variant="bodySemiBold">Rs.0</Typography>
              </View>
           </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.activitySection}>
           <View style={styles.activityHeaderRow}>
              <Typography variant="bodySemiBold" style={{ fontSize: 18 }}>Recent Activity</Typography>
              <TouchableOpacity>
                 <Typography variant="caption" color="#007A8B" style={{ fontWeight: '700' }}>View All</Typography>
              </TouchableOpacity>
           </View>
           
           {/* Activity Dotted Area (Mockup of empty state) */}
           <View style={styles.activityDottedContainer}>
              <View style={styles.activityEmptyBox}>
                 <View style={styles.emptyIconCircle}>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={32} color="#CBD5E1" />
                 </View>
                 <Typography variant="bodySemiBold" color="#475569" style={{ marginBottom: 4 }}>No activity yet</Typography>
                 <Typography variant="caption" color="#94A3B8" align="center">Once your coverage begins, claims{'\n'}and payouts will appear here.</Typography>
              </View>
           </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
         <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomTabContainer}>
         <NavItem icon="home" label="HOME" active />
         <NavItem icon="shield" label="PLANS" />
         <NavItem icon="document-text" label="CLAIMS" />
         <NavItem icon="wallet" label="PAYOUTS" />
         <NavItem icon="person" label="PROFILE" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerRow: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  logoText: {
    fontSize: 22,
    color: '#1E293B',
    fontWeight: '800',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF761E',
    borderWidth: 2,
    borderColor: 'white',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  planHeroCard: {
    backgroundColor: '#004771',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#004771',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  planTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  waitingBadge: {
    backgroundColor: '#FF761E',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  waitingBadgeText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 11,
  },
  coverageLimitSection: {
    marginBottom: 40,
  },
  limitAmount: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  limitLabel: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  detailLabel: {
    fontSize: 8,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
  },
  alertCardOuter: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 6,
    borderLeftColor: '#FF761E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  alertIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    marginBottom: 4,
    color: '#1E293B',
  },
  viewDetailsLink: {
    alignSelf: 'flex-start',
    marginLeft: 64,
  },
  sectionCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 20,
    fontSize: 11,
  },
  progressContainer: {
    width: '100%',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007A8B',
  },
  progressStatusText: {
    fontSize: 12,
  },
  sectionHeaderInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateBadge: {
    backgroundColor: '#F0F9FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  statsList: {
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  statsDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  activitySection: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  activityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  activityDottedContainer: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
  },
  activityEmptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 150,
    right: 24,
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#FF761E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF761E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '700',
    color: '#94A3B8',
  },
  navLabelActive: {
    color: '#007A8B',
  },
});
