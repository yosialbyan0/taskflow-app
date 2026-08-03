/**
 * Login Page JavaScript
 * Handles form validation, submission, and user preferences
 * Uses modular architecture with separate services
 */

import { Eye, EyeOff, Key } from 'lucide';
import * as validator from '../../services/validator.js';
import * as storage from '../../services/storage.js';
import * as authService from '../../services/auth-service.js';

/**
 * LoginForm Class
 * Manages form validation, submission, and user preferences
 */
class LoginForm {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.submitBtn = document.getElementById('submitBtn');
    this.rememberMeCheckbox = document.getElementById('rememberMe');

    this.emailErrorEl = document.getElementById('email-error');
    this.passwordErrorEl = document.getElementById('password-error');

    this.originalSubmitText = this.submitBtn.textContent;
    this.isSubmitting = false;

    this.init();
  }

  /**
   * Initialize event listeners and load saved preferences
   */
  init() {
    this.attachEventListeners();
    this.loadRememberedEmail();
  }

  /**
   * Attach event listeners to form elements
   */
  attachEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Email validation
    this.emailInput.addEventListener('blur', () => this.validateEmailField());
    this.emailInput.addEventListener('input', () => {
      if (this.emailInput.value) {
        this.validateEmailField();
      } else {
        this.clearError(this.emailInput, this.emailErrorEl);
      }
    });

    // Password validation
    this.passwordInput.addEventListener('blur', () => this.validatePasswordField());
    this.passwordInput.addEventListener('input', () => {
      if (this.passwordInput.value) {
        this.validatePasswordField();
      } else {
        this.clearError(this.passwordInput, this.passwordErrorEl);
      }
    });
  }

  /**
   * Validate email field using validator service
   * @returns {boolean} True if valid, false otherwise
   */
  validateEmailField() {
    const email = this.emailInput.value.trim();
    const validation = validator.validateEmail(email);

    if (!validation.valid) {
      this.setError(this.emailInput, this.emailErrorEl, validation.message);
      return false;
    }

    this.clearError(this.emailInput, this.emailErrorEl);
    return true;
  }

  /**
   * Validate password field using validator service
   * @returns {boolean} True if valid, false otherwise
   */
  validatePasswordField() {
    const password = this.passwordInput.value;
    const validation = validator.validatePassword(password);

    if (!validation.valid) {
      this.setError(this.passwordInput, this.passwordErrorEl, validation.message);
      return false;
    }

    this.clearError(this.passwordInput, this.passwordErrorEl);
    return true;
  }

  /**
   * Set error state on input field
   * @param {HTMLElement} inputElement - Input element
   * @param {HTMLElement} errorElement - Error message element
   * @param {string} message - Error message
   */
  setError(inputElement, errorElement, message) {
    inputElement.classList.add('is-invalid');
    inputElement.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
  }

  /**
   * Clear error state from input field
   * @param {HTMLElement} inputElement - Input element
   * @param {HTMLElement} errorElement - Error message element
   */
  clearError(inputElement, errorElement) {
    inputElement.classList.remove('is-invalid');
    inputElement.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
  }

  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  async handleSubmit(e) {
    e.preventDefault();

    // Prevent double submission
    if (this.isSubmitting) return;

    // Validate both fields
    const isEmailValid = this.validateEmailField();
    const isPasswordValid = this.validatePasswordField();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // Handle remember me preference
    if (this.rememberMeCheckbox.checked) {
      storage.rememberEmail(this.emailInput.value);
    } else {
      storage.forgetEmail();
    }

    // Show loading state
    this.showLoadingState();
    this.isSubmitting = true;

    try {
      // Call authentication service
      const result = await authService.login(
        this.emailInput.value.trim(),
        this.passwordInput.value
      );

      if (result.success) {
        this.handleSuccess(result.user);
      } else {
        this.handleError(result.error);
      }
    } catch (error) {
      this.handleError('An unexpected error occurred');
    } finally {
      this.hideLoadingState();
      this.isSubmitting = false;
    }
  }

  /**
   * Show loading state on submit button
   */
  showLoadingState() {
    this.submitBtn.disabled = true;
    this.emailInput.disabled = true;
    this.passwordInput.disabled = true;
    this.rememberMeCheckbox.disabled = true;

    const spinnerSVG = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" style="margin-right: 0.5rem;">
        <circle cx="12" cy="12" r="10" stroke-width="2" opacity="0.25"></circle>
        <path d="M 12 2 A 10 10 0 0 1 22 12" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;

    this.submitBtn.innerHTML = `${spinnerSVG}Logging in...`;
  }

  /**
   * Hide loading state on submit button
   */
  hideLoadingState() {
    this.submitBtn.disabled = false;
    this.emailInput.disabled = false;
    this.passwordInput.disabled = false;
    this.rememberMeCheckbox.disabled = false;
    this.submitBtn.textContent = this.originalSubmitText;
  }

  /**
   * Handle successful form submission
   * @param {object} user - User data from auth service
   */
  handleSuccess(user) {
    console.log('Login successful:', {
      email: user?.email || this.emailInput.value,
      rememberMe: this.rememberMeCheckbox.checked,
    });

    this.showSuccessMessage();

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  }

  /**
   * Handle login error
   * @param {string} errorMessage - Error message from auth service
   */
  handleError(errorMessage) {
    console.error('Login error:', errorMessage);
    this.showErrorMessage(errorMessage);
  }

  /**
   * Display success notification
   */
  showSuccessMessage() {
    const alert = document.createElement('div');
    alert.className = 'alert-success';
    alert.setAttribute('role', 'alert');
    alert.textContent = 'Login successful! Redirecting...';
    alert.style.cssText = `
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 1000;
      padding: 0.75rem 1.25rem;
      box-shadow: var(--shadow-md);
      background-color: var(--color-success, #10b981);
      color: white;
      border-radius: var(--radius-md, 0.375rem);
    `;

    document.body.appendChild(alert);

    // Remove alert after 3 seconds
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }

  /**
   * Display error notification
   * @param {string} errorMessage - Error message to display
   */
  showErrorMessage(errorMessage) {
    const alert = document.createElement('div');
    alert.className = 'alert-error';
    alert.setAttribute('role', 'alert');
    alert.textContent = errorMessage || 'Login failed. Please try again.';
    alert.style.cssText = `
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 1000;
      padding: 0.75rem 1.25rem;
      box-shadow: var(--shadow-md);
      background-color: var(--color-danger, #ef4444);
      color: white;
      border-radius: var(--radius-md, 0.375rem);
    `;

    document.body.appendChild(alert);

    // Remove alert after 5 seconds
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  /**
   * Load previously saved email from storage service
   */
  loadRememberedEmail() {
    const rememberedEmail = storage.loadRememberedEmail();
    if (rememberedEmail) {
      this.emailInput.value = rememberedEmail;
      this.rememberMeCheckbox.checked = true;
    }
  }
}

