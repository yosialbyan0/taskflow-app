/**
 * Dashboard Layout Component
 * Layout for authenticated dashboard pages
 */

export class DashboardLayout {
  constructor(options = {}) {
    this.options = {
      showSidebar: true,
      showNavbar: true,
      ...options
    };
  }

  /**
   * Render the dashboard layout
   */
  render() {
    const container = document.createElement('div');
    container.className = 'dashboard-layout';

    if (this.options.showNavbar) {
      const navbar = document.createElement('nav');
      navbar.className = 'dashboard-layout__navbar';
      navbar.id = 'navbar';
      container.appendChild(navbar);
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'dashboard-layout__wrapper';

    if (this.options.showSidebar) {
      const sidebar = document.createElement('aside');
      sidebar.className = 'dashboard-layout__sidebar';
      sidebar.id = 'sidebar';
      wrapper.appendChild(sidebar);
    }

    const main = document.createElement('main');
    main.className = 'dashboard-layout__main';
    main.setAttribute('role', 'main');

    const content = document.createElement('div');
    content.className = 'dashboard-layout__content';
    content.id = 'app-content';

    main.appendChild(content);
    wrapper.appendChild(main);

    container.appendChild(wrapper);

    return container;
  }

  /**
   * Get the content container
   */
  getContentContainer() {
    return document.getElementById('app-content');
  }

  /**
   * Set page content
   */
  setContent(element) {
    const container = this.getContentContainer();
    if (container) {
      container.innerHTML = '';
      container.appendChild(element);
    }
  }

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('dashboard-layout__sidebar--hidden');
    }
  }
}

export default new DashboardLayout();
