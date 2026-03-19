import { useState, useEffect, useCallback } from 'react';
import { Order, DeliveryStats } from '../types/order';
import { orderService } from '../services/order-service';

interface UseOrdersReturn {
  pendingOrder: Order | null;
  todayDeliveries: Order[];
  deliveryStats: DeliveryStats | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  acceptOrder: (orderId: string) => Promise<boolean>;
  rejectOrder: (orderId: string) => Promise<boolean>;
  refreshOrders: () => Promise<void>;
}

export function useOrders(): UseOrdersReturn {
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);
  const [todayDeliveries, setTodayDeliveries] = useState<Order[]>([]);
  const [deliveryStats, setDeliveryStats] = useState<DeliveryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      
      const [pending, deliveries, stats] = await Promise.all([
        orderService.getPendingOrder(),
        orderService.getTodayDeliveries(),
        orderService.getDeliveryStats(),
      ]);

      setPendingOrder(pending);
      setTodayDeliveries(deliveries);
      
      // Calculate earnings from deliveries
      const totalEarnings = deliveries.reduce((sum, delivery) => sum + delivery.fee, 0);
      setDeliveryStats({
        ...stats,
        earnings: totalEarnings,
      });
    } catch (err) {
      setError('Failed to load orders. Please try again.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refreshOrders = useCallback(async () => {
    setRefreshing(true);
    await loadData();
  }, [loadData]);

  const acceptOrder = useCallback(async (orderId: string): Promise<boolean> => {
    try {
      const success = await orderService.acceptOrder(orderId);
      if (success) {
        // Remove pending order and add to deliveries
        if (pendingOrder && pendingOrder.id === orderId) {
          const deliveredOrder = { ...pendingOrder, status: 'delivered' as const };
          setPendingOrder(null);
          setTodayDeliveries(prev => [deliveredOrder, ...prev]);
          
          // Update stats
          setDeliveryStats(prev => prev ? {
            ...prev,
            total: prev.total + 1,
            completed: prev.completed + 1,
            earnings: prev.earnings + deliveredOrder.fee,
          } : null);
        }
      }
      return success;
    } catch (err) {
      setError('Failed to accept order. Please try again.');
      console.error('Error accepting order:', err);
      return false;
    }
  }, [pendingOrder]);

  const rejectOrder = useCallback(async (orderId: string): Promise<boolean> => {
    try {
      const success = await orderService.rejectOrder(orderId);
      if (success) {
        // Remove pending order
        if (pendingOrder && pendingOrder.id === orderId) {
          setPendingOrder(null);
        }
      }
      return success;
    } catch (err) {
      setError('Failed to reject order. Please try again.');
      console.error('Error rejecting order:', err);
      return false;
    }
  }, [pendingOrder]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    pendingOrder,
    todayDeliveries,
    deliveryStats,
    loading,
    error,
    refreshing,
    acceptOrder,
    rejectOrder,
    refreshOrders,
  };
}
