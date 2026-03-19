import { Order } from '../types/order';

export interface OrderService {
  getPendingOrder(): Promise<Order | null>;
  getTodayDeliveries(): Promise<Order[]>;
  acceptOrder(orderId: string): Promise<boolean>;
  rejectOrder(orderId: string): Promise<boolean>;
  getDeliveryStats(): Promise<{ total: number; completed: number }>;
}

class MockOrderService implements OrderService {
  private generateOrderId(): string {
    return `ORD-${Math.floor(Math.random() * 9000) + 1000}`;
  }

  private generateRestaurant(): string {
    const restaurants = [
      'Pizza Hub, Anna Nagar',
      'Burger King, OMR',
      'Fresh Menu, Velachery',
      'Starbucks, Adyar',
      'KFC, T Nagar',
      'Domino\'s, Guindy',
      'Subway, Besant Nagar',
      'McDonald\'s, Marina'
    ];
    return restaurants[Math.floor(Math.random() * restaurants.length)];
  }

  private generateAddress(): string {
    const addresses = [
      '23, Nehru Street',
      '7, MKB Nagar',
      '45, Gandhi Road',
      '12, Anna Salai',
      '89, Mount Road',
      '34, Ranganathan Street',
      '56, Pondy Bazaar',
      '78, Usman Road'
    ];
    return addresses[Math.floor(Math.random() * addresses.length)];
  }

  private generateTimeAgo(): string {
    const minutes = Math.floor(Math.random() * 30) + 1;
    return `${minutes} min ago`;
  }

  private generateDeliveryTime(): string {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const period = hours <= 12 ? 'AM' : 'PM';
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  private generateOrder(status: 'pending' | 'delivered'): Order {
    return {
      id: status === 'pending' ? 'ORD-9921' : this.generateOrderId(),
      restaurant: status === 'pending' ? 'Pizza Hub, Anna Nagar' : this.generateRestaurant(),
      pickup: status === 'pending' ? '23, Nehru Street' : '',
      drop: status === 'pending' ? '7, MKB Nagar' : '',
      distance: status === 'pending' ? 2.3 : Math.round((Math.random() * 8 + 0.5) * 10) / 10,
      fee: status === 'pending' ? 45 : Math.floor(Math.random() * 50) + 25,
      status,
      time: status === 'pending' ? '2 min ago' : this.generateDeliveryTime(),
    };
  }

  async getPendingOrder(): Promise<Order | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 70% chance of having a pending order
    if (Math.random() > 0.3) {
      return this.generateOrder('pending');
    }
    return null;
  }

  async getTodayDeliveries(): Promise<Order[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const deliveryCount = Math.floor(Math.random() * 15) + 5;
    const deliveries: Order[] = [];
    
    for (let i = 0; i < deliveryCount; i++) {
      deliveries.push(this.generateOrder('delivered'));
    }
    
    return deliveries.sort((a, b) => {
      // Sort by time (latest first)
      const timeA = parseInt(a.time.split(':')[0]);
      const timeB = parseInt(b.time.split(':')[0]);
      return timeB - timeA;
    });
  }

  async acceptOrder(orderId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 95% success rate
    return Math.random() > 0.05;
  }

  async rejectOrder(orderId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Always succeed for rejection
    return true;
  }

  async getDeliveryStats(): Promise<{ total: number; completed: number }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const deliveries = await this.getTodayDeliveries();
    return {
      total: deliveries.length,
      completed: deliveries.length,
    };
  }
}

export const orderService = new MockOrderService();
