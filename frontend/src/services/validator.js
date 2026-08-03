/**
 * Validator Service
 * Input validation functions for forms
 */

/**
 * Check if email format is valid
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate email field
 * @param {string} email - Email to validate
 * @returns {object} Validation result with valid flag and message
 */
export const validateEmail = (email) => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return {
      valid: false,
      message: 'Email address is required',
    };
  }

  if (!isValidEmail(trimmedEmail)) {
    return {
      valid: false,
      message: 'Please enter a valid email address',
    };
  }

  return {
    valid: true,
    message: '',
  };
};

/**
 * Validate password field
 * @param {string} password - Password to validate
 * @returns {object} Validation result with valid flag and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      valid: false,
      message: 'Password is required',
    };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: 'Password must be at least 6 characters',
    };
  }

  return {
    valid: true,
    message: '',
  };
};

/**
 * Validate login form
 * @param {string} email - Email to validate
 * @param {string} password - Password to validate
 * @returns {object} Form validation result
 */
export const validateLoginForm = (email, password) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    email: emailValidation,
    password: passwordValidation,
    isValid: emailValidation.valid && passwordValidation.valid,
  };
};
