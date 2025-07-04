import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/orderService';
import { ShoppingBagIcon, TruckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { formatPriceIndian } from '../utils/currency';

const OrdersPage = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await orderService.getUserOrders();
        // Handle different response formats
        const orders = Array.isArray(ordersData) ? ordersData : (ordersData.orders || ordersData.data || []);
        setOrders(orders);
      } catch (err) {
        setError('Failed to load orders');
        setOrders([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ShoppingBagIcon className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <ShoppingBagIcon className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ShoppingBagIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Please sign in</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You need to be signed in to view your orders.
          </p>
          <div className="mt-6">
            <a
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Error loading orders</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">My Orders</h1>
          
          <div className="text-center py-12">
            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start shopping to see your orders here.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          My Orders ({Array.isArray(orders) ? orders.length : 0})
        </h1>

        <div className="space-y-6">
          {Array.isArray(orders) && orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Placed on {order.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {formatPriceIndian(order.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.productName}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Sold by {item.storeName} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatPriceIndian(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {order.trackingNumber && (
                      <span>Tracking: {order.trackingNumber}</span>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium">
                      View Details
                    </button>
                    {order.status === 'delivered' && (
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium">
                        Write Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
