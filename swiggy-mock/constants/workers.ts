export type WorkerProfile = {
  id: string;
  code: string;
  name: string;
  city: string;
  vehicle: string;
  hoursPerWeek: number;
  earningsPerWeek: number;
  avatarColor: string;
  todayEarnings: number;
  deliveriesToday: number;
  hoursToday: number;
  rating: number;
  deliveryZone: string;
  isOnline: boolean;
};

export const workerProfiles: WorkerProfile[] = [
  {
    id: "worker-1",
    code: "SW-CHE-004821",
    name: "Ilamsaravanbalaji",
    city: "Chennai",
    vehicle: "Bike",
    hoursPerWeek: 48,
    earningsPerWeek: 4200,
    avatarColor: "#F28A2E",
    todayEarnings: 1247,
    deliveriesToday: 12,
    hoursToday: 6.5,
    rating: 4.8,
    deliveryZone: "Anna Nagar",
    isOnline: false,
  },
  {
    id: "worker-2",
    code: "SW-BLR-004952",
    name: "Kavinkumar C",
    city: "Bangalore",
    vehicle: "Electric Cycle",
    hoursPerWeek: 36,
    earningsPerWeek: 3100,
    avatarColor: "#2C95A0",
    todayEarnings: 980,
    deliveriesToday: 9,
    hoursToday: 5.1,
    rating: 4.7,
    deliveryZone: "Indiranagar",
    isOnline: false,
  },
  {
    id: "worker-3",
    code: "SW-DEL-005122",
    name: "Keerthi Aanand KS",
    city: "Delhi",
    vehicle: "Scooter",
    hoursPerWeek: 52,
    earningsPerWeek: 5800,
    avatarColor: "#73B158",
    todayEarnings: 1560,
    deliveriesToday: 14,
    hoursToday: 7.2,
    rating: 4.9,
    deliveryZone: "Saket",
    isOnline: false,
  },
  {
    id: "worker-4",
    code: "SW-MUM-003819",
    name: "Manish Prakkash MS",
    city: "Mumbai",
    vehicle: "Bicycle",
    hoursPerWeek: 40,
    earningsPerWeek: 3850,
    avatarColor: "#1D7A7B",
    todayEarnings: 1125,
    deliveriesToday: 10,
    hoursToday: 5.8,
    rating: 4.6,
    deliveryZone: "Andheri West",
    isOnline: false,
  },
];

export function getWorkerProfileById(workerId?: string) {
  if (!workerId) {
    return undefined;
  }

  return workerProfiles.find((worker) => worker.id === workerId);
}
