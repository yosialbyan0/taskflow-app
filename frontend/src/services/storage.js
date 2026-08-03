/**
 * Storage Service
 * Handles localStorage operations for user preferences and auth
 */

const STORAGE_KEYS = {
  REMEMBERED_EMAIL: 'taskflow_remembered_email',
  AUTH_TOKEN: 'taskflow_auth_token',
  USER: 'taskflow_user',
};

/**
 * Save email to localStorage
 * @param {string} email - Email address to save
 */
export const rememberEmail = (email) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email);
  } catch (error) {
    console.warn('Failed to save email preference:', error);
  }
};

/**
 * Remove saved email from localStorage
 */
export const forgetEmail = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
  } catch (error) {
    console.warn('Failed to remove email preference:', error);
  }
};

/**
 * Load previously saved email from localStorage
 * @returns {string|null} Saved email or null
 */
export const loadRememberedEmail = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL);
  } catch (error) {
    console.warn('Failed to load email preference:', error);
    return null;
  }
};

/**
 * Save auth token to localStorage
 * @param {string} token - Auth token to save
 */
export const saveAuthToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.warn('Failed to save auth token:', error);
  }
};

/**
 * Get auth token from localStorage
 * @returns {string|null} Auth token or null
 */
export const getAuthToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.warn('Failed to get auth token:', error);
    return null;
  }
};

/**
 * Remove auth token from localStorage
 */
export const removeAuthToken = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.warn('Failed to remove auth token:', error);
  }
};

/**
 * Save user to localStorage
 * @param {object} user - User data to save
 */
export const saveUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.warn('Failed to save user:', error);
  }
};

/**
 * Get user from localStorage
 * @returns {object|null} User data or null
 */
export const getUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.warn('Failed to get user:', error);
    return null;
  }
};

/**
 * Remove user from localStorage
 */
export const removeUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.warn('Failed to remove user:', error);
  }
};

/**
 * Clear all auth-related data
 */
export const clearAuth = () => {
  removeAuthToken();
  removeUser();
};
