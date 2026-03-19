import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useUserStore, PROFILES_DATA } from '../store/userStore';

export default function PerformanceScreen() {
  const insets = useSafeAreaInsets();
  const { currentUserIndex, setCurrentUserIndex, profile } = useUserStore();
  const [showModal, setShowModal] = useState(false);

  const { rating, attendance, onTime, acceptance, streak, isTopPerformer, zone } = profile.performance;

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
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.inactiveTabText}>This Month</Text>
          </TouchableOpacity>
        </View>

        {/* CUSTOMER RATING CARD */}
        <View style={styles.mainCard}>
          <View style={styles.ratingCircleContainer}>
            {/* The actual circle border */}
            <View style={styles.largeCircle}>
              <View style={styles.circleGapOverride} />
              <Text style={styles.ratingNumber}>{rating}</Text>
              <Ionicons name="star" size={24} color="#FC8019" style={{ marginTop: 2 }} />
            </View>
          </View>
          <Text style={styles.ratingLabel}>CUSTOMER RATING</Text>
        </View>

        {/* METRICS ROW */}
        <View style={styles.metricsRow}>
          {/* Attendance */}
          <View style={styles.metricCard}>
            <View style={styles.smallCircle}>
              <View style={styles.smallCircleGapOverride} />
              <Text style={styles.metricValue}>{attendance}%</Text>
            </View>
            <Text style={styles.metricLabel}>Attendance</Text>
          </View>

          {/* On-Time */}
          <View style={styles.metricCard}>
            <View style={styles.smallCircle}>
              <View style={styles.smallCircleGapOverride} />
              <Text style={styles.metricValue}>{onTime}%</Text>
            </View>
            <Text style={styles.metricLabel}>On-Time</Text>
          </View>

          {/* Acceptance */}
          <View style={styles.metricCard}>
            <View style={styles.smallCircle}>
              <View style={styles.smallCircleGapOverride} />
              <Text style={styles.metricValue}>{acceptance}%</Text>
            </View>
            <Text style={styles.metricLabel}>Acceptance</Text>
          </View>
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
              <Text style={styles.streakNumber}>{streak}</Text> days
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
  largeCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 10,
    borderColor: '#FC8019',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // Simulation of a non-perfect closed circle (the white gap in the arc design)
  circleGapOverride: {
    position: 'absolute',
    top: -10,
    left: '25%',
    width: 25,
    height: 10,
    backgroundColor: '#F4F4F5', // Soft gray to simulate the uncompleted part
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
  smallCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#FC8019',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  smallCircleGapOverride: {
    position: 'absolute',
    top: -4,
    left: '30%',
    width: 10,
    height: 4,
    backgroundColor: '#F4F4F5',
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
