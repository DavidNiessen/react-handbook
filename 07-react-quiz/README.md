# Content:

- 1: The useReducer Hook

# -> 1: The useReducer Hook

The useReducer hook is an alternative to the useState Hook
and is used for more complex state management<br>

The Hook accepts a **reducer function** which contains all the logic
to update the state.

Instead of a setState function, it returns a **dispatch** function that can be
used to initiate the specified action.<br>

This hook is an excellent tool when you need to handle multiple related values,
or when the next state depends on the previous one.

## Syntax

useReducer:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

reducer function:

```jsx
const reducer = (state, action) => newState;
```

## Example

```jsx
const initialState = { count: 0 };

const reducer = ({ count }, { type, payload }) => {
	switch (type) {
		case 'set':
			return { count: payload };
		case 'increase':
			return { count: count + payload };
		case 'decrease':
			return { count: count - payload };
		default:
			throw new Error(`Invalid type: ${type}`);
	}
};

const Component = () => {
	const [{ count }, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<span>{count}</span>
			<button onClick={() => dispatch({ type: 'increase', payload: 1 })}>
				Increment
			</button>
			<button onClick={() => dispatch({ type: 'decrease', payload: 1 })}>
				Decrement
			</button>
			<button onClick={() => dispatch({ type: 'set', payload: 0 })}>
				Reset
			</button>
		</div>
	);
};
```

## Bit more complex example

[Click here](./src/components/DateCounter.jsx)
