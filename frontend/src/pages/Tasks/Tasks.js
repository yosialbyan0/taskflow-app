/**
 * Tasks Page
 * Page for managing tasks
 */

export class TasksPage {
  constructor() {
    this.element = null;
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'tasks-page';
    this.element.innerHTML = `
      <div class="page-header">
        <h1>Tasks</h1>
        <p>Manage your tasks</p>
      </div>
      <div class="page-content">
        <!-- Tasks content will go here -->
      </div>
    `;
    return this.element;
  }

  getElement() {
    return this.element;
  }
}

export default TasksPage;
