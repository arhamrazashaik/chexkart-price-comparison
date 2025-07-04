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

export const productService = {
  // Get all products with optional filters
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    const response = await api.get(`/products/featured?limit=${limit}`);
    return response.data;
  },

  // Get products on sale
  getSaleProducts: async (limit = 20) => {
    const response = await api.get(`/products/sale?limit=${limit}`);
    return response.data;
  },

  // Get trending products
  getTrendingProducts: async (limit = 10) => {
    const response = await api.get(`/products/trending?limit=${limit}`);
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    const params = new URLSearchParams({
      search: query,
      ...filters
    });
    
    const response = await api.get(`/products/search?${params.toString()}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category, filters = {}) => {
    const params = new URLSearchParams({
      category,
      ...filters
    });
    
    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  // Add review to product
  addReview: async (productId, review) => {
    const response = await api.post(`/products/${productId}/reviews`, review);
    return response.data;
  },

  // Get product reviews
  getProductReviews: async (productId, page = 1, limit = 10) => {
    const response = await api.get(`/products/${productId}/reviews?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Get brands
  getBrands: async () => {
    const response = await api.get('/products/brands');
    return response.data;
  },

  // Get price history for a product
  getPriceHistory: async (productId, days = 30) => {
    const response = await api.get(`/products/${productId}/price-history?days=${days}`);
    return response.data;
  },

  // Compare products
  compareProducts: async (productIds) => {
    const response = await api.post('/products/compare', { productIds });
    return response.data;
  },

  // Get similar products
  getSimilarProducts: async (productId, limit = 6) => {
    const response = await api.get(`/products/${productId}/similar?limit=${limit}`);
    return response.data;
  },

  // Get product availability
  getProductAvailability: async (productId) => {
    const response = await api.get(`/products/${productId}/availability`);
    return response.data;
  }
};

export default productService;
