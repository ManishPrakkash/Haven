import { useState, useEffect } from 'react';

export const PROFILES_DATA = [
  {
    id: '1',
    name: 'Ilamsaravanbalaji',
    city: 'Chennai',
    badge: 'SW-CHE-004821',
    status: 'Active Partner',
    mobile: '+91 9876543210',
    vehicle: 'Electric Scooter',
    vehicleIcon: 'moped',
    weeklyHours: '48 hrs/wk',
    avgEarnings: 'Rs.4,200/wk',
    partnerSince: 'Oct 2023',
    insurance: 'GigShield Active',
    performance: {
      rating: '4.8',
      attendance: 95,
      onTime: 98,
      acceptance: 92,
      streak: 15,
      isTopPerformer: true,
      zone: 'Anna Nagar Zone'
    }
  },
  {
    id: '2',
    name: 'Kavinkumar',
    city: 'Coimbatore',
    badge: 'SW-CBE-009122',
    status: 'Active Partner',
    mobile: '+91 9123456780',
    vehicle: 'Motorcycle',
    vehicleIcon: 'motorbike',
    weeklyHours: '36 hrs/wk',
    avgEarnings: 'Rs.3,100/wk',
    partnerSince: 'Jan 2024',
    insurance: 'GigShield Active',
    performance: {
      rating: '4.5',
      attendance: 88,
      onTime: 92,
      acceptance: 85,
      streak: 5,
      isTopPerformer: false,
      zone: 'Peelamedu Zone'
    }
  },
  {
    id: '3',
    name: 'Keerthi Aanand',
    city: 'Bangalore',
    badge: 'SW-BLR-001155',
    status: 'Premium Partner',
    mobile: '+91 9988776655',
    vehicle: 'Bicycle',
    vehicleIcon: 'bicycle',
    weeklyHours: '20 hrs/wk',
    avgEarnings: 'Rs.1,500/wk',
    partnerSince: 'Mar 2024',
    insurance: 'GigShield Active',
    performance: {
      rating: '4.9',
      attendance: 99,
      onTime: 99,
      acceptance: 98,
      streak: 30,
      isTopPerformer: true,
      zone: 'Indiranagar Zone'
    }
  },
  {
    id: '4',
    name: 'Manish Prakkash',
    city: 'Hyderabad',
    badge: 'SW-HYD-007744',
    status: 'Active Partner',
    mobile: '+91 9876512345',
    vehicle: 'Electric Scooter',
    vehicleIcon: 'moped',
    weeklyHours: '55 hrs/wk',
    avgEarnings: 'Rs.6,800/wk',
    partnerSince: 'Jul 2022',
    insurance: 'GigShield Active',
    performance: {
      rating: '4.2',
      attendance: 80,
      onTime: 85,
      acceptance: 75,
      streak: 2,
      isTopPerformer: false,
      zone: 'Kukatpally Zone'
    }
  }
];

type Listener = () => void;
let currentUserIndex = 0;
const listeners = new Set<Listener>();

export const userStore = {
  getCurrentUserIndex: () => currentUserIndex,
  getProfile: () => PROFILES_DATA[currentUserIndex],
  setCurrentUserIndex: (index: number) => {
    currentUserIndex = index;
    listeners.forEach((l) => l());
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useUserStore() {
  const [index, setIndex] = useState(userStore.getCurrentUserIndex());
  
  useEffect(() => {
    const unsubscribe = userStore.subscribe(() => {
      setIndex(userStore.getCurrentUserIndex());
    });
    return unsubscribe;
  }, []);
  
  return {
    currentUserIndex: index,
    profile: userStore.getProfile(),
    setCurrentUserIndex: userStore.setCurrentUserIndex
  };
}
