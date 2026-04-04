export interface Order {
  id: string;
  restaurant: string;
  pickup: string;
  drop: string;
  distance: number;
  fee: number;
  status: "pending" | "delivered";
  time: string;
}

export interface DeliveryStats {
  total: number;
  completed: number;
  earnings: number;
}
