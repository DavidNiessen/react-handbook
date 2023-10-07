# Content:

- 1: (LEGACY) Redux
- 2: React Redux: Provider
- 3: The useSelector Hook
- 4: The useDispatch Hook
- 5: Redux Middleware and Thunks
- 6: Redux Toolkit (RTK)
- 7: createAsyncThunk()

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

# -> 5: Redux Middleware and Thunks

Redux Thunk is a middleware that allows us to write action creators that return a
function instead of an action.
This allows for delayed actions, including working with promises.

One of the main use cases for this middleware is for handling asynchronous actions.

## Adding the middleware to our store

Before we can our middleware (Thunk), we need to add it to our store.

```jsx
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));
```

## Performing asynchronous operations

To perform an asynchronous operation, we just need to create a new action creator,
which instead of returning the action object, returns a function which accepts the
dispatch function and the state.

In this example, we will adjust our addItem action creator to add the item
to an external API.

```jsx
const addItem = item => async (dispatch, getState) => {
	await fetch('https://api.com/cart/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ item }),
	});

	dispatch({ type: 'cart/addItem', payload: item });
};
```

And now we can just dispatch addItem as usual:

```jsx
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
dispatch(addItem('MacBook Air M1'));
```

# -> 6: Redux Toolkit (RTK)

The Redux Toolkit (RTK) is the modern and preferred way of writing Redux code.
It is an opinionated approach and is 100% compatible with "classic" redux.

Some benefits of using RTK:

- We can write code that "mutates" state inside reducers (will be converted to
  immutable logic behind the scenes by "Immer" library).
- Action creators are automatically created
- Automatic setup of Thunk middleware and devtools

## Creating our slices (reducers + action creators)

In RTK, we create so-called "slices" instead of our reducers and action creators.<br>
We then can export our reducer and action creators.

_accountSlice.js_

```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: 0,
	age: 0,
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		createAccount: {
			prepare(name, age) {
				return { payload: { name, age } };
			},
			reducer(state, { payload: { name, age } }) {
				state.name = name;
				state.age = age;
			},
		},
		birthday(state, action) {
			state.age++;
		},
	},
});

export default accountSlice.reducer;
export const { createAccount, birthday } = accountSlice.actions;
```

_cartSlice.js_

```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, { payload: item }) {
			state.items.push(item);
		},
		clearCart(state, action) {
			state.items = [];
		},
	},
});

export default cartSlice.reducer;
export const { addItem, clearCart } = cartSlice.actions;
```

## Creating the store

Instead of having to:

- Creating a root reducer manually
- Setting up devtools
- Creating the middleware manually

We just call configureStore and pass an options object with our reducers.

```jsx
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import cartReducer from './cartSlice';

const store = configureStore({
	reducer: {
		account: accountReducer,
		customer: cartReducer,
	},
});

export default store;
```

## Accessing state and dispatching actions

Here nothing changes.
We can access state and dispatch actions in the same
way as we did with Redux without the toolkit.

# -> 7: createAsyncThunk()

createAsyncThunk() is the Redux Toolkit way of writing async action creators.<br>
Here we adjusted the entire cart splice to make the addItem action creator add the item
to an external API.

_cartSlice.js_

```jsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	isLoading: false,
};

export const addItem = createAsyncThunk(
	'cart/addItem',
	async (item, { dispatch, getState }) => {
		await fetch('https://api.com/cart/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ item }),
		});

		return item;
	},
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, { payload: item }) {
			state.items.push(item);
		},
		clearCart(state, action) {
			state.items = [];
		},
	},
	extraReducers: builder =>
		builder
			.addCase(addItem.pending, state => {
				state.isLoading = true;
			})
			.addCase(addItem.fulfilled, (state, { payload: item }) => {
				state.items.push(item);
				state.isLoading = false;
			})
			.addCase(addItem.rejected, (state, { error }) => {
				state.isLoading = false;
				console.log(`An error occurred: ${error.message}`);
			}),
});

export default cartSlice.reducer;
export const { clearCart } = cartSlice.actions;
```

In a component, we can now dispatch the action in the same way as before:

```jsx
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
dispatch(addItem('PS5'));
```
