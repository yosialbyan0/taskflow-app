/**
 * Application Routes
 * Centralized route definitions
 */

const routes = {
  public: {
    login: '/login',
    register: '/register',
    notFound: '/404'
  },
  
  protected: {
    dashboard: '/dashboard',
    tasks: '/tasks',
    profile: '/profile'
  }
};

export default routes;
