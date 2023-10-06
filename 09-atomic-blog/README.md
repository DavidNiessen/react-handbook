# Content:

- 1: The context API
- 2: Creating the context
- 3: Creating a context Provider
- 4: Accessing the context values
- 5: Custom Provider and Hook
- 6: The memo() function
- 7: The useMemo() and useCallback() Hooks

# -> 1: The context API

The React context API is a way to manage state globally and a good
alternative to lifting state up. When state is managed by a parent component,
and it changes, all children will rerender. The context API will
only rerender the components that are accessing the context's values.

# -> 2: Creating the context

First, we need to create the context using the createContext function.<br>
We usually do this in a separate file and export it.

The only argument createContext can take is a default value, but this
is very rarely used since the actual context value is typically dynamic and
is provided via a Provider component.

_DarkModeContext.js_

```jsx
import { createContext } from 'react';

const DarkModeContext = createContext();

export { DarkModeContext };
```

# -> 3: Creating a context Provider

To allow children to access the context's values, we need to
create a Provider. All children will have access to its values.<br>

```jsx
import { useState } from 'react';
import { DarkModeContext } from './DarkModeContext';

const MyComponent = () => {
	const [isDarkMode, setDarkMode] = useState(false);

	return (
		<DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
			<Header />
		</DarkModeContext.Provider>
	);
};
```

# -> 4: Accessing the context values

After the Provider is created, all children have access to the useContext Hook.<br>
It accepts the context as a parameter and returns the stored value.

```jsx
import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

const Header = () => {
	const { isDarkMode, setDarkMode } = useContext(DarkModeContext);

	return (
		<header style={{ backgroundColor: isDarkMode ? '#000' : '#fff' }}>
			<button onClick={() => setDarkMode(darkMode => !darkMode)}>
				Toggle dark mode
			</button>
		</header>
	);
};
```

# -> 5: Custom Provider and Hook

A good way to separate logic is to extract all the logic related to the context
into its file.

_DarkModeContext.js_

```jsx
import { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
	const [isDarkMode, setDarkMode] = useState(false);

	return (
		<DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

const useDarkMode = () => useContext(DarkModeContext);

export { DarkModeProvider, useDarkMode };
```

_MyComponent.jsx_

```jsx
import { useState } from 'react';
import { DarkModeProvider } from './DarkModeContext';

const MyComponent = () => {
	return (
		<DarkModeProvider>
			<Header />
		</DarkModeProvider>
	);
};
```

_Header.jsx_

```jsx
import { useDarkMode } from './DarkModeContext';

const Header = () => {
	const { isDarkMode, setDarkMode } = useDarkMode();

	return (
		<header style={{ backgroundColor: isDarkMode ? '#000' : '#fff' }}>
			<button onClick={() => setDarkMode(darkMode => !darkMode)}>
				Toggle dark mode
			</button>
		</header>
	);
};
```

# -> 6: The memo() function

-> Think of memoization as caching a value so that it does not need to be recalculated.

- The memo() function is used to create a component that will **not re-render when
  its parent re-renders**, as long as the **props stay the same between renders**.
- **This only affects props!** A memoized component will still re-render when its **own
  state** changes or a **context that it's subscribed to** changes.
- Only makes sense when the component is **heavy** (slow rendering), **re-renders often**
  and does so **with the same props**.

The following component will now only re-render when the passed todos change.

```jsx
const Todos = ({ todos }) => {
	return (
		<>
			<h2>My Todos</h2>
			{todos.map((todo, index) => {
				return <p key={index}>{todo}</p>;
			})}
		</>
	);
};

export default memo(Todos);
```

# -> 7: The useMemo() and useCallback() Hooks

- Used to memoize values (useMemo) and functions (useCallback) between renders
- Values passed into useMemo and useCallback will be **stored in memory** ("cached")
  and returned in subsequent re-renders, as long as **dependencies ("inputs")
  stay the same**
- useMemo and useCallback have a **dependency array** (like useEffect):
  whenever one **dependency changes**, the value will be **re-created**

Only use them for one of the three use cases:

1 -> Memoizing props to prevent wasted renders (together with memo)<br>
2 -> Memoizing values to avoid expensive re-calculations on every render<br>
3 -> Memoizing values that are used in dependency array of another hook

The difference between useMemo and useCallback is that useMemo memoizes the returned
value and useCallback memoizes the function itself.

```jsx
import { useMemo } from 'react';

const calculation = useMemo(() => expensiveCalculation(count), [count]);
```

```jsx
import { useCallback } from 'react';

const addTodo = useCallback(() => {
	setTodos(currentTodos => [...currentTodos, 'New Todo']);
}, [todos]);
```
