/**
 * Application Entry Point
 * Initializes the application
 */

import './styles/index.css';
import router from './router.js';
import { auth } from './services/index.js';
import { routes } from './constants/index.js';

class App {
  constructor() {
    this.auth = auth;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Check if user is already authenticated
      if (this.auth.isLoggedIn()) {
        // Optionally refresh user profile
        // await this.auth.getProfile();
      } else {
        // Redirect to login
        window.location.hash = routes.public.login;
      }

      // Initialize router
      router.init();
    } catch (error) {
      console.error('App initialization error:', error);
    }
  }
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

export default App;
