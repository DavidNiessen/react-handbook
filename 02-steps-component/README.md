# Content:
- 1: The useState Hook

# -> 1: The useState Hook
The React useState Hook allows us to track state in a function component.<br>
State generally refers to data or properties that need to be tracked in an application.

## Creating state
To create a state, we must call the useState function and destructure the result
into the state variable and a state updater function.<br>
We can also pass a default value as an argument.
```jsx
const [isOpen, setIsOpen] = useState(false);
```

## Reading state
We can read state by accessing the destructured state value.
```jsx
const [isOpen, setIsOpen] = useState(false);

console.log(isOpen); // false
```

## Updating state
We can update state by calling the destructured state updater function.<br>
Calling the updater function will rerender the component and all of its children.

**IMPORTANT**: **NEVER** mutate the state directly. Always use the updater function!
```jsx
setIsOpen(true);
```

**IMPORTANT**: When the new state depends on the current state, we should 
**NEVER** pass the current state into the updater function.<br>
Instead, we can do this:
```jsx
setIsOpen(isOpen => !isOpen);
```

## What state can hold
The useState Hook can be used to keep track of strings, numbers,
booleans, arrays, objects, and any combination of these!

Instead of creating multiple states for a car like this:
```jsx
const [brand, setBrand] = useState('Mercedes');
const [color, setColor] = useState('black');
const [engine, setEngine] = useState('V8');
const [seats, setSeats] = useState(4);
```

We can do this:
```jsx
const [car, setCar] = useState({
  brand: 'Mercedes',
  color: 'black',
  engine: 'V8',
  seats: 4,
});
```




