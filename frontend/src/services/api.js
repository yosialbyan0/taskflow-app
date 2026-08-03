/**
 * API Client Service
 * Handles all HTTP requests
 */

import { environment } from '../config/index.js';
import { httpStatus } from '../constants/index.js';

class APIClient {
  constructor() {
    this.baseURL = environment.apiBaseUrl;
    this.timeout = 30000;
  }

  /**
   * Make HTTP request
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * PUT request
   */
  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Get stored auth token
   */
  getAuthToken() {
    try {
      return localStorage.getItem('taskflow_auth_token');
    } catch (error) {
      console.error('Error retrieving auth token:', error);
      return null;
    }
  }

  /**
   * Set auth token
   */
  setAuthToken(token) {
    try {
      localStorage.setItem('taskflow_auth_token', token);
    } catch (error) {
      console.error('Error storing auth token:', error);
    }
  }

  /**
   * Remove auth token
   */
  removeAuthToken() {
    try {
      localStorage.removeItem('taskflow_auth_token');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  }

  /**
   * Login user with email and password
   */
  async login(email, password) {
    return this.post('/auth/login', { email, password });
  }

  /**
   * Logout user
   */
  async logout() {
    return this.post('/auth/logout');
  }

  /**
   * Get current user profile
   */
  async getProfile() {
    return this.get('/auth/profile');
  }
}

export default new APIClient();
