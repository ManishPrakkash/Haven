import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

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
  { id: "profiles", label: "Profiles", icon: "person" },
  { id: "earnings", label: "Earnings", icon: "wallet" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const TAB_BAR_BASE_HEIGHT = 58;

export default function ProfileSelectScreen() {
  const insets = useSafeAreaInsets();
  const defaultSelectedId = useMemo(() => workerProfiles[0]?.id ?? "", []);
  const [selectedWorkerId, setSelectedWorkerId] = useState(defaultSelectedId);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.screenContainer}>
        <View style={styles.headerWrap}>
          <Text style={styles.screenTitle}>Select Delivery Partner</Text>
          <Text style={styles.screenSubtitle}>
            Switch worker profile to simulate delivery data
          </Text>
        </View>

        <FlatList
          data={workerProfiles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: TAB_BAR_BASE_HEIGHT + Math.max(insets.bottom, 6) + 14,
            },
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WorkerProfileCard
              worker={item}
              isSelected={item.id === selectedWorkerId}
              onSelect={setSelectedWorkerId}
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
              <View key={tab.id} style={styles.tabItem}>
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
              </View>
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
  headerWrap: {
    paddingTop: 8,
    paddingHorizontal: 12,
    paddingBottom: 10,
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
    paddingTop: 4,
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
