import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';
import { useUserStore, PROFILES_DATA } from '../store/userStore';
import { LineChart } from 'react-native-chart-kit';

const CircularProgress = ({ size, strokeWidth, progress, children }: { size: number, strokeWidth: number, progress: number, children?: React.ReactNode }) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg style={{ position: 'absolute' }} width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#FC8019"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      {children}
    </View>
  );
};

export default function PerformanceScreen() {
  const insets = useSafeAreaInsets();
  const { currentUserIndex, setCurrentUserIndex, profile } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'week' | 'month'>('week');

  const { rating, attendance, onTime, acceptance, streak, isTopPerformer, zone } = profile.performance;

  const monthMockData = {
    rating: (Math.max(1, parseFloat(rating) - 0.2)).toFixed(1).toString(),
    attendance: Math.max(0, attendance - 12),
    onTime: Math.max(0, onTime - 5),
    acceptance: Math.max(0, acceptance - 8),
    streak: streak + 14,
  };

  const displayData = activeTab === 'week' ? {
    rating, attendance, onTime, acceptance, streak
  } : monthMockData;

  const weekChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [
          attendance - 10,
          attendance - 5,
          attendance + 2,
          attendance - 8,
          attendance,
          attendance + 5,
          attendance,
        ],
        color: (opacity = 1) => `rgba(252, 128, 25, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Weekly Trend"]
  };

  const monthChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [
          displayData.attendance - 15,
          displayData.attendance - 8,
          displayData.attendance + 5,
          displayData.attendance,
        ],
        color: (opacity = 1) => `rgba(252, 128, 25, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Monthly Trend"]
  };

  const chartData = activeTab === 'week' ? weekChartData : monthChartData;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Performance</Text>
        </View>

        {/* SWITCH USER BUTTON */}
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.switchUserBtn}>
          <MaterialCommunityIcons name="account-switch-outline" size={20} color="#FC8019" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollBackground} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* TABS */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'week' && styles.activeTab]}
            onPress={() => setActiveTab('week')}
          >
            <Text style={activeTab === 'week' ? styles.activeTabText : styles.inactiveTabText}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'month' && styles.activeTab]}
            onPress={() => setActiveTab('month')}
          >
            <Text style={activeTab === 'month' ? styles.activeTabText : styles.inactiveTabText}>This Month</Text>
          </TouchableOpacity>
        </View>

        {/* CUSTOMER RATING CARD */}
        <View style={styles.mainCard}>
          <View style={styles.ratingCircleContainer}>
            <CircularProgress size={160} strokeWidth={12} progress={(parseFloat(displayData.rating) / 5) * 100}>
              <Text style={styles.ratingNumber}>{displayData.rating}</Text>
              <Ionicons name="star" size={24} color="#FC8019" style={{ marginTop: 2 }} />
            </CircularProgress>
          </View>
          <Text style={styles.ratingLabel}>CUSTOMER RATING</Text>
        </View>

        {/* METRICS ROW */}
        <View style={styles.metricsRow}>
          {/* Attendance */}
          <View style={styles.metricCard}>
            <CircularProgress size={60} strokeWidth={5} progress={displayData.attendance}>
              <Text style={styles.metricValue}>{displayData.attendance}%</Text>
            </CircularProgress>
            <Text style={[styles.metricLabel, { marginTop: 10 }]}>Attendance</Text>
          </View>

          {/* On-Time */}
          <View style={styles.metricCard}>
            <CircularProgress size={60} strokeWidth={5} progress={displayData.onTime}>
              <Text style={styles.metricValue}>{displayData.onTime}%</Text>
            </CircularProgress>
            <Text style={[styles.metricLabel, { marginTop: 10 }]}>On-Time</Text>
          </View>

          {/* Acceptance */}
          <View style={styles.metricCard}>
            <CircularProgress size={60} strokeWidth={5} progress={displayData.acceptance}>
              <Text style={styles.metricValue}>{displayData.acceptance}%</Text>
            </CircularProgress>
            <Text style={[styles.metricLabel, { marginTop: 10 }]}>Acceptance</Text>
          </View>
        </View>

        {/* CHART SECTION */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Performance Trend</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 64}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(252, 128, 25, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#FC8019"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

        {/* STREAK CARD */}
        <View style={styles.detailCard}>
          <View style={styles.detailIconContainer}>
            <View style={styles.flameCircle}>
              <MaterialCommunityIcons name="fire" size={24} color="#FC8019" />
            </View>
          </View>
          <View style={styles.detailTextContainer}>
            <Text style={styles.streakText}>
              <Text style={styles.streakNumber}>{displayData.streak}</Text> days
            </Text>
            <Text style={styles.streakSubtitle}>Keep going! You're on a streak.</Text>
          </View>
        </View>

        {/* TOP PERFORMER CARD */}
        {isTopPerformer && (
          <View style={styles.topPerformerCard}>
            <View style={styles.detailIconContainer}>
              <View style={styles.medalCircle}>
                <MaterialCommunityIcons name="medal-outline" size={24} color="#B45309" />
              </View>
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.topPerformerTitle}>Top Performer</Text>
              <Text style={styles.topPerformerZone}>{zone}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* USER SELECTION MODAL */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Profile</Text>
            {PROFILES_DATA.map((p, index) => (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.modalUserRow,
                  index === currentUserIndex && styles.modalUserRowActive
                ]}
                onPress={() => {
                  setCurrentUserIndex(index);
                  setShowModal(false);
                }}
              >
                <MaterialCommunityIcons 
                  name="account-circle" 
                  size={24} 
                  color={index === currentUserIndex ? '#FC8019' : '#9CA3AF'} 
                />
                <Text style={[
                  styles.modalUserName,
                  index === currentUserIndex && { color: '#FC8019', fontWeight: 'bold' }
                ]}>
                  {p.name}
                </Text>
                {index === currentUserIndex && (
                  <Ionicons name="checkmark" size={20} color="#FC8019" style={{ marginLeft: 'auto' }} />
                )}
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6', // using grey background for header to match design
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 16,
  },
  backButton: {
    padding: 4,
  },
  switchUserBtn: {
    backgroundColor: '#FFF3EB',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEEBC8',
  },
  scrollBackground: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#FC8019',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  inactiveTabText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 13,
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  ratingCircleContainer: {
    marginBottom: 20,
  },

  ratingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FC8019',
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9CA3AF',
    letterSpacing: 1.5,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  metricValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  metricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  detailIconContainer: {
    marginRight: 16,
  },
  flameCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTextContainer: {
    flex: 1,
  },
  streakText: {
    fontSize: 16,
    color: '#FC8019',
    marginBottom: 2,
  },
  streakNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  streakSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  topPerformerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB', // Light yellow card
    borderWidth: 1,
    borderColor: '#FDE68A', // Yellow border
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
      android: { elevation: 1 },
    }),
  },
  medalCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topPerformerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 2,
  },
  topPerformerZone: {
    fontSize: 13,
    color: '#B45309',
  },
  
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    gap: 12,
  },
  modalUserRowActive: {
    backgroundColor: '#FFF3EB',
    borderColor: '#FEEBC8',
    borderWidth: 1,
  },
  modalUserName: {
    fontSize: 16,
    color: '#4B5563',
  },
  modalCloseBtn: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#6B7280',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
