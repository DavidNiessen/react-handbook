# Content:

- 1: The context API
- 2: Creating the context
- 3: Creating a context Provider
- 4: Accessing the context values
- 5: Custom Provider and Hook

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
	const [isDarkMode, setDarkMode] = useState(false);

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
