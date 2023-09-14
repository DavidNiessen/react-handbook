import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
	{
		name: 'Focaccia',
		ingredients: 'Bread with italian olive oil and rosemary',
		price: 6,
		photoName: 'pizzas/focaccia.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Margherita',
		ingredients: 'Tomato and mozarella',
		price: 10,
		photoName: 'pizzas/margherita.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Spinaci',
		ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
		price: 12,
		photoName: 'pizzas/spinaci.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Funghi',
		ingredients: 'Tomato, mozarella, mushrooms, and onion',
		price: 12,
		photoName: 'pizzas/funghi.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Salamino',
		ingredients: 'Tomato, mozarella, and pepperoni',
		price: 15,
		photoName: 'pizzas/salamino.jpg',
		soldOut: true,
	},
	{
		name: 'Pizza Prosciutto',
		ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
		price: 18,
		photoName: 'pizzas/prosciutto.jpg',
		soldOut: false,
	},
];

const Header = () => {
	//const style = { color: 'red', fontSize: '48px', textTransform: 'uppercase' };

	return (
		<header className="header">
			<h1 /* style={style} */>Fast React Pizza Co.</h1>
		</header>
	);
};

const Pizza = ({ pizzaObject }) => (
	<li className={`pizza ${pizzaObject.soldOut ? 'sold-out' : ''}`}>
		<img src={pizzaObject.photoName} alt={pizzaObject.name} />
		<div>
			<h3>{pizzaObject.name}</h3>
			<p>{pizzaObject.ingredients}</p>
			<span>{pizzaObject.soldOut ? 'SOLD OUT' : `${pizzaObject.price}€`}</span>
		</div>
	</li>
);

const Menu = () => {
	const pizzas = pizzaData;
	const numPizzas = pizzas.length;

	return (
		<main className="menu">
			<h2>Our Menu</h2>

			{numPizzas > 0 ? (
				<>
					<p>
						We also deliver for a small fee of 4.99€/order.
						<br />
						<strong>Free delivery cost if you order for at least 25€!</strong>
					</p>

					<ul className="pizzas">
						{pizzas.map(pizza => (
							<Pizza key={pizza.name} pizzaObject={pizza} />
						))}
					</ul>
				</>
			) : (
				<p>We're still working on our menu. Please come back later.</p>
			)}
		</main>
	);
};

const Order = ({ closeHour }) => (
	<div className="order">
		<p>We are open until {closeHour}:00.</p>
		<button className="btn">Order</button>
	</div>
);

const Footer = () => {
	const hour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;

	return (
		<footer className="footer">
			{isOpen ? (
				<Order closeHour={closeHour} />
			) : (
				<p>
					We're happy to welcome you between {openHour}:00 and {closeHour}:00.
				</p>
			)}
		</footer>
	);
};

const App = () => (
	<div className="container">
		<Header />
		<Menu />
		<Footer />
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
