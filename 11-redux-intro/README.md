# Content:

- 1: (LEGACY) Redux
- 2: React Redux: Provider
- 3: The useSelector Hook
- 4: The useDispatch Hook

# -> 1: (LEGACY) REDUX

Redux is a global state management library.

## Creating reducers

Redux can work with multiple reducer functions (which are similar to useReducer ones).
One small difference is that the initial state is that as a default parameter in
the reducer function. We should also not throw an error in the default case, instead,
we return the state.

```jsx
const accountInitialState = {
	name: '',
	age: 0,
};

const cartInitialState = {
	items: [],
};

const accountReducer = (state, { type, payload }) => {
	switch (type) {
		case 'account/createAccount':
			return { ...state, name: payload.name, age: payload.age };
		case 'account/birthday':
			return { ...state, age: state.age + 1 };
		default:
			return state;
	}
};

const cartReducer = (state, { type, payload }) => {
	switch (type) {
		case 'cart/addItem':
			return { ...state, items: [...state.items, payload] };
		case 'cart/clearCart':
			return { ...state, items: [] };
		default:
			return state;
	}
};
```

## Creating the root reducer

Since we have multiple reducers, we need to combine them into a single root reducer.

```jsx
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	account: accountReducer,
	cart: cartReducer,
});
```

## Creating the store

The redux store is the object that we can use to get the current state or
dispatch actions. We need to pass a reducer (in our case, the root reducer)

```jsx
import { createStore } from 'redux';

const store = createStore(rootReducer);
```

## Dispatching actions

To dispatch an action, we can call the dispatch function.

```jsx
store.dispatch({
	type: 'account/createAccount',
	payload: { name: 'user1', age: 18 },
});
store.dispatch({ type: 'cart/addItem', payload: 'PS5' });
```

## Action creators

A common pattern is to create so called action creators. These are functions that
return the object we dispatch.

```jsx
const createAccount = (name, age) => ({
	type: 'account/createAccount',
	payload: { name, age },
});

const birthday = () => ({ type: 'account/birthday' });

const addItem = item => ({ type: 'cart/addItem', payload: item });

const clearCart = () => ({ type: 'clearCart' });
```

## Accessing state

We can access the state using the getState() functions.

```jsx
import store from './store';

const { account, customer } = store.getState();

console.log(account.name); // 'user1'
console.log(cart.items); // ['PS5']
```

# -> 2: React Redux: Provider

React Redux is a library that allows us to interact with Redux in React.

To get access to all the functionality provided by React Redux, we
usually wrap our entire application with a **Provider component**.

It takes our store as a prop.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
```

# -> 3: The useSelector Hook

The useSelector Hook is a Hook provided by React Redux. It allows us to access
our store within our components.

As a parameter, it takes a callback function, which has access to the store.

When our **selected value changes** (store.cart.items), our component will **re-render**.

```jsx
import { useSelector } from 'react-redux';

const cartItems = useSelector(store => store.cart.items);
```

# -> 4: The useDispatch Hook

To now dispatch actions from our components, we get access to the dispatch
function with the useDispatch Hook.

```jsx
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();

dispatch({ type: 'cart/addItem', payload: 'iPhone 14 Pro' });
```
