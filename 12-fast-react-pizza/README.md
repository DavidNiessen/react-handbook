# Content

- 1: Fetching Data with React Router Loaders
- 2: The useLoaderData Hook
- 3: Displaying a Loader using the useNavigation Hook
- 4: Handling Errors with React Router
- 5: The useRouteError Hook

# -> 1: Fetching Data with React Router Loaders

React Router Loaders allow us to render a route after the data has been loaded.

This only works with the modern way of writing routes using a list of JS objects.<br>
To create a Loader, we just need to create an async function and pass it to the route.

_App.jsx_

```jsx
const router = createHashRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Cart />,
				loader: cartLoader,
			},
		],
	},
]);
```

_Cart.jsx_

```jsx
const Cart = () => <div>...</div>;

const cartLoader = async () => {
	return await fetchCartData();
};
```

# -> 2: The useLoaderData Hook

The useLoaderData Hook allows us to receive the loader data in our cart component.

```jsx
import { useLoaderData } from 'react-router-dom';

const Cart = () => {
	const fetchedData = useLoaderData();
	return <div>{fetchedData.items.length} items in cart.</div>;
};

const cartLoader = async () => {
	return await fetchCartData();
};
```

# -> 3: Displaying a Loader using the useNavigation Hook

The useNavigation Hook allows us to access the current navigation state so we
can check whether the data is currently being fetched.

_AppLayout.jsx_

```jsx
import { useNavigation } from 'react-router-dom';

const AppLayout = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<div className="layout">
			{isLoading && <Loader />}

			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
};
```

# -> 4: Handling Errors with React Router

React Router allows us to handle errors by allowing us to provide a fallback error
component for each route. When a route does not have an error component, it will
delegate the error to its parent route.

```jsx
const router = createHashRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,

		children: [
			{
				path: '/',
				element: <Cart />,
				loader: cartLoader,
				errorElement: <Error />,
			},
		],
	},
]);
```

# -> 5: The useRouteError Hook

The useRouteError allows us to access the error caught by React Router.

_Error.jsx_

```jsx
import { useRouteError } from 'react-router-dom';

const Error = () => {
	const error = useRouteError();

	return (
		<div>
			<h1>Something went wrong 😢</h1>
			<p>{error.data || error.message}</p>
		</div>
	);
};
```
