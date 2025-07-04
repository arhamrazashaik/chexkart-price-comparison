import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/orderService';
import { wishlistService } from '../services/wishlistService';

/**
 * @typedef {Object} UserStats
 * @property {number} totalOrders
 * @property {number} totalSpent
 * @property {number} wishlistCount
 * @property {number} reviewsCount
 */

/**
 * Custom hook for managing user statistics
 * @returns {Object} User stats hook object
 */
export const useUserStats = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    wishlistCount: 0,
    reviewsCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) {
      setStats({
        totalOrders: 0,
        totalSpent: 0,
        wishlistCount: 0,
        reviewsCount: 0
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch data from multiple sources
      const [orders, wishlist] = await Promise.all([
        orderService.getUserOrders().catch(() => []),
        wishlistService.getWishlist().catch(() => [])
      ]);

      // Calculate statistics
      const totalOrders = orders.length;
      const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
      const wishlistCount = wishlist.length;
      
      // Count reviews (simulate based on delivered orders)
      const reviewsCount = orders.filter((order) => order.status === 'delivered').length;

      setStats({
        totalOrders,
        totalSpent,
        wishlistCount,
        reviewsCount
      });
    } catch (err) {
      console.error('Error fetching user statistics:', err);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch stats on mount and when authentication changes
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Function to refresh stats manually
  const refreshStats = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  // Function to update specific stat without full refresh
  const updateStat = useCallback((statName, value) => {
    setStats(prev => ({
      ...prev,
      [statName]: value
    }));
  }, []);

  // Function to increment/decrement stats
  const incrementStat = useCallback((statName, increment = 1) => {
    setStats(prev => ({
      ...prev,
      [statName]: Math.max(0, prev[statName] + increment)
    }));
  }, []);

  return {
    stats,
    loading,
    error,
    refreshStats,
    updateStat,
    incrementStat,
    fetchStats
  };
};

export default useUserStats;
