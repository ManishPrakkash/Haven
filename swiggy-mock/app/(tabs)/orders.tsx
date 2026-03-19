import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Order = {
  id: string;
  restaurant: string;
  pickup: string;
  drop: string;
  distance: number;
  fee: number;
  status: "pending" | "delivered";
  time: string;
};

const pendingOrder: Order = {
  id: "ORD-8921",
  restaurant: "Pizza Hub, Anna Nagar",
  pickup: "23, Nehru Street",
  drop: "7, MKB Nagar",
  distance: 2.3,
  fee: 45,
  status: "pending",
  time: "2 min ago",
};

const pastDeliveries: Order[] = [
  {
    id: "ORD-9842",
    restaurant: "Burger King, OMR",
    pickup: "",
    drop: "",
    distance: 4.1,
    fee: 62,
    status: "delivered",
    time: "12:30 PM",
  },
  {
    id: "ORD-9811",
    restaurant: "Fresh Menu, Velachery",
    pickup: "",
    drop: "",
    distance: 1.8,
    fee: 38,
    status: "delivered",
    time: "11:15 AM",
  },
  {
    id: "ORD-9788",
    restaurant: "Starbucks, Adyar",
    pickup: "",
    drop: "",
    distance: 2.5,
    fee: 41,
    status: "delivered",
    time: "10:45 AM",
  },
];

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={{ paddingRight: 16 }}>
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Orders</Text>
        </View>
        <View style={styles.onlinePill}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlinePillText}>ONLINE</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
                <Ionicons name="git-compare-outline" size={16} color="#FC8019" style={{ transform: [{ rotate: "90deg" }] }} />
                <Text style={styles.distanceText}>
                  {pendingOrder.distance} km
                </Text>
              </View>
              <Text style={styles.feeText}>Rs.{pendingOrder.fee}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.rejectButton}>
                <Text style={styles.rejectButtonText}>Reject</Text>
              </Pressable>
              <Pressable style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.deliveriesHeader}>
          <Text style={styles.deliveriesTitle}>Today's Deliveries</Text>
          <Text style={styles.deliveriesCount}>12 deliveries</Text>
        </View>

        {pastDeliveries.map((order) => (
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#F0F0F5",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  onlinePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF8EE",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3AB04B",
    marginRight: 6,
  },
  onlinePillText: {
    color: "#3AB04B",
    fontWeight: "600",
    fontSize: 10,
    letterSpacing: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  pendingOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  pendingCardTopBorder: {
    height: 3,
    backgroundColor: "#FC8019",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    color: "#686B78",
    fontWeight: "500",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#686B78",
    marginLeft: 4,
    fontWeight: "500",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
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
    backgroundColor: "#EBF8EE",
    justifyContent: "center",
    alignItems: "center",
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3AB04B",
  },
  dropDotContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFF3EB",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FC8019",
  },
  iconColumnLine: {
    width: 24,
    alignItems: "center",
    height: 16,
  },
  dottedLine: {
    width: 1,
    flex: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#D4D5D9",
  },
  addressLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#93959F",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  addressText: {
    fontSize: 13,
    color: "#1A1A1A",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F5",
    marginBottom: 16,
  },
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
    color: "#686B78",
    fontWeight: "500",
  },
  feeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3AB04B",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: "#E23744",
    borderRadius: 8,
    paddingVertical: 12,
    width: "48%",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  rejectButtonText: {
    color: "#E23744",
    fontWeight: "bold",
    fontSize: 14,
  },
  acceptButton: {
    backgroundColor: "#3AB04B",
    borderRadius: 8,
    paddingVertical: 12,
    width: "48%",
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  deliveriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deliveriesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  deliveriesCount: {
    color: "#FC8019",
    fontWeight: "600",
    fontSize: 12,
  },
  deliveryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  deliveryCardAccent: {
    width: 4,
    backgroundColor: "#3AB04B",
  },
  deliveryInfo: {
    flex: 1,
    padding: 12,
    paddingLeft: 12,
  },
  deliveryOrderId: {
    fontSize: 11,
    color: "#93959F",
    fontWeight: "600",
  },
  deliveryRestaurant: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginVertical: 4,
  },
  deliveryTime: {
    fontSize: 11,
    color: "#686B78",
  },
  deliveryRight: {
    padding: 12,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  deliveredBadge: {
    backgroundColor: "#EBF8EE",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deliveredText: {
    color: "#3AB04B",
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  deliveryFee: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1A1A1A",
  },
});
