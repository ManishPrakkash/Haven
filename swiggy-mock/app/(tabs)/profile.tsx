import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* HEADER SECTION (White Background) */}
      <View style={styles.headerContainer}>
        <View style={styles.topRightActions}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileHeader}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarInner}>
              <MaterialCommunityIcons name="shopping" size={32} color="#84CC16" />
            </View>
          </View>

          {/* Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Rahul Sharma</Text>
            <Text style={styles.city}>Chennai</Text>
            
            <View style={styles.badgesRow}>
              <View style={styles.orangeBadge}>
                <Text style={styles.orangeBadgeText}>SW-CHE-004821</Text>
              </View>
              <View style={styles.greenBadge}>
                <Text style={styles.greenBadgeText}>Active Partner</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* SCROLLABLE LIST (Gray Background) */}
      <ScrollView 
        style={styles.scrollBackground} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Mobile */}
          <View style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="call" size={20} color="#8797B2" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listLabel}>MOBILE</Text>
              <Text style={styles.listValue}>+91 9876543210</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Vehicle Type */}
          <View style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <MaterialCommunityIcons name="moped" size={20} color="#8797B2" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listLabel}>VEHICLE TYPE</Text>
              <Text style={styles.listValue}>Electric Scooter</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* City */}
          <View style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="location-sharp" size={20} color="#8797B2" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listLabel}>CITY</Text>
              <Text style={styles.listValue}>Chennai</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Weekly Hours */}
          <View style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="time" size={20} color="#8797B2" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listLabel}>WEEKLY HOURS</Text>
              <Text style={styles.listValue}>48 hrs/wk</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Average Earnings */}
          <View style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <MaterialCommunityIcons name="cash-multiple" size={20} color="#8797B2" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listLabel}>AVERAGE EARNINGS</Text>
              <Text style={styles.listValue}>Rs.4,200/wk</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Partner Since */}
          <View style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="calendar" size={20} color="#8797B2" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listLabel}>PARTNER SINCE</Text>
              <Text style={styles.listValue}>Oct 2023</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Insurance Status */}
          <View style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <MaterialCommunityIcons name="shield-check-outline" size={20} color="#8797B2" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listLabel}>INSURANCE STATUS</Text>
              <View style={styles.statusRow}>
                <Text style={styles.listValueGreen}>GigShield Active</Text>
                <Ionicons name="checkmark-circle" size={16} color="#38A169" style={{ marginLeft: 4 }} />
              </View>
            </View>
          </View>
        </View>

        {/* SWITCH BUTTON */}
        <TouchableOpacity style={styles.switchButton}>
          <MaterialCommunityIcons name="account-switch" size={20} color="#FC8019" />
          <Text style={styles.switchButtonText}>Switch Delivery Partner</Text>
        </TouchableOpacity>

        {/* FOOTER VERSION */}
        <Text style={styles.footerVersion}>Mock Swiggy v1.0.0 | GigShield Simulator</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingBottom: 24,
  },
  topRightActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FC8019',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FCD34D', // Yellow/Gold inner circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  city: {
    fontSize: 14,
    color: '#8797B2',
    marginBottom: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orangeBadge: {
    backgroundColor: '#FC8019',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orangeBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  greenBadge: {
    backgroundColor: '#E8F8EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  greenBadgeText: {
    color: '#38A169',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollBackground: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Light gray background
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  listIconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  listContent: {
    flex: 1,
    justifyContent: 'center',
  },
  listLabel: {
    fontSize: 11,
    color: '#8797B2',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  listValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  listValueGreen: {
    fontSize: 14,
    color: '#38A169', // Green text for GigShield Active
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 60, // Align divider with content, leaving icon space clear
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FC8019',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 24,
    gap: 8,
  },
  switchButtonText: {
    color: '#FC8019',
    fontWeight: 'bold',
    fontSize: 15,
  },
  footerVersion: {
    textAlign: 'center',
    color: '#8797B2',
    fontSize: 11,
  },
});