/**
 * PasswordToggle Class
 * Manages password field visibility toggle with Lucide icons
 */
class PasswordToggle {
  constructor() {
    this.passwordInput = document.getElementById('password');
    this.toggleBtn = document.getElementById('passwordToggle');
    this.iconContainer = document.getElementById('passwordToggleIcon');
    this.init();
  }

  /**
   * Initialize password toggle functionality
   */
  init() {
    this.renderIcon();
    this.toggleBtn.addEventListener('click', (e) => this.handleToggle(e));
  }

  /**
   * Render the appropriate Lucide icon
   */
  renderIcon() {
    this.iconContainer.innerHTML = '';
    const isPassword = this.passwordInput.type === 'password';
    const icon = isPassword ? Eye() : EyeOff();
    this.iconContainer.appendChild(icon);
  }

  /**
   * Handle toggle button click
   * @param {Event} e - Click event
   */
  handleToggle(e) {
    e.preventDefault();
    this.toggle();
  }

  /**
   * Toggle password visibility
   */
  toggle() {
    const isPassword = this.passwordInput.type === 'password';
    this.passwordInput.type = isPassword ? 'text' : 'password';
    this.updateToggleState();
  }

  /**
   * Update toggle button state and ARIA attributes
   */
  updateToggleState() {
    const isPassword = this.passwordInput.type === 'password';
    this.renderIcon();

    if (isPassword) {
      this.toggleBtn.setAttribute('aria-label', 'Show password');
      this.toggleBtn.setAttribute('aria-pressed', 'false');
    } else {
      this.toggleBtn.setAttribute('aria-label', 'Hide password');
      this.toggleBtn.setAttribute('aria-pressed', 'true');
    }
  }
}

/**
 * SSO Button Icon Renderer
 * Renders the Lucide Key icon for the SSO button
 */
function renderSSOIcon() {
  const iconContainer = document.getElementById('ssoIcon');
  if (iconContainer) {
    iconContainer.appendChild(Key());
  }
}

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new LoginForm();
  new PasswordToggle();
  renderSSOIcon();
});
