import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
	const navigate = useNavigate();
	const [query, setQuery] = useState('');

	const handleSubmit = event => {
		event.preventDefault();

		if (!query) return;

		navigate(`/order/${query}`);
		setQuery('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				placeholder="Search order #"
				value={query}
				onChange={event => setQuery(event.target.value)}
				className="w-64 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:focus:w-72"
			></input>
		</form>
	);
};

export { SearchOrder };
