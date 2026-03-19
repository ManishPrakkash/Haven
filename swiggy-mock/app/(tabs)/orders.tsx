import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const pastOrders = [
  { id: 'ORD-9842', restaurant: 'Burger King, OMR', time: '12:30 PM', distance: '4.1 km', amount: 62 },
  { id: 'ORD-9811', restaurant: 'Fresh Menu, Velachery', time: '11:15 AM', distance: '1.8 km', amount: 38 },
  { id: 'ORD-9788', restaurant: 'Starbucks, Adyar', time: '10:45 AM', distance: '2.5 km', amount: 41 },
];

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Orders</Text>
        </View>
        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>ONLINE</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollBackground} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]} showsVerticalScrollIndicator={false}>
        {/* CURRENT ORDER CARD */}
        <View style={styles.currentOrderCard}>
          <View style={styles.currentOrderCardTopBorder} />
          
          <View style={styles.innerCardPadding}>
            {/* Header: ID and Time */}
            <View style={styles.currentOrderHeader}>
              <Text style={styles.orderId}>ORD-9921</Text>
              <View style={styles.timeContainer}>
                <MaterialCommunityIcons name="clock-time-four" size={14} color="#888" />
                <Text style={styles.timeText}>2 min ago</Text>
              </View>
            </View>

            {/* Restaurant Name */}
            <Text style={styles.restaurantName}>Pizza Hub, Anna Nagar</Text>

            {/* Timeline / Route */}
            <View style={styles.routeContainer}>
              <View style={styles.routeTimeline}>
                <View style={styles.pickupDotOuter}>
                  <View style={styles.pickupDotInner} />
                </View>
                {/* Dotted Line */}
                <View style={styles.dottedLineContainer}>
                  {[...Array(6)].map((_, i) => (
                    <View key={i} style={styles.dotSegment} />
                  ))}
                </View>
                <View style={styles.dropDotOuter}>
                  <View style={styles.dropDotInner} />
                </View>
              </View>
              
              <View style={styles.routeDetails}>
                <View style={styles.routeStop}>
                  <Text style={styles.routeLabelBlue}>PICKUP</Text>
                  <Text style={styles.routeAddress}>23, Nehru Street</Text>
                </View>
                <View style={[styles.routeStop, { marginTop: 16 }]}>
                  <Text style={styles.routeLabelBlue}>DROP</Text>
                  <Text style={styles.routeAddress}>7, MKB Nagar</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Distance and Price */}
            <View style={styles.distancePriceRow}>
              <View style={styles.distanceContainer}>
                <MaterialCommunityIcons name="transit-connection-variant" size={18} color="#FC8019" style={{ transform: [{ rotate: '90deg' }] }} />
                <Text style={styles.distanceText}>2.3 km</Text>
              </View>
              <Text style={styles.priceText}>Rs.45</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.rejectBtn}>
                <Text style={styles.rejectBtnText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptBtn}>
                <Text style={styles.acceptBtnText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* TODAY'S DELIVERIES HEADER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Deliveries</Text>
          <Text style={styles.deliveryCount}>12 deliveries</Text>
        </View>

        {/* DELIVERIES LIST */}
        <View style={styles.deliveriesList}>
          {pastOrders.map((order) => (
            <View key={order.id} style={styles.pastOrderCard}>
              <View style={styles.greenLeftBorder} />
              <View style={styles.pastOrderCardInner}>
                <View style={styles.pastOrderHeader}>
                  <Text style={styles.pastOrderId}>{order.id}</Text>
                  <View style={styles.deliveredBadge}>
                    <Text style={styles.deliveredBadgeText}>DELIVERED</Text>
                  </View>
                </View>
                <Text style={styles.pastRestaurantName}>{order.restaurant}</Text>
                <View style={styles.pastOrderFooter}>
                  <Text style={styles.pastOrderMeta}>{order.time} • {order.distance}</Text>
                  <Text style={styles.pastOrderPrice}>Rs.{order.amount}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: '#fff',
  },
  scrollBackground: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9', // Light green background
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  onlineText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  currentOrderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  currentOrderCardTopBorder: {
    height: 4,
    backgroundColor: '#FC8019', // Orange border at the top
    width: '100%',
  },
  innerCardPadding: {
    padding: 16,
  },
  currentOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  routeTimeline: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  pickupDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E8F5E9', // Light green
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50', // Solid green
  },
  dropDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF3E0', // Light orange
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FC8019', // Solid orange
  },
  dottedLineContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 2,
    marginVertical: 4,
  },
  dotSegment: {
    width: 2,
    height: 4,
    backgroundColor: '#D1D5DB', // Gray line dots
    borderRadius: 1,
  },
  routeDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  routeStop: {
    justifyContent: 'center',
  },
  routeLabelBlue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8797B2', // Slate/blueish color for "PICKUP" / "DROP" labels
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  routeAddress: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  distancePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginLeft: 6,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Green price
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // React Native gap
  },
  rejectBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444', // Red outline
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtnText: {
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 15,
  },
  acceptBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#38A169', // Solid green background
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  deliveryCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FC8019', // Orange color
  },
  deliveriesList: {
    gap: 12,
  },
  pastOrderCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  greenLeftBorder: {
    width: 6,
    backgroundColor: '#38A169', // Green left border indicator
  },
  pastOrderCardInner: {
    flex: 1,
    padding: 16,
  },
  pastOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pastOrderId: {
    fontSize: 13,
    color: '#8797B2', // Slate match from pickup label
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  deliveredBadge: {
    backgroundColor: '#E8F8EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deliveredBadgeText: {
    color: '#38A169',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  pastRestaurantName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  pastOrderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pastOrderMeta: {
    fontSize: 13,
    color: '#888',
  },
  pastOrderPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
});
