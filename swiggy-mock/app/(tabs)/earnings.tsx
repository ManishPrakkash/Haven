import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useUserStore } from '../store/userStore';

export default function EarningsScreen() {
  const insets = useSafeAreaInsets();
  const { profile } = useUserStore();
  const { weekTotal, deliveries, peakBonus, tips, onlineHours, onlineProgress, deliveryTargetText, deliveryProgress, distance, distanceProgress } = profile.earningsStats;

  // Mock bar chart data
  const chartData = [
    { day: 'M', height: '40%', active: false },
    { day: 'T', height: '30%', active: false },
    { day: 'W', height: '50%', active: false },
    { day: 'T', height: '80%', active: true },
    { day: 'F', height: '60%', active: false },
    { day: 'S', height: '90%', active: false },
    { day: 'S', height: '70%', active: false },
  ];

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <Text style={styles.headerTitle}>Earnings</Text>
      </View>

      <ScrollView 
        style={styles.scrollBackground} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* TABS */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.inactiveTabText}>This Month</Text>
          </TouchableOpacity>
        </View>

        {/* SUMMARY HEADER */}
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>This Week</Text>
          <Text style={styles.summaryAmount}>Rs.{weekTotal}</Text>
        </View>

        {/* GRAPH CARD */}
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            <View style={styles.barsArea}>
              {chartData.map((data, index) => (
                <View key={index} style={styles.barColumn}>
                  <View 
                    style={[
                      styles.bar, 
                      { height: data.height as any },
                      data.active ? styles.barActive : styles.barInactive
                    ]} 
                  />
                </View>
              ))}
            </View>
            <View style={styles.daysRow}>
              {chartData.map((data, index) => (
                <Text 
                  key={index} 
                  style={[
                    styles.dayText,
                    data.active ? styles.dayTextActive : styles.dayTextInactive
                  ]}
                >
                  {data.day}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* BREAKDOWN CARD */}
        <View style={styles.card}>
          {/* Deliveries */}
          <View style={styles.breakdownRow}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#FFEDD5' }]}>
                <Ionicons name="bag-handle" size={16} color="#F97316" />
              </View>
              <Text style={styles.rowLabel}>Deliveries</Text>
            </View>
            <Text style={styles.rowValue}>Rs.{deliveries}</Text>
          </View>
          
          <View style={styles.divider} />

          {/* Peak Hours Bonus */}
          <View style={styles.breakdownRow}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
                <MaterialCommunityIcons name="fire" size={18} color="#EF4444" />
              </View>
              <Text style={styles.rowLabel}>Peak Hours Bonus</Text>
            </View>
            <Text style={styles.rowValue}>Rs.{peakBonus}</Text>
          </View>

          <View style={styles.divider} />

          {/* Tips */}
          <View style={styles.breakdownRow}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#FDF2F8' }]}>
                <Ionicons name="heart" size={16} color="#EC4899" />
              </View>
              <Text style={styles.rowLabel}>Tips</Text>
            </View>
            <Text style={styles.rowValue}>Rs.{tips}</Text>
          </View>

          <View style={styles.divider} />

          {/* Total */}
          <View style={styles.breakdownRow}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#1F2937' }]}>
                <Ionicons name="bar-chart" size={16} color="#FFF" />
              </View>
              <Text style={styles.rowLabelBold}>Total</Text>
            </View>
            <Text style={styles.rowValueBold}>Rs.{weekTotal}</Text>
          </View>
        </View>

        {/* ADJUST TODAY'S ACTIVITY CARD */}
        <View style={styles.card}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Adjust Today's Activity</Text>
            <Ionicons name="sync-outline" size={18} color="#6B7280" />
          </View>

          {/* Online Hours */}
          <View style={styles.activityRow}>
            <View style={styles.activityRowTop}>
              <View style={styles.activityRowLeft}>
                <Ionicons name="time" size={16} color="#6B7280" />
                <Text style={styles.activityLabel}>Online Hours</Text>
              </View>
              <Text style={styles.activityValueOrange}>{onlineHours} hrs</Text>
            </View>
            {/* Progress Bar */}
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${onlineProgress}%` }]} />
              <View style={[styles.progressGap, { left: `${onlineProgress}%` }]} />
            </View>
          </View>

          {/* Deliveries Target */}
          <View style={styles.activityRow}>
            <View style={styles.activityRowTop}>
              <View style={styles.activityRowLeft}>
                <MaterialCommunityIcons name="moped" size={16} color="#6B7280" />
                <Text style={styles.activityLabel}>Deliveries Target</Text>
              </View>
              <Text style={styles.activityValueOrange}>{deliveryTargetText}</Text>
            </View>
            {/* Progress Bar */}
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${deliveryProgress}%` }]} />
              <View style={[styles.progressGap, { left: `${deliveryProgress}%` }]} />
            </View>
          </View>

          {/* Distance */}
          <View style={styles.activityRow}>
            <View style={styles.activityRowTop}>
              <View style={styles.activityRowLeft}>
                <MaterialCommunityIcons name="transit-connection-variant" size={16} color="#6B7280" />
                <Text style={styles.activityLabel}>Distance</Text>
              </View>
              <Text style={styles.activityValueOrange}>{distance}</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${distanceProgress}%` }]} />
              <View style={[styles.progressGap, { left: `${distanceProgress}%` }]} />
            </View>
          </View>
        </View>

        {/* SYNC BUTTON */}
        <TouchableOpacity style={styles.syncBtn}>
          <Text style={styles.syncBtnText}>Sync to GigShield</Text>
        </TouchableOpacity>
        <Text style={styles.lastSyncedText}>Last synced: 2 min ago</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6', // optional subtle separator
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  scrollBackground: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Matches design gray background
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12, // React native gap
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeTab: {
    backgroundColor: '#FC8019',
    borderColor: '#FC8019',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inactiveTabText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 14,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FC8019',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  chartContainer: {
    height: 180,
    justifyContent: 'flex-end',
  },
  barsArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  barColumn: {
    width: 25,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  barActive: {
    backgroundColor: '#FC8019', // Orange for 'T'
  },
  barInactive: {
    backgroundColor: '#F3F4F6', // light gray
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dayText: {
    width: 25,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dayTextActive: {
    color: '#FC8019', // Orange
  },
  dayTextInactive: {
    color: '#6B7280', // Gray
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 14,
    color: '#374151',
  },
  rowLabelBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  rowValueBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  activityRow: {
    marginBottom: 18,
  },
  activityRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 8,
  },
  activityValueOrange: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FC8019',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FC8019',
    borderRadius: 3,
  },
  progressGap: {
    position: 'absolute',
    width: 3,
    height: '100%',
    backgroundColor: '#fff',
    marginLeft: -1.5,
  },
  syncBtn: {
    backgroundColor: '#FC8019',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  syncBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastSyncedText: {
    textAlign: 'center',
    color: '#8797B2',
    fontSize: 12,
  },
});
