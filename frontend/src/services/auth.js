/**
 * Authentication Service
 * Handles user authentication and session management
 */

import api from './api.js';
import { endpoints } from '../config/index.js';

class AuthService {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;
    this.loadUser();
  }

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const response = await api.post(endpoints.auth.login, {
        email,
        password
      });

      if (response.token) {
        api.setAuthToken(response.token);
        this.user = response.user;
        this.isAuthenticated = true;
        this.saveUser();
        return { success: true, user: response.user };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await api.post(endpoints.auth.logout);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      api.removeAuthToken();
      this.user = null;
      this.isAuthenticated = false;
      this.clearUser();
    }
  }

  /**
   * Register new user
   */
  async register(userData) {
    try {
      const response = await api.post(endpoints.auth.register, userData);
      if (response.token) {
        api.setAuthToken(response.token);
        this.user = response.user;
        this.isAuthenticated = true;
        this.saveUser();
        return { success: true, user: response.user };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get current user profile
   */
  async getProfile() {
    try {
      const response = await api.get(endpoints.auth.profile);
      this.user = response;
      this.saveUser();
      return response;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isLoggedIn() {
    return this.isAuthenticated && !!this.user;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.user;
  }

  /**
   * Save user to localStorage
   */
  saveUser() {
    try {
      localStorage.setItem('taskflow_user', JSON.stringify(this.user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  /**
   * Load user from localStorage
   */
  loadUser() {
    try {
      const saved = localStorage.getItem('taskflow_user');
      if (saved) {
        this.user = JSON.parse(saved);
        this.isAuthenticated = !!api.getAuthToken();
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }

  /**
   * Clear user from localStorage
   */
  clearUser() {
    try {
      localStorage.removeItem('taskflow_user');
    } catch (error) {
      console.error('Error clearing user:', error);
    }
  }
}

export default new AuthService();
