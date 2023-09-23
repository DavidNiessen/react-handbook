# Content:

- 1: The children prop

# -> 1: The children prop

Essentially, props.children is a special prop, automatically passed
to every component, that can be used to render the content included between
the opening and closing tags when invoking a component.

These kinds of components are identified by the official documentation as “boxes”.

```jsx
const Box = ({ children }) => <ul>{children}</ul>;

const List = () => (
	<Box>
		<li>A</li>
		<li>B</li>
	</Box>
);
```

HTML result:

```html
<ul>
	<li>A</li>
	<li>B</li>
</ul>
```
