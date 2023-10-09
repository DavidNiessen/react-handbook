# Content:

- 1: Creating simple routes with React Router
- 2: Navigating between routes with Link and NavLink
- 3: Dynamic routing
- 4: Nested routes
- 5: Shared layouts
- 6: Outlet context (useOutletContext)
- 7: Defining routes as a js object (useRoutes)
- 8: The Navigate component
- 9: The useNavigate Hook
- 10: The useSearchParams Hook
- 11: The useLocation Hook and passing state
- 12: Code splitting with lazy() and Suspense

# -> 1: Creating simple routes with React Router

With React Router, we can define routes for our application.<br>
For React in the browser, we need to wrap our routes with the
BrowserRouter component.
When the URL path matches the route path, the specified component
will be rendered.<br>
Example:

```jsx
<BrowserRouter>
	<Routes>
		<Route path="/" element={<Homepage />} />
		<Route path="login" element={<Login />} />
		<Route path="account" element={<Account />} />
		<Route path="*" element={<PageNotFound />} />
	</Routes>
</BrowserRouter>
```

- example.com -> Homepage
- example.com/login -> Login
- example.com/account -> Account
- example.com/bgfr4tgbr -> PageNotFound

# -> 2: Navigating between routes with Link and NavLink

If we want to navigate between routes, we can use the following components:

- Link
- NavLink

The difference between these two is that the NavLink component will have the class
"active" when it is the active page.

```jsx
<div>
	<Link to="/login">Login</Link>
	<NavLink to="/account">Account</NavLink>
</div>
```

# -> 3: Dynamic routing

Imagine we want to create a route for each user.<br>
For this, there is a feature called dynamic routing.
Instead of defining one route for each user, we can specify a
parameter for the user id or name.

```jsx
<Routes>
	<Route path="/" element={<Homepage />} />
	<Route path="/profile" element={<Profile />} />
	<Route path="/profile/:id" element={<Profile />} />
</Routes>
```

In our Profile component, we can then access the id:

```jsx
import { useParams } from 'react-router';

const Profile = () => {
	const { id } = useParams();

	return <h1>Welcome! ID:{id}</h1>;
};

export { Profile };
```

In this example, if we would access the URL /profile/1234,
`Welcome! ID:1234` would be rendered.

# -> 4: Nested routes

Imagine we want the three following routes:

- User list (/user)
- Create user (/user/new)
- Delete user (/user/delete)
- User profile (/user/:id)

To keep our route structure clean, we can nest all user related routes.

```jsx
<Routes>
	<Route path="/user">
		<Route index element={<UserList />} />
		<Route path="new" element={<CreateUser />} />
		<Route path="delete" element={<DeleteUser />} />
		<Route path=":id" element={<User />} />
	</Route>
</Routes>
```

# -> 5: Shared layouts

Now imagine the following situation:

- We have a parent route which should render a settings list
- We have child routes which should render the different settings pages

We want both displayed at the same time.

With shared layouts, we can define where to render the child route's element
using the `<Outlet />` component.

```jsx
<Routes>
	<Route path="/settings" element={<Settings />}>
		<Route path="user" element={<UserSettings />} />
		<Route path="security" element={<SecuritySettings />} />
	</Route>
</Routes>
```

```jsx
import { Link, Outlet } from 'react-router-dom';

const SettingsList = () => {
	return (
		<div className="settings-container">
			<ul className="settings-list">
				<Link to="user">User settings</Link>
				<Link to="security">Security settings</Link>
			</ul>

			<div className="settings">
				<Outlet />
			</div>
		</div>
	);
};
```

![demo](https://github.com/zSkillCode/react-handbook/assets/68539499/f9cdea84-d6d8-4c5f-8ab2-e4c7e74dc708)

# -> 6: Outlet context (useOutletContext)

The Outlet component can take a context as a prop, which works
exactly like React context (will be covered later).

This allows us to pass down values.
In this example, we want to pass down and render the message 'Hello'.

```jsx
<Routes>
	<Route path="/settings" element={<Settings />}>
		<Route path="user" element={<UserSettings />} />
		<Route path="security" element={<SecuritySettings />} />
	</Route>
</Routes>
```

```jsx
const UserSettings = () => {
	const { message } = useOutletContext();
	return <p>{message}</p>;
};
```

```jsx
import { Link, Outlet } from 'react-router-dom';

const SettingsList = () => {
	return (
		<div className="settings-container">
			<ul className="settings-list">
				<Link to="user">User settings</Link>
				<Link to="security">Security settings</Link>
			</ul>

			<div className="settings">
				<Outlet context={{ message: 'Hello' }} />
			</div>
		</div>
	);
};
```

![screenshot](https://github.com/zSkillCode/react-handbook/assets/68539499/a6d699b9-40a8-485e-8903-0b41918f7f87)

# -> 7: Defining routes as a js object (useRoutes)

Another way to define routes is using the useRoutes hook.<br>
It allows us creating routes using JavaScript objects.

```jsx
import { createBrowserRouter } from 'react-router-dom';

const router = createHashRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/order/new',
				element: <CreateOrder />,
			},
			{
				path: '/order/:orderId',
				element: <Order />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
```

# -> 8: The Navigate component

The Navigate component will automatically redirect the user
when it is rendered.

```jsx
<div>{!isAdmin && <Navigate to="/userPanel" />}</div>
```

# -> 9: The useNavigate Hook

The useNavigate Hook allows you to manually navigate the user.

```jsx
const navigate = useNavigate();

const onSubmit = () => {
	navigate('/account');
};
```

# -> 10: The useSearchParams Hook

The useSearchParams Hook works similar to the useState Hook.<br>
Search parameters are all the parameters that come after the ? in a URL:
`example.com?n=3`

The following example will display the search parameter "n" and update it when the
user types something in the search field:

```jsx
const Component = () => {
	const [searchParams, setSearchParams] = useSearchParams({ n: 3 });
	const number = searchParams.get('n');

	return (
		<>
			<h1>{number}</h1>
			<input
				type="number"
				value={number}
				onChange={e => setSearchParams({ n: e.target.value })}
			/>
		</>
	);
};
```

# -> 11: The useLocation Hook and passing state

The useLocation Hook returns an object which contains all the data
related to the URL.

```jsx
const location = useLocation();
```

If we have the following URL: `http://localhost/books?n=32#id`,
the location object would look like this:

```json
{
	"pathname": "/books",
	"search": "?n=32",
	"hash": "#id",
	"key": "2JH3G3S",
	"state": null
}
```

When navigating to another route, we can also pass state, which can later
be accessed using the useLocation hook:

```jsx
<Link to="/account" state={{ id: 3765342345 }}>
```

# -> 12: Code splitting with lazy() and Suspense

Code splitting allows us to dynamically download files (such as js) to the browser
as they are needed.<br>
This allows us to improve performance because the code bundle is smaller.

It is common to implement code splitting in the component where routing is done.

Code splitting consists of two steps:

- 1: Lazy loading components
- 2: Providing a fallback (for example loader/spinner) with Suspense

**Note:** lazy currently only supports default exports.

In this example, all pages will be lazy loaded.

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SpinnerFullPage from './components/Spinner';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route index element={<Homepage />} />
					<Route path="product" element={<Product />} />
					<Route path="pricing" element={<Pricing />} />
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export { App };
```
