# Content:

- 1: The useEffect Hook
- 2: The useRef Hook
- 3: useState vs useRef
- 4: Custom Hooks

# -> 1: The useEffect Hook

The useEffect Hook allows you to perform side effects in your components.<br>
Some examples of side effects are: fetching data, directly updating the DOM, and timers.<br>
You should use one useEffect for each side effect.

**IMPORTANT**: Side effects should **<u>never</u>** be performed outside the useEffect Hook.

## Arguments:

The Hook accepts 2 arguments: <br>

```jsx
useEffect(<function>, <dependency>);
```

## Effect Cleanup:

The passed function can return another function which will be executed when the
component unmounts or before the effect is executed again.

## Examples:

### 1: No dependency passed

```jsx
useEffect(() => {
	// Runs after every render
});
```

### 2: Empty array passed

```jsx
useEffect(() => {
	// Runs only after the first render
}, []);
```

### 3: Props or state values passed

```jsx
useEffect(() => {
	// Runs on the first render
	// Runs any time any dependency value (prop or state) changes
}, [prop, state]);
```

### 4: Effect cleanup (and empty array passed)

```jsx
useEffect(() => {
	// Runs only on the first render
	return () => {
		// Runs on component unmount
	};
}, []);
```

# -> 2: The useRef Hook

The useRef Hook allows you to persist values between renders.<br>
It can be used to store a mutable value that does not cause a re-render when updated.<br>
It can also be used to access a DOM element directly.

## Creating a ref

To create a ref, we must call the useRef function.
We can provide a default value as an argument.

```jsx
const ref = useRef(0);
```

## Accessing a ref value

useRef returns an object with a "current" property, which is the value we need.

```jsx
const refValue = ref.current;
```

## Updating the ref value

In this example, the count will update on every re-render (we won't
trigger any re-render here, so this would only work if we re-rendered the component.)<br>

Remember: The useEffect Hook without a second parameter will run on every re-render.

```jsx
const count = useRef(0);

useEffect(() => {
	count.current++;
});
```

## Accessing DOM elements

useRef can be used to hold reference to a DOM element.<br>
The following code will focus the input element when the button is clicked.

```jsx
const MyComponent = () => {
	const inputElement = useRef(null);

	const handleClick = () => {
		inputElement.current.focus();
	};

	return (
		<>
			<input ref={inputElement} type="text" />
			<button onClick={handleClick}>Set Focus</button>
		</>
	);
};
```

# -> 3: useState vs useRef

![slides 001](https://github.com/zSkillCode/react-handbook/assets/68539499/f1fd7238-6a4a-42e5-a291-511342dde5db)

# -> 4: Custom Hooks

Hooks are reusable functions.<br>
When you have component logic that needs to be used by multiple components,
we can extract that logic to a custom Hook.<br>
Custom Hooks **must** start with "use" in order to be recognized as Hooks by React.
Example: useFetch.

## When to create custom Hooks?

![slides 002](https://github.com/zSkillCode/react-handbook/assets/68539499/7233f8dd-90f8-4fa8-8e7f-636178ff3e38)

## Example

Hook

```jsx
import { useState } from 'react';

function useCounter(initialValue = 0) {
	const [count, setCount] = useState(initialValue);

	const increment = () => setCount(prevCount => prevCount + 1);
	const decrement = () => setCount(prevCount => prevCount - 1);

	return { count, increment, decrement };
}

export { useCounter };
```

Component that uses the Hook

```jsx
import React from 'react';
import { useCounter } from './useCounter';

function CounterComponent() {
	const { count, increment, decrement } = useCounter(0);

	return (
		<div>
			<button onClick={decrement}>-</button>
			<span>{count}</span>
			<button onClick={increment}>+</button>
		</div>
	);
}

export { CounterComponent };
```
