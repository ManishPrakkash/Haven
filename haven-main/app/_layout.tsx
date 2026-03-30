import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="verification" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="verified-success" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="digilocker" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="otp" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="documents-preview" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="pricing" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding-complete" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="plan-details" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="review-selection" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="policy-agreement" options={{ headerShown: false, animation: 'slide_from_right' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
