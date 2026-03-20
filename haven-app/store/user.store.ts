import { create } from 'zustand';

interface UserState {
  data: any | null;
  setVerifiedWorker: (workerData: any) => void;
  setUserProfile: (profile: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  data: null,
  setVerifiedWorker: (workerData) => set({ data: workerData }),
  setUserProfile: (profile) => set({ data: profile }),
  clearUser: () => set({ data: null }),
}));
