/**
 * API Endpoints Configuration
 * Centralized API endpoint definitions
 */

const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refresh: '/auth/refresh',
    profile: '/auth/profile'
  },
  
  tasks: {
    list: '/tasks',
    create: '/tasks',
    detail: (id) => `/tasks/${id}`,
    update: (id) => `/tasks/${id}`,
    delete: (id) => `/tasks/${id}`
  },
  
  users: {
    profile: '/users/profile',
    update: '/users/profile',
    avatar: '/users/avatar'
  }
};

export default endpoints;
