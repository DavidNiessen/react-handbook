# Content:
- 1: The useEffect Hook

# -> 1: The useEffect Hook
The useEffect Hook allows you to perform side effects in your components.<br>
Some examples of side effects are: fetching data, directly updating the DOM, and timers.

**IMPORTANT**: Side effects should **<u>never</u>** be performed outside the useEffect Hook.

## Arguments:
The Hook accepts 2 arguments: <br>

```jsx
useEffect(<function>, <dependency>);
```

## Effect Cleanup:
The passed function can return another function which will be executed when the
component unmounts.

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
