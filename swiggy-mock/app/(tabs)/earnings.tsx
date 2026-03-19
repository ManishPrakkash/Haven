import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SwiggyColors } from "../../constants/swiggy-theme";
import { useOrders } from "../../hooks/use-orders";

export default function EarningsScreen() {
  const { deliveryStats, loading } = useOrders();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Earnings</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading earnings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earnings</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsLabel}>Today's Earnings</Text>
            <Ionicons name="wallet" size={24} color={SwiggyColors.primary} />
          </View>
          <Text style={styles.earningsAmount}>Rs.{deliveryStats?.earnings || 0}</Text>
          <Text style={styles.earningsSubtext}>
            From {deliveryStats?.completed || 0} deliveries
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={20} color={SwiggyColors.primary} />
            <Text style={styles.statNumber}>{deliveryStats?.total || 0}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={20} color={SwiggyColors.online} />
            <Text style={styles.statNumber}>{deliveryStats?.completed || 0}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={20} color={SwiggyColors.star} />
            <Text style={styles.statNumber}>
              Rs.{deliveryStats?.completed ? Math.round(deliveryStats.earnings / deliveryStats.completed) : 0}
            </Text>
            <Text style={styles.statLabel}>Avg per Order</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiggyColors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: SwiggyColors.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: SwiggyColors.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: SwiggyColors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  earningsCard: {
    backgroundColor: SwiggyColors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  earningsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  earningsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: SwiggyColors.textSecondary,
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: SwiggyColors.textPrimary,
    marginBottom: 8,
  },
  earningsSubtext: {
    fontSize: 14,
    color: SwiggyColors.textSecondary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: SwiggyColors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: SwiggyColors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: SwiggyColors.textSecondary,
    textAlign: "center",
  },
});
