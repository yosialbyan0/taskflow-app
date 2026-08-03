/**
 * Not Found Page
 * 404 error page
 */

export class NotFoundPage {
  constructor() {
    this.element = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'not-found-page';
    this.element.innerHTML = `
      <div class="not-found-container">
        <h1 class="not-found-title">404</h1>
        <h2 class="not-found-heading">Page Not Found</h2>
        <p class="not-found-message">The page you're looking for doesn't exist.</p>
        <a href="/" class="not-found-link">Go to Home</a>
      </div>
    `;
    return this.element;
  }

  getElement() {
    return this.element;
  }
}

export default NotFoundPage;
