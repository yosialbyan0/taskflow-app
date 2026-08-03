# Button Component

A reusable, accessible, and production-ready button component for TaskFlow. Built with Vanilla JavaScript and Bootstrap 5 compatibility in mind.

## Features

✅ **Accessible** - Full ARIA support and keyboard navigation
✅ **Variants** - Primary, Secondary, Outline, Danger
✅ **Sizes** - Small, Medium, Large
✅ **States** - Loading, Disabled, Focus, Hover
✅ **Responsive** - Mobile-friendly sizing
✅ **Bootstrap Compatible** - Integrates with Bootstrap 5
✅ **Vanilla JavaScript** - No dependencies

## Installation

```javascript
import { Button } from './Button/Button.js';
import './Button/Button.css';
```

## Basic Usage

```javascript
const button = new Button({
  text: 'Click Me',
  variant: 'primary',
  size: 'md',
  onClick: (e) => console.log('Button clicked')
});

const element = button.render();
document.body.appendChild(element);
```

## Configuration Options

### `text` (string)
Button text content. **Required**.

```javascript
const button = new Button({ text: 'Submit' });
```

### `variant` (string)
Button style variant. Options: `'primary'`, `'secondary'`, `'outline'`, `'danger'`

Default: `'primary'`

```javascript
const button = new Button({
  text: 'Delete',
  variant: 'danger'
});
```

### `size` (string)
Button size. Options: `'sm'`, `'md'`, `'lg'`

Default: `'md'`

```javascript
const button = new Button({
  text: 'Large Button',
  size: 'lg'
});
```

### `type` (string)
Button type attribute. Options: `'button'`, `'submit'`, `'reset'`

Default: `'button'`

```javascript
const button = new Button({
  text: 'Submit Form',
  type: 'submit'
});
```

### `disabled` (boolean)
Disable the button.

Default: `false`

```javascript
const button = new Button({
  text: 'Disabled Button',
  disabled: true
});
```

### `loading` (boolean)
Show loading state with spinner.

Default: `false`

```javascript
const button = new Button({
  text: 'Save',
  loading: false
});
```

### `onClick` (function)
Click handler callback function.

```javascript
const button = new Button({
  text: 'Click',
  onClick: (event) => {
    console.log('Clicked!');
  }
});
```

### `ariaLabel` (string)
Accessibility label for screen readers.

```javascript
const button = new Button({
  text: 'Menu',
  ariaLabel: 'Open navigation menu'
});
```

### `title` (string)
Tooltip text on hover.

```javascript
const button = new Button({
  text: 'Info',
  title: 'Click for more information'
});
```

### `className` (string)
Additional custom CSS classes.

```javascript
const button = new Button({
  text: 'Custom',
  className: 'my-custom-class'
});
```

## Methods

### `render()`
Create and return the button DOM element.

```javascript
const element = button.render();
document.body.appendChild(element);
```

### `setLoadingState(loading)`
Set or remove loading state.

```javascript
button.setLoadingState(true);
// ... do async work
button.setLoadingState(false);
```

### `setDisabled(disabled)`
Enable or disable the button.

```javascript
button.setDisabled(true);
button.setDisabled(false);
```

### `setText(text)`
Update button text.

```javascript
button.setText('New Text');
```

### `setVariant(variant)`
Change button variant.

```javascript
button.setVariant('danger');
```

### `setSize(size)`
Change button size.

```javascript
button.setSize('lg');
```

### `getElement()`
Get the rendered DOM element.

```javascript
const element = button.getElement();
```

### `destroy()`
Remove button from DOM.

```javascript
button.destroy();
```

## Examples

### Primary Button with Click Handler

```javascript
const submitButton = new Button({
  text: 'Submit',
  variant: 'primary',
  size: 'md',
  onClick: (e) => {
    console.log('Form submitted');
  }
});

document.body.appendChild(submitButton.render());
```

### Async Operation with Loading State

```javascript
const saveButton = new Button({
  text: 'Save',
  variant: 'primary',
  onClick: async (e) => {
    saveButton.setLoadingState(true);
    
    try {
      await fetch('/api/save', { method: 'POST' });
    } finally {
      saveButton.setLoadingState(false);
    }
  }
});

document.body.appendChild(saveButton.render());
```

### Danger Button with Confirmation

```javascript
const deleteButton = new Button({
  text: 'Delete',
  variant: 'danger',
  onClick: () => {
    if (confirm('Are you sure?')) {
      // Perform deletion
    }
  }
});

document.body.appendChild(deleteButton.render());
```

### Button with Accessibility Labels

```javascript
const menuButton = new Button({
  text: '☰',
  variant: 'outline',
  size: 'md',
  ariaLabel: 'Toggle navigation menu',
  title: 'Open menu',
  className: 'btn-icon-only'
});

document.body.appendChild(menuButton.render());
```

## Styling

The component uses CSS variables from your design system (`variables.css`) and is fully customizable through CSS. Override colors, spacing, and transitions by modifying the CSS custom properties:

```css
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --space-sm: 0.5rem;
  --transition-normal: 250ms ease-in-out;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- ✅ Keyboard navigation support
- ✅ Screen reader friendly with ARIA labels
- ✅ Focus visible states
- ✅ Proper disabled state handling
- ✅ Loading state with `aria-busy` attribute

## License

MIT
