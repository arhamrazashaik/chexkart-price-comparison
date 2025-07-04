import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(undefined);

/**
 * AuthProvider component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Register function
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  /**
   * Update user function
   * @param {Object} userData
   */
  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
