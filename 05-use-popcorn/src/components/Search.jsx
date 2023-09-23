import { useRef } from 'react';
import { useKey } from '../hooks/useKey';

const Search = ({ query, setQuery }) => {
	const inputRef = useRef(null);

	useKey('Enter', () => {
		const inputElement = inputRef.current;
		if (!inputElement || document.activeElement === inputElement) return;

		inputElement.focus();
		setQuery('');
	});

	return (
		<input
			className="search"
			ref={inputRef}
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={e => setQuery(e.target.value)}
		/>
	);
};

export { Search };
