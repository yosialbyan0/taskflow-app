/**
 * Router
 * Client-side routing for the application
 */

import { routes } from './constants/index.js';
import { auth } from './services/index.js';
import DashboardPage from './pages/Dashboard/Dashboard.js';
import TasksPage from './pages/Tasks/Tasks.js';
import ProfilePage from './pages/Profile/Profile.js';
import NotFoundPage from './pages/NotFound/NotFound.js';

class Router {
  constructor() {
    this.currentRoute = null;
    this.init();
  }

  /**
   * Initialize router
   */
  init() {
    window.addEventListener('hashchange', () => this.handleRouteChange());
    this.handleRouteChange();
  }

  /**
   * Handle route changes
   */
  handleRouteChange() {
    const hash = window.location.hash.slice(1) || '/';
    
    // Check authentication for protected routes
    if (this.isProtectedRoute(hash) && !auth.isLoggedIn()) {
      window.location.hash = routes.public.login;
      return;
    }

    // Prevent authenticated users from accessing public routes
    if (this.isPublicRoute(hash) && auth.isLoggedIn()) {
      window.location.hash = routes.protected.dashboard;
      return;
    }

    this.navigate(hash);
  }

  /**
   * Navigate to a route
   */
  navigate(route) {
    let page = null;

    switch (route) {
      case routes.protected.dashboard:
        page = new DashboardPage();
        break;
      case routes.protected.tasks:
        page = new TasksPage();
        break;
      case routes.protected.profile:
        page = new ProfilePage();
        break;
      default:
        page = new NotFoundPage();
    }

    if (page) {
      const element = page.render();
      this.renderPage(element);
      this.currentRoute = route;
    }
  }

  /**
   * Render page
   */
  renderPage(element) {
    const container = document.getElementById('app-content');
    if (container) {
      container.innerHTML = '';
      container.appendChild(element);
    }
  }

  /**
   * Check if route is protected
   */
  isProtectedRoute(route) {
    return Object.values(routes.protected).includes(route);
  }

  /**
   * Check if route is public
   */
  isPublicRoute(route) {
    return Object.values(routes.public).includes(route);
  }

  /**
   * Go to route
   */
  go(route) {
    window.location.hash = route;
  }
}

export default new Router();
