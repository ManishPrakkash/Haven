import { Platform } from "react-native";

export const SwiggyColors = {
  primary: "#FC8019",
  primaryDark: "#E8701A",
  primaryLight: "#FFF3EB",

  background: "#F0F0F5",
  card: "#FFFFFF",

  textPrimary: "#1A1A1A",
  textSecondary: "#686B78",
  textDisabled: "#93959F",
  textHint: "#B6B7BD",

  online: "#3AB04B",
  onlineBg: "#EBF8EE",
  offline: "#E23744",
  offlineBg: "#FFF0F0",

  divider: "#E9E9EB",
  border: "#F0F0F0",
  shadow: "#00000015",

  rain: "#1565C0",
  aqi: "#5D4037",
  heat: "#BF360C",
  outage: "#E23744",
  curfew: "#F57C00",

  star: "#F3B814",
  badge: "#F88531",

  white: "#FFFFFF",
} as const;

const primaryFont = Platform.select({
  ios: "System",
  android: "Roboto",
  default: "System",
});

export const SwiggyTypography = {
  earningsLarge: {
    fontSize: 32,
    fontWeight: "700" as const,
    fontFamily: primaryFont,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    fontFamily: primaryFont,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    fontFamily: primaryFont,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    fontFamily: primaryFont,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: "400" as const,
    fontFamily: primaryFont,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "400" as const,
    fontFamily: primaryFont,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: "400" as const,
    fontFamily: primaryFont,
  },
  labelOrange: {
    fontSize: 13,
    fontWeight: "500" as const,
    color: SwiggyColors.primary,
    fontFamily: primaryFont,
  },
  labelGrey: {
    fontSize: 12,
    fontWeight: "400" as const,
    color: SwiggyColors.textSecondary,
    fontFamily: primaryFont,
  },
  caption: {
    fontSize: 11,
    fontWeight: "400" as const,
    color: SwiggyColors.textDisabled,
    fontFamily: primaryFont,
  },
} as const;
