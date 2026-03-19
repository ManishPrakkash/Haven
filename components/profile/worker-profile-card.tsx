import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { SwiggyColors, SwiggyTypography } from "@/constants/swiggy-theme";
import type { WorkerProfile } from "@/constants/workers";

type WorkerProfileCardProps = {
  worker: WorkerProfile;
  isSelected: boolean;
  onSelect: (workerId: string) => void;
};

function getVehicleIconName(vehicle: string): keyof typeof MaterialCommunityIcons.glyphMap {
  if (vehicle.toLowerCase().includes("scooter")) {
    return "scooter";
  }

  if (vehicle.toLowerCase().includes("cycle") || vehicle.toLowerCase().includes("bicycle")) {
    return "bicycle";
  }

  return "motorbike";
}

function formatRupee(value: number) {
  return value.toLocaleString("en-IN");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function WorkerProfileCard({
  worker,
  isSelected,
  onSelect,
}: WorkerProfileCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isSelected ? styles.cardSelected : styles.cardIdle,
        pressed && styles.cardPressed,
      ]}
      android_ripple={{ color: "rgba(252,128,25,0.1)" }}
      onPress={() => onSelect(worker.id)}
    >
      <View style={[styles.avatar, { backgroundColor: worker.avatarColor }]}>
        <Text style={styles.avatarText}>{getInitials(worker.name)}</Text>
      </View>

      <View style={styles.contentWrap}>
        <View style={styles.topRow}>
          <Text style={styles.nameText} numberOfLines={1}>
            {worker.name}
          </Text>
          <View style={styles.codeTag}>
            <Text style={styles.codeText}>{worker.code}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Ionicons
            name="location-sharp"
            size={12}
            color={SwiggyColors.textSecondary}
          />
          <Text style={styles.metaText}>{worker.city}</Text>
          <Text style={styles.dotText}>{"\u2022"}</Text>
          <MaterialCommunityIcons
            name={getVehicleIconName(worker.vehicle)}
            size={12}
            color={SwiggyColors.textSecondary}
          />
          <Text style={styles.metaText}>{worker.vehicle}</Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.metaRow}>
            <Ionicons
              name="time"
              size={12}
              color={SwiggyColors.textSecondary}
            />
            <Text style={styles.metaText}>{worker.hoursPerWeek} hrs/wk</Text>
            <Text style={styles.dotText}>{"\u2022"}</Text>
            <MaterialCommunityIcons
              name="currency-inr"
              size={12}
              color={SwiggyColors.textSecondary}
            />
            <Text style={styles.metaText}>
              Rs.{formatRupee(worker.earningsPerWeek)}/wk
            </Text>
          </View>

          {isSelected ? (
            <View style={styles.selectedBadge}>
              <Ionicons
                name="checkmark"
                size={12}
                color={SwiggyColors.online}
              />
              <Text style={styles.selectedText}>Selected</Text>
            </View>
          ) : (
            <Text style={styles.selectText}>Select</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    minHeight: 124,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  cardSelected: {
    borderColor: SwiggyColors.primary,
    borderWidth: 1.5,
    backgroundColor: SwiggyColors.card,
  },
  cardIdle: {
    borderColor: SwiggyColors.border,
    backgroundColor: SwiggyColors.card,
  },
  cardPressed: {
    opacity: 0.92,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  avatarText: {
    ...SwiggyTypography.bodySmall,
    fontWeight: "700",
    color: SwiggyColors.white,
  },
  contentWrap: {
    flex: 1,
    justifyContent: "flex-start",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
  },
  nameText: {
    ...SwiggyTypography.bodyLarge,
    fontWeight: "700",
    color: SwiggyColors.textPrimary,
    flex: 1,
  },
  codeTag: {
    backgroundColor: SwiggyColors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  codeText: {
    ...SwiggyTypography.bodySmall,
    fontSize: 9,
    lineHeight: 11,
    color: SwiggyColors.white,
    fontWeight: "700",
  },
  metaRow: {
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    ...SwiggyTypography.bodySmall,
    color: SwiggyColors.textSecondary,
  },
  dotText: {
    ...SwiggyTypography.bodySmall,
    color: SwiggyColors.textHint,
    marginHorizontal: 2,
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    ...SwiggyTypography.bodySmall,
    color: SwiggyColors.primary,
    fontWeight: "600",
    marginTop: 1,
  },
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minHeight: 24,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 11,
    backgroundColor: SwiggyColors.onlineBg,
  },
  selectedText: {
    ...SwiggyTypography.bodySmall,
    color: SwiggyColors.online,
    fontWeight: "600",
  },
});
