# Content:

- 1: The useEffect Hook
- 2: The useRef Hook
- 3: useState vs useRef

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
	// Runs on every render
});
```

### 2: Empty array passed

```jsx
useEffect(() => {
	// Runs only on the first render
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

![keynote](https://github.com/zSkillCode/react-handbook/assets/68539499/4fdd2296-c43c-4a5d-9f1e-2ddf8b28ca22)
