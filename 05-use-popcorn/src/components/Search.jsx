import { useEffect } from 'react';

const Search = ({ query, setQuery }) => {
	useEffect(() => {
		const element = document.querySelector('.search');
		element.focus();
	}, []);

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={e => setQuery(e.target.value)}
		/>
	);
};

export { Search };
