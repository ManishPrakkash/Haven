import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { WorkerProfileCard } from "@/components/profile/worker-profile-card";
import { SwiggyColors, SwiggyTypography } from "@/constants/swiggy-theme";
import { workerProfiles } from "@/constants/workers";

type NavTab = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const navTabs: NavTab[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "orders", label: "Orders", icon: "document-text" },
  { id: "profiles", label: "Profiles", icon: "person" },
  { id: "earnings", label: "Earnings", icon: "wallet" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const TAB_BAR_BASE_HEIGHT = 58;

export default function ProfileSelectScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const defaultSelectedId = useMemo(() => workerProfiles[0]?.id ?? "", []);
  const [selectedWorkerId, setSelectedWorkerId] = useState(defaultSelectedId);

  const handleWorkerSelect = (workerId: string) => {
    setSelectedWorkerId(workerId);

    router.push({
      pathname: "/home",
      params: { workerId },
    });
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.screenContainer}>
        <View style={styles.headerSection}>
          <View style={styles.headerWrap}>
            <Text style={styles.screenTitle}>Select Delivery Partner</Text>
            <Text style={styles.screenSubtitle}>
              Switch worker profile to simulate delivery data
            </Text>
          </View>
        </View>

        <FlatList
          data={workerProfiles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom:
                TAB_BAR_BASE_HEIGHT + Math.max(insets.bottom, 6) + 14,
            },
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WorkerProfileCard
              worker={item}
              isSelected={item.id === selectedWorkerId}
              onSelect={handleWorkerSelect}
            />
          )}
        />

        <View
          style={[
            styles.tabBar,
            {
              height: TAB_BAR_BASE_HEIGHT + Math.max(insets.bottom, 6),
              paddingBottom: Math.max(insets.bottom, 6),
            },
          ]}
        >
          {navTabs.map((tab) => {
            const isActive = tab.id === "profiles";

            return (
              <Pressable
                key={tab.id}
                style={styles.tabItem}
                onPress={() => {
                  if (tab.id === "home") router.push("/home");
                  if (tab.id === "orders") router.push("/orders");
                }}
              >
                <Ionicons
                  name={tab.icon}
                  size={18}
                  color={
                    isActive ? SwiggyColors.primary : SwiggyColors.textDisabled
                  }
                />
                <Text
                  style={[styles.tabLabel, isActive && styles.tabLabelActive]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D5D5DB",
  },
  screenContainer: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: "#E2E2E7",
    borderBottomWidth: 1,
    borderBottomColor: "#CFD0D8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 2,
  },
  headerWrap: {
    paddingTop: 10,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  screenTitle: {
    ...SwiggyTypography.sectionTitle,
    color: SwiggyColors.textPrimary,
    fontWeight: "700",
  },
  screenSubtitle: {
    ...SwiggyTypography.bodySmall,
    color: SwiggyColors.textSecondary,
    marginTop: 3,
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#D8D8DD",
    backgroundColor: SwiggyColors.card,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    gap: 3,
  },
  tabLabel: {
    ...SwiggyTypography.caption,
    color: SwiggyColors.textDisabled,
    fontSize: 9,
    lineHeight: 10,
  },
  tabLabelActive: {
    color: SwiggyColors.primary,
    fontWeight: "600",
  },
});
