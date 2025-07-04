import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * @typedef {Object} Order
 * @property {string} _id
 * @property {string} orderNumber
 * @property {Date} date
 * @property {string} status
 * @property {number} total
 * @property {Array} items
 * @property {Object} shippingAddress
 * @property {string} [trackingNumber]
 */

export const orderService = {
  // Get user orders
  getUserOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      // Return mock data for now since backend orders API might not be implemented
      console.log('Using mock order data');
      return getMockOrders();
    }
  },

  // Get specific order
  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
  },

  // Track order
  trackOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}/tracking`);
    return response.data;
  },

  // Create order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Update order
  updateOrder: async (orderId, updateData) => {
    const response = await api.put(`/orders/${orderId}`, updateData);
    return response.data;
  },

  // Get order history
  getOrderHistory: async (page = 1, limit = 10) => {
    const response = await api.get(`/orders/history?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Reorder items
  reorder: async (orderId) => {
    const response = await api.post(`/orders/${orderId}/reorder`);
    return response.data;
  },

  // Get order invoice
  getOrderInvoice: async (orderId) => {
    const response = await api.get(`/orders/${orderId}/invoice`);
    return response.data;
  },

  // Return order
  returnOrder: async (orderId, returnData) => {
    const response = await api.post(`/orders/${orderId}/return`, returnData);
    return response.data;
  }
};

// Mock orders data for demonstration
const getMockOrders = () => [
  {
    _id: '1',
    orderNumber: 'ORD-2024-001',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'delivered',
    total: 22990,
    items: [
      {
        productId: '1',
        productName: 'Sony WH-1000XM4 Wireless Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        quantity: 1,
        price: 22990,
        storeName: 'Amazon'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    trackingNumber: 'TRK123456789'
  },
  {
    _id: '2',
    orderNumber: 'ORD-2024-002',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'shipped',
    total: 18999,
    items: [
      {
        productId: '2',
        productName: 'Adidas Ultraboost 23',
        productImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        quantity: 1,
        price: 18999,
        storeName: 'Adidas'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    trackingNumber: 'TRK987654321'
  },
  {
    _id: '3',
    orderNumber: 'ORD-2024-003',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'processing',
    total: 154999,
    items: [
      {
        productId: '3',
        productName: 'iPhone 15 Pro Max',
        productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        quantity: 1,
        price: 154999,
        storeName: 'Apple Store'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    }
  }
];

export default orderService;
