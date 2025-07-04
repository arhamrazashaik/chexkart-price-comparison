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

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/users/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.avatarUrl;
  },

  // Delete account
  deleteAccount: async () => {
    const response = await api.delete('/users/profile');
    return response.data;
  },

  // Get user statistics
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },

  // Get user addresses
  getAddresses: async () => {
    const response = await api.get('/users/addresses');
    return response.data;
  },

  // Add user address
  addAddress: async (address) => {
    const response = await api.post('/users/addresses', address);
    return response.data;
  },

  // Update user address
  updateAddress: async (addressId, address) => {
    const response = await api.put(`/users/addresses/${addressId}`, address);
    return response.data;
  },

  // Delete user address
  deleteAddress: async (addressId) => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },

  // Get user notifications
  getNotifications: async () => {
    const response = await api.get('/users/notifications');
    return response.data;
  },

  // Mark notification as read
  markNotificationRead: async (notificationId) => {
    const response = await api.put(`/users/notifications/${notificationId}/read`);
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const response = await api.delete(`/users/notifications/${notificationId}`);
    return response.data;
  },

  // Get user activity log
  getActivityLog: async (page = 1, limit = 20) => {
    const response = await api.get(`/users/activity?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Export user data
  exportUserData: async () => {
    const response = await api.get('/users/export');
    return response.data;
  },

  // Deactivate account
  deactivateAccount: async () => {
    const response = await api.put('/users/deactivate');
    return response.data;
  },

  // Reactivate account
  reactivateAccount: async () => {
    const response = await api.put('/users/reactivate');
    return response.data;
  }
};

export default userService;
