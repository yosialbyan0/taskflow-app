/**
 * Dashboard Page
 * Main dashboard page for authenticated users
 */

export class DashboardPage {
  constructor() {
    this.element = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'dashboard-page';
    this.element.innerHTML = `
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to TaskFlow Dashboard</p>
      </div>
      <div class="page-content">
        <!-- Dashboard content will go here -->
      </div>
    `;
    return this.element;
  }

  getElement() {
    return this.element;
  }
}

export default DashboardPage;
