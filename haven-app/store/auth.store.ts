import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  registrationToken: string | null;  // Short-lived token for onboarding
  tempPhone: string | null;          // Phone number during registration
  setLoggedIn: (userId: string) => void;
  setRegistrationToken: (token: string, phone: string) => void;
  logout: () => Promise<void>;
  hydrateFromSecureStore: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userId: null,
      registrationToken: null,
      tempPhone: null,

      setLoggedIn: (userId) => set({ isLoggedIn: true, userId, registrationToken: null, tempPhone: null }),

      setRegistrationToken: (token, phone) => set({ registrationToken: token, tempPhone: phone }),

      logout: async () => {
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        await SecureStore.deleteItemAsync('user_id');
        set({ isLoggedIn: false, userId: null, registrationToken: null, tempPhone: null });
      },

      hydrateFromSecureStore: async () => {
        const userId = await SecureStore.getItemAsync('user_id');
        const token = await SecureStore.getItemAsync('access_token');
        if (userId && token) set({ isLoggedIn: true, userId });
      },
    }),
    {
      name: 'haven-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn, userId: state.userId }),
    }
  )
);
