/**
 * Formatter Utilities
 * String and data formatting functions
 */

/**
 * Format date to readable string
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  if (format === 'short') {
    return d.toLocaleDateString();
  }
  return d.toLocaleString();
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate string
 */
export const truncate = (str, length = 50) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};
