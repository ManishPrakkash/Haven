import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SwiggyColors } from "../../constants/swiggy-theme";
import { useOrders } from "../../hooks/use-orders";

export default function OrdersScreen() {
  const router = useRouter();
  const {
    pendingOrder,
    todayDeliveries,
    loading,
    error,
    refreshing,
    acceptOrder,
    rejectOrder,
    refreshOrders,
  } = useOrders();

  const handleAcceptOrder = async (orderId: string) => {
    const success = await acceptOrder(orderId);
    if (success) {
      // Order is already handled in the hook
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    const success = await rejectOrder(orderId);
    if (success) {
      // Order is already handled in the hook
    }
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => router.back()} style={styles.headerIconLeft}>
              <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
            </Pressable>
            <Text style={styles.headerTitle}>Orders</Text>
            <View style={styles.headerRight}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlinePillText}>ONLINE</Text>
            </View>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={SwiggyColors.primary} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.headerIconLeft}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Orders</Text>
          <View style={styles.headerRight}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlinePillText}>ONLINE</Text>
          </View>
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={20} color={SwiggyColors.offline} />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={refreshOrders}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshOrders}
            colors={[SwiggyColors.primary]}
            tintColor={SwiggyColors.primary}
          />
        }
      >
        {pendingOrder && (
          <View style={styles.pendingOrderCard}>
            <View style={styles.pendingCardTopBorder} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>{pendingOrder.id}</Text>
                <View style={styles.timeContainer}>
                  <Ionicons name="time" size={12} color="#686B78" />
                  <Text style={styles.timeText}>{pendingOrder.time}</Text>
                </View>
              </View>

              <Text style={styles.restaurantName}>{pendingOrder.restaurant}</Text>

              <View style={styles.addressContainer}>
                <View style={styles.addressRow}>
                  <View style={styles.iconColumn}>
                    <View style={styles.pickupDotContainer}>
                      <View style={styles.pickupDot} />
                    </View>
                  </View>
                  <View style={styles.addressTextColumn}>
                    <Text style={styles.addressLabel}>PICKUP</Text>
                    <Text style={styles.addressText}>{pendingOrder.pickup}</Text>
                  </View>
                </View>

                <View style={styles.iconColumnLine}>
                  <View style={styles.dottedLine} />
                </View>

                <View style={styles.addressRow}>
                  <View style={styles.iconColumn}>
                    <View style={styles.dropDotContainer}>
                      <View style={styles.dropDot} />
                    </View>
                  </View>
                  <View style={styles.addressTextColumn}>
                    <Text style={styles.addressLabel}>DROP</Text>
                    <Text style={styles.addressText}>{pendingOrder.drop}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.separator} />

              <View style={styles.cardFooter}>
                <View style={styles.distanceContainer}>
                  <Ionicons
                    name="git-compare-outline"
                    size={16}
                    color={SwiggyColors.primary}
                    style={{ transform: [{ rotate: "90deg" }] }}
                  />
                  <Text style={styles.distanceText}>{pendingOrder.distance} km</Text>
                </View>
                <Text style={styles.feeText}>Rs.{pendingOrder.fee}</Text>
              </View>

              <View style={styles.buttonRow}>
                <Pressable style={styles.rejectButton} onPress={() => handleRejectOrder(pendingOrder.id)}>
                  <Text style={styles.rejectButtonText}>Reject</Text>
                </Pressable>
                <Pressable style={styles.acceptButton} onPress={() => handleAcceptOrder(pendingOrder.id)}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}

        <View style={styles.deliveriesHeader}>
          <Text style={styles.deliveriesTitle}>Today's Deliveries</Text>
          <Text style={styles.deliveriesCount}>{todayDeliveries.length} deliveries</Text>
        </View>

        {todayDeliveries.map((order) => (
          <View key={order.id} style={styles.deliveryCard}>
            <View style={styles.deliveryCardAccent} />
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryOrderId}>{order.id}</Text>
              <Text style={styles.deliveryRestaurant}>{order.restaurant}</Text>
              <Text style={styles.deliveryTime}>
                {order.time} • {order.distance} km
              </Text>
            </View>
            <View style={styles.deliveryRight}>
              <View style={styles.deliveredBadge}>
                <Text style={styles.deliveredText}>DELIVERED</Text>
              </View>
              <Text style={styles.deliveryFee}>Rs.{order.fee}</Text>
            </View>
          </View>
        ))}

        {todayDeliveries.length === 0 && !pendingOrder && (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={48} color={SwiggyColors.textDisabled} />
            <Text style={styles.emptyStateTitle}>No orders yet</Text>
            <Text style={styles.emptyStateText}>New orders will appear here</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  // Header styles
  headerWrapper: {
    backgroundColor: "#F8F8F8",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerIconLeft: {
    paddingRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
    marginRight: 6,
  },
  onlinePillText: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  // Loading & Error States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: SwiggyColors.textSecondary,
    fontWeight: "500",
  },
  errorContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: SwiggyColors.offlineBg,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: SwiggyColors.offline,
    fontWeight: "500",
  },
  retryButton: {
    backgroundColor: SwiggyColors.offline,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  retryButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Scroll View
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  // Pending Order Card
  pendingOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pendingCardTopBorder: {
    height: 4,
    backgroundColor: "#FC8019",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#8E8E93",
    marginLeft: 4,
    fontWeight: "500",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  // Address Section
  addressContainer: {
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconColumn: {
    width: 24,
    alignItems: "center",
  },
  addressTextColumn: {
    marginLeft: 8,
    flex: 1,
  },
  pickupDotContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#E8F5E8",
    justifyContent: "center",
    alignItems: "center",
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
  dropDotContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
  },
  iconColumnLine: {
    width: 24,
    alignItems: "center",
    height: 20,
  },
  dottedLine: {
    width: 1,
    flex: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addressLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "400",
  },
  // Divider
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginBottom: 12,
  },
  // Card Footer
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  feeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3AB04B",
  },
  // Action Buttons
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF3B30",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  rejectButtonText: {
    color: "#FF3B30",
    fontWeight: "600",
    fontSize: 14,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  // Today's Deliveries Section
  deliveriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  deliveriesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  deliveriesCount: {
    color: "#FC8019",
    fontWeight: "500",
    fontSize: 14,
  },
  // Delivery Cards
  deliveryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  deliveryCardAccent: {
    width: 4,
    backgroundColor: "#4CAF50",
  },
  deliveryInfo: {
    flex: 1,
    padding: 12,
    paddingLeft: 12,
  },
  deliveryOrderId: {
    fontSize: 11,
    color: "#8E8E93",
    fontWeight: "500",
    marginBottom: 2,
  },
  deliveryRestaurant: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 12,
    color: "#8E8E93",
  },
  deliveryRight: {
    padding: 12,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  deliveredBadge: {
    backgroundColor: "#E8F5E8",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
  },
  deliveredText: {
    color: "#4CAF50",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  deliveryFee: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: SwiggyColors.textPrimary,
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: SwiggyColors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
});
