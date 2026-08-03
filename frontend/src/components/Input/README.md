# Input Component

Reusable input field component for TaskFlow.

## Usage

```javascript
import { Input } from './Input.js';

const input = new Input({
  type: 'text',
  placeholder: 'Enter text...',
  disabled: false,
  required: true
});
```

## Props

- `type`: Input type (text, email, password, number)
- `placeholder`: Placeholder text
- `disabled`: Disable input state
- `required`: Make input required
