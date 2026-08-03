/**
 * Button Component
 * Reusable, accessible button component for TaskFlow
 * Bootstrap 5 compatible with support for variants, sizes, and states
 */

export class Button {
  /**
   * Creates a Button component instance
   * @param {Object} options - Configuration options
   * @param {string} options.text - Button text content (required)
   * @param {string} options.variant - Button variant: 'primary' | 'secondary' | 'outline' | 'danger' (default: 'primary')
   * @param {string} options.size - Button size: 'sm' | 'md' | 'lg' (default: 'md')
   * @param {boolean} options.disabled - Disable button (default: false)
   * @param {boolean} options.loading - Show loading state (default: false)
   * @param {Function} options.onClick - Click handler function
   * @param {string} options.type - Button type: 'button' | 'submit' | 'reset' (default: 'button')
   * @param {string} options.ariaLabel - ARIA label for accessibility
   * @param {string} options.title - Tooltip title attribute
   * @param {string} options.className - Additional CSS classes
   */
  constructor(options = {}) {
    this.options = {
      text: '',
      variant: 'primary',
      size: 'md',
      disabled: false,
      loading: false,
      onClick: null,
      type: 'button',
      ariaLabel: null,
      title: null,
      className: '',
      ...options
    };

    this.element = null;
    this.isLoading = this.options.loading;
    this.originalText = this.options.text;
  }

  /**
   * Create and return the button DOM element
   * @returns {HTMLButtonElement} The rendered button element
   */
  render() {
    this.element = document.createElement('button');
    this.element.type = this.options.type;
    this.element.className = this.getClasses();
    this.element.textContent = this.options.text;

    // Set accessibility attributes
    if (this.options.ariaLabel) {
      this.element.setAttribute('aria-label', this.options.ariaLabel);
    }

    if (this.options.title) {
      this.element.setAttribute('title', this.options.title);
    }

    // Set initial states
    if (this.options.disabled) {
      this.element.disabled = true;
    }

    if (this.isLoading) {
      this.setLoadingState(true);
    }

    // Attach click handler
    if (this.options.onClick && typeof this.options.onClick === 'function') {
      this.element.addEventListener('click', (e) => {
        if (!this.element.disabled && !this.isLoading) {
          this.options.onClick(e);
        }
      });
    }

    return this.element;
  }

  /**
   * Build the class string for the button
   * @private
   * @returns {string} CSS class string
   */
  getClasses() {
    const classes = ['btn'];

    // Add variant class
    classes.push(`btn-${this.options.variant}`);

    // Add size class
    classes.push(`btn-${this.options.size}`);

    // Add custom classes
    if (this.options.className) {
      classes.push(this.options.className);
    }

    return classes.join(' ');
  }

  /**
   * Set button to loading state
   * @param {boolean} loading - Loading state
   */
  setLoadingState(loading = true) {
    if (!this.element) return;

    this.isLoading = loading;
    this.element.disabled = loading;
    this.element.setAttribute('aria-busy', loading.toString());

    if (loading) {
      this.element.classList.add('btn-loading');
      const spinnerSVG = this.createSpinner();
      this.element.innerHTML = '';
      this.element.appendChild(spinnerSVG);
      this.element.appendChild(document.createTextNode(' Loading...'));
    } else {
      this.element.classList.remove('btn-loading');
      this.element.textContent = this.originalText;
    }
  }

  /**
   * Create loading spinner SVG
   * @private
   * @returns {SVGElement} Spinner SVG element
   */
  createSpinner() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('class', 'btn-spinner');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '10');
    circle.setAttribute('opacity', '0.25');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 12 2 A 10 10 0 0 1 22 12');

    svg.appendChild(circle);
    svg.appendChild(path);

    return svg;
  }

  /**
   * Enable/disable the button
   * @param {boolean} disabled - Disabled state
   */
  setDisabled(disabled = true) {
    if (!this.element) return;
    this.element.disabled = disabled;
  }

  /**
   * Update button text
   * @param {string} text - New button text
   */
  setText(text) {
    this.originalText = text;
    if (!this.isLoading && this.element) {
      this.element.textContent = text;
    }
  }

  /**
   * Update button variant
   * @param {string} variant - New variant
   */
  setVariant(variant) {
    if (!this.element) return;
    
    // Remove all variant classes
    ['primary', 'secondary', 'outline', 'danger'].forEach(v => {
      this.element.classList.remove(`btn-${v}`);
    });

    // Add new variant class
    this.element.classList.add(`btn-${variant}`);
    this.options.variant = variant;
  }

  /**
   * Update button size
   * @param {string} size - New size ('sm' | 'md' | 'lg')
   */
  setSize(size) {
    if (!this.element) return;
    
    // Remove all size classes
    ['sm', 'md', 'lg'].forEach(s => {
      this.element.classList.remove(`btn-${s}`);
    });

    // Add new size class
    this.element.classList.add(`btn-${size}`);
    this.options.size = size;
  }

  /**
   * Get the rendered element
   * @returns {HTMLButtonElement} The button element
   */
  getElement() {
    return this.element;
  }

  /**
   * Remove the button from DOM
   */
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
