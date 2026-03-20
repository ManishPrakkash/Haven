import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthStore } from '../store/auth.store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { hydrateFromSecureStore } = useAuthStore();

  const [fontsLoaded] = useFonts({
    // We will use standard sans-serif system fonts as fallback if Inter files are not available
    // 'Inter-Regular':  require('../assets/fonts/Inter-Regular.ttf'),
    // 'Inter-Medium':   require('../assets/fonts/Inter-Medium.ttf'),
    // 'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    // 'Inter-Bold':     require('../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    async function initialize() {
      await hydrateFromSecureStore();
      // Wait for fonts to load or just hide if we don't strictly require custom fonts yet
      await SplashScreen.hideAsync();
    }
    initialize();
  }, [fontsLoaded, hydrateFromSecureStore]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}
