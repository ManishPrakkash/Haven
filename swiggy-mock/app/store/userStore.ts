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
    avgEarnings: 'Rs.4,200',
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
    },
    homeStats: {
      todayEarnings: 1247,
      deliveriesToday: 12,
      hoursToday: 6.5,
      isOnline: false,
      deliveryZone: 'Anna Nagar'
    },
    earningsStats: {
      weekTotal: '4,200',
      deliveries: '3,400',
      peakBonus: '600',
      tips: '200',
      onlineHours: '8.5',
      onlineProgress: 85,
      deliveryTargetText: '12 / 15',
      deliveryProgress: 80,
      distance: '42 km',
      distanceProgress: 70
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
    avgEarnings: 'Rs.3,100',
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
    },
    homeStats: {
      todayEarnings: 980,
      deliveriesToday: 8,
      hoursToday: 5.2,
      isOnline: false,
      deliveryZone: 'T. Nagar'
    },
    earningsStats: {
      weekTotal: '3,100',
      deliveries: '2,800',
      peakBonus: '200',
      tips: '100',
      onlineHours: '5.2',
      onlineProgress: 52,
      deliveryTargetText: '8 / 15',
      deliveryProgress: 53,
      distance: '28 km',
      distanceProgress: 40
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
    avgEarnings: 'Rs.1,500',
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
    },
    homeStats: {
      todayEarnings: 1560,
      deliveriesToday: 15,
      hoursToday: 7.8,
      isOnline: false,
      deliveryZone: 'Adyar'
    },
    earningsStats: {
      weekTotal: '1,500',
      deliveries: '1,100',
      peakBonus: '300',
      tips: '100',
      onlineHours: '7.8',
      onlineProgress: 95,
      deliveryTargetText: '15 / 15',
      deliveryProgress: 100,
      distance: '65 km',
      distanceProgress: 90
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
    avgEarnings: 'Rs.6,800',
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
    },
    homeStats: {
      todayEarnings: 1120,
      deliveriesToday: 10,
      hoursToday: 6.0,
      isOnline: false,
      deliveryZone: 'Velachery'
    },
    earningsStats: {
      weekTotal: '6,800',
      deliveries: '5,000',
      peakBonus: '1,500',
      tips: '300',
      onlineHours: '6.0',
      onlineProgress: 60,
      deliveryTargetText: '10 / 15',
      deliveryProgress: 66,
      distance: '35 km',
      distanceProgress: 50
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
