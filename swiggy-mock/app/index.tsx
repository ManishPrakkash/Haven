import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/orders');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
      <View style={styles.content}>
        <Text style={styles.swiggyText}>swiggy</Text>
        <Text style={styles.deliveryText}>Delivery Partner</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  swiggyText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'lowercase',
    letterSpacing: 2,
  },
  deliveryText: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 8,
    fontWeight: '500',
  },
});
