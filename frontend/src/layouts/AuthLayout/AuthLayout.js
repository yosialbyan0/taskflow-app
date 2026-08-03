/**
 * Auth Layout Component
 * Layout for authentication pages (login, register, etc.)
 */

export class AuthLayout {
  constructor(options = {}) {
    this.options = {
      title: 'TaskFlow',
      ...options
    };
  }

  /**
   * Render the auth layout
   */
  render() {
    const container = document.createElement('div');
    container.className = 'auth-layout';

    const main = document.createElement('main');
    main.className = 'auth-layout__main';
    main.setAttribute('role', 'main');

    const content = document.createElement('div');
    content.className = 'auth-layout__content';
    content.id = 'app-content';

    main.appendChild(content);
    container.appendChild(main);

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
}

export default new AuthLayout();
