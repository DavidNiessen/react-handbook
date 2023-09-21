const Search = ({ query, setQuery }) => (
	<input
		className="search"
		type="text"
		placeholder="Search movies..."
		value={query}
		onChange={e => setQuery(e.target.value)}
	/>
);

export { Search };
