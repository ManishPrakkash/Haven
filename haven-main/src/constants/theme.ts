/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const BrandColors = {
  primary: '#004771',
  primaryDark: '#00253B',
  secondary: '#FF761E',
  accent: '#005B9E',
  success: '#E8F1FF',
  background: '#FFFFFF',
  text: {
    primary: '#0F172A',
    secondary: '#64748B',
    muted: '#94A3B8',
    light: '#E2E8F0',
    white: '#FFFFFF',
  },
  ui: {
    border: '#E2E8F0',
    card: '#FFFFFF',
    shadow: '#000000',
  }
};

export const Colors = {
  light: {
    text: BrandColors.text.primary,
    background: BrandColors.background,
    tint: BrandColors.accent,
    icon: BrandColors.text.muted,
    tabIconDefault: BrandColors.text.muted,
    tabIconSelected: BrandColors.accent,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
