# Content:

- 1: JSX syntax
- 2: Creating a component
- 3: Exporting and importing components
- 4: Props
- 5: Fragments
- 6: Conditional rendering
- 7: Rendering lists

# -> 1: JSX Syntax

In React, components are built with a html-like syntax called JSX.<br>
We can also perform JavaScript operations using {} inside JSX.

```jsx
<div>
	<p>{['A', 'B'].join('')}</p>
</div>
```

## Classes and events

```jsx
<button className="btn" onClick={() => console.log('Hi')}>
	CLICK ME
</button>
```

## Inline styling

```jsx
<div style={{ backgroundColor: '#fff', display: 'flex' }}></div>
```

# -> 2: Creating a component

There are multiple ways to create a component.<br>
This one is using an arrow function:

```jsx
const MyComponent = () => (
	// Content
	<h1>Hi!</h1>
);
```

# -> 3: Exporting and importing components

There are two ways to export/import a component: named and default.<br>
Which one you use is up to you.

## Exporting

### Named:

```jsx
const MyComponent = () => <p>Hi</p>;

export { MyComponent };
```

### Default:

```jsx
const MyComponent = () => <p>Hi</p>;

export default MyComponent;
```

## Importing

### Named

```jsx
import { MyComponent } from 'file';
```

### Default

```jsx
import MyComponent from 'file';
```

# -> 4: Props

Props are like arguments that you can pass to a component.

## Passing props into another component:

```jsx
const Component1 = () => <Component2 message="hello!"></Component2>;
```

## Receiving and using passed props

```jsx
const Component2 = props => <h1>{props.message}</h1>;
```

## Destructuring props

```jsx
const Component2 = ({ message }) => <h1>{message}</h1>;
```

# -> 5: Fragments

A component can only return one single JSX element.<br>
If you need to return multiple elements, you can wrap them with a fragment (<>...</>).

```jsx
const MyComponent = () => (
	<>
		<h1>Heading</h1>
		<p>Paragraph</p>
	</>
);
```

# -> 6: Conditional rendering

Sometimes you may want a condition to decide which element to render (or non at all).<br>
There a multiple ways to achieve this.

Note: Some of these ways are possible because React will not
render booleans, undefined, null...

## Conditionally returning JSX

This will render a heading if isHeading is true and a paragraph if it is false.

```jsx
const MyComponent = ({ isHeading, text }) => {
	if (isHeading) return <h1>{text}</h1>;
	return <p>{text}</p>;
};
```

## Conditionally returning nothing (with null)

Because React won't render null, nothing will be rendered if render is false.

```jsx
const MyComponent = ({ render }) => {
	if (!render) return null;
	return <SomeComponent />;
};
```

## Conditional rendering using the ternary (?:) operator

```jsx
const MyComponent = ({ isHeading, text }) => (
	<div>{isHeading ? <h1>{text}</h1> : <p>{text}</p>}</div>
);
```

## Conditional rendering using the logical AND (&&) operator

If render is true, the paragraph will be rendered.<br>
If not, nothing will be rendered because the expression returns a boolean
which will be ignored by React.

```jsx
const MyComponent = ({ render }) => <div>{render && <p>Hi</p>}</div>;
```

## Conditional rendering using the logical OR (||) operator

If text is a falsy value (e.g., undefined), "default text" will be rendered.<br>
If it is truthy (e.g., a non-empty string), text will be rendered.<br>

```jsx
const MyComponent = ({ text }) => <h1>{text || 'default text'}</h1>;
```

# Rendering lists

In JS, we can use the .map() method on arrays to render lists.

**IMPORTANT**: You need to give each array item a key that uniquely
identifies it among other items in that array.

```jsx
const items = [
	{
		id: 0,
		name: 'Apple',
		quantity: 4,
	},
	{
		id: 1,
		name: 'Banana',
		quantity: 3,
	},
	{
		id: 2,
		name: 'Milk',
		quantity: 1,
	},
];

const List = () => {
	const listItems = items.map(({ id, name, quantity }) => (
		<li key={id}>
			{quantity}x {name}
		</li>
	));

	return <ol>{listItems}</ol>;
};
```
