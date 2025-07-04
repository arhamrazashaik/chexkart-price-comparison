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

// Mock wishlist data for development
const getMockWishlist = () => {
  const wishlist = localStorage.getItem('mockWishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

const setMockWishlist = (wishlist) => {
  localStorage.setItem('mockWishlist', JSON.stringify(wishlist));
};

export const wishlistService = {
  // Get user's wishlist
  getWishlist: async () => {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      console.log('Wishlist API not available, using localStorage fallback');
      // Return mock data from localStorage if API is not available
      return getMockWishlist();
    }
  },

  // Add product to wishlist
  addToWishlist: async (productId) => {
    try {
      const response = await api.post(`/wishlist/add/${productId}`);
      return response.data;
    } catch (error) {
      console.log('Wishlist add API not available, using localStorage fallback');
      // Fallback to localStorage
      const wishlist = getMockWishlist();
      const newItem = {
        _id: Date.now().toString(),
        productId: productId,
        addedAt: new Date().toISOString(),
        priceAlert: { enabled: false }
      };
      wishlist.push(newItem);
      setMockWishlist(wishlist);
      return { message: 'Product added to wishlist (local)' };
    }
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await api.delete(`/wishlist/remove/${productId}`);
      return response.data;
    } catch (error) {
      console.log('Wishlist remove API not available, using localStorage fallback');
      // Fallback to localStorage
      const wishlist = getMockWishlist();
      const updatedWishlist = wishlist.filter(item => item.productId !== productId);
      setMockWishlist(updatedWishlist);
      return { message: 'Product removed from wishlist (local)' };
    }
  },

  // Check if product is in wishlist
  checkWishlist: async (productId) => {
    try {
      const response = await api.get(`/wishlist/check/${productId}`);
      return response.data.inWishlist || false;
    } catch (error) {
      console.log('Wishlist check API not available, using localStorage fallback');
      // Fallback to localStorage
      const wishlist = getMockWishlist();
      return wishlist.some(item => item.productId === productId);
    }
  },

  // Clear entire wishlist
  clearWishlist: async () => {
    const response = await api.delete('/wishlist/clear');
    return response.data;
  },

  // Get wishlist count
  getWishlistCount: async () => {
    try {
      const response = await api.get('/wishlist/count');
      return response.data.count || 0;
    } catch (error) {
      console.error('Error getting wishlist count:', error);
      return 0;
    }
  },

  // Move wishlist item to cart
  moveToCart: async (productId) => {
    const response = await api.post(`/wishlist/move-to-cart/${productId}`);
    return response.data;
  },

  // Set price alert for wishlist item
  setPriceAlert: async (productId, targetPrice) => {
    const response = await api.post(`/wishlist/price-alert/${productId}`, {
      targetPrice
    });
    return response.data;
  },

  // Remove price alert
  removePriceAlert: async (productId) => {
    const response = await api.delete(`/wishlist/price-alert/${productId}`);
    return response.data;
  },

  // Get price alerts
  getPriceAlerts: async () => {
    const response = await api.get('/wishlist/price-alerts');
    return response.data;
  },

  // Share wishlist
  shareWishlist: async () => {
    const response = await api.post('/wishlist/share');
    return response.data;
  },

  // Get shared wishlist
  getSharedWishlist: async (shareId) => {
    const response = await api.get(`/wishlist/shared/${shareId}`);
    return response.data;
  },

  // Import wishlist from another platform
  importWishlist: async (platform, data) => {
    const response = await api.post('/wishlist/import', {
      platform,
      data
    });
    return response.data;
  },

  // Export wishlist
  exportWishlist: async (format = 'json') => {
    const response = await api.get(`/wishlist/export?format=${format}`);
    return response.data;
  }
};

export default wishlistService;
