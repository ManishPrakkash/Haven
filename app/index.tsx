import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SwiggyColors, SwiggyTypography } from "@/constants/swiggy-theme";

export default function LandingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.replace("/profile-select");
    }, 3500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />

        <View style={styles.wordmarkWrap}>
          <Text style={styles.brandText}>swiggy</Text>
          <Text style={styles.subtitleText}>Delivery Partner</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SwiggyColors.primary,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SwiggyColors.primary,
    overflow: "hidden",
  },
  glowTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -160,
    left: -100,
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  wordmarkWrap: {
    alignItems: "center",
  },
  brandText: {
    ...SwiggyTypography.earningsLarge,
    fontSize: 44,
    color: SwiggyColors.white,
    lineHeight: 48,
    letterSpacing: -0.6,
    textTransform: "lowercase",
  },
  subtitleText: {
    ...SwiggyTypography.bodyMedium,
    color: SwiggyColors.white,
    opacity: 0.95,
    marginTop: 2,
    letterSpacing: 0.2,
  },
});
