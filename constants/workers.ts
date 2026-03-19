export type WorkerProfile = {
  id: string;
  code: string;
  name: string;
  city: string;
  vehicle: string;
  hoursPerWeek: number;
  earningsPerWeek: number;
  avatarColor: string;
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
  },
];
