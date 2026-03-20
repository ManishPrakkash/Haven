import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';

export default function AuthLayout() {
  const { isLoggedIn } = useAuthStore();
  
  if (isLoggedIn) {
     return <Redirect href="/(main)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    />
  );
}
