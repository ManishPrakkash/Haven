import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/auth.store';
import { Colors } from '../../constants/colors';

export default function MainLayout() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.navy,
        tabBarInactiveTintColor: Colors.textHint,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopWidth: 1,
          borderTopColor: Colors.divider,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="claims/index"
        options={{
          title: 'Claims',
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="payouts/index"
        options={{
          title: 'Payouts',
          tabBarIcon: ({ color, size }) => <Ionicons name="cash" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
      {/* Hidden from tabs but accessible via navigation */}
      <Tabs.Screen name="plans/index" options={{ href: null }} />
      <Tabs.Screen name="plans/[code]" options={{ href: null }} />
      <Tabs.Screen name="plans/confirm" options={{ href: null }} />
      <Tabs.Screen name="enrollment/agreement" options={{ href: null }} />
      <Tabs.Screen name="enrollment/verify-intro" options={{ href: null }} />
      <Tabs.Screen name="enrollment/selfie" options={{ href: null }} />
      <Tabs.Screen name="enrollment/liveness" options={{ href: null }} />
      <Tabs.Screen name="enrollment/signature" options={{ href: null }} />
      <Tabs.Screen name="enrollment/id-verified" options={{ href: null }} />
      <Tabs.Screen name="enrollment/payment" options={{ href: null }} />
      <Tabs.Screen name="enrollment/success" options={{ href: null }} />
      <Tabs.Screen name="claims/[id]" options={{ href: null }} />
    </Tabs>
  );
}
