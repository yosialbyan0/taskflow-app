/**
 * Authentication Service
 * Handles authentication logic and user session management
 */

import apiClient from './api.js';
import * as storage from './storage.js';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Login result
 */
export const login = async (email, password) => {
  try {
    const response = await apiClient.login(email, password);

    if (response.token) {
      apiClient.setAuthToken(response.token);
      if (response.user) {
        storage.saveUser(response.user);
      }
      return {
        success: true,
        user: response.user,
        token: response.token,
      };
    }

    return {
      success: false,
      error: response.message || 'Login failed',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'An error occurred during login',
    };
  }
};

/**
 * Logout user
 * @returns {Promise} Logout result
 */
export const logout = async () => {
  try {
    await apiClient.logout();
  } catch (error) {
    console.warn('Logout API error:', error);
  } finally {
    apiClient.removeAuthToken();
    storage.clearAuth();
    return { success: true };
  }
};

/**
 * Get current logged-in user
 * @returns {object|null} User data or null
 */
export const getCurrentUser = () => {
  return storage.getUser();
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is logged in
 */
export const isAuthenticated = () => {
  return !!apiClient.getAuthToken() && !!storage.getUser();
};

/**
 * Get auth token
 * @returns {string|null} Auth token or null
 */
export const getToken = () => {
  return apiClient.getAuthToken();
};
