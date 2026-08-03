/**
 * Application Messages
 * Centralized error and status messages
 */

const messages = {
  success: {
    login: 'Login successful! Redirecting...',
    logout: 'Logged out successfully',
    save: 'Changes saved successfully',
    delete: 'Deleted successfully'
  },
  
  error: {
    loginFailed: 'Login failed. Please check your credentials.',
    networkError: 'Network error. Please try again.',
    unauthorized: 'Unauthorized access. Please login.',
    notFound: 'Resource not found.',
    serverError: 'Server error. Please try again later.',
    validationError: 'Please fix the errors and try again.'
  },
  
  validation: {
    emailRequired: 'Email address is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 6 characters'
  }
};

export default messages;
