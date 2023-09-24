import { useEffect, useState } from 'react';
import { API_KEY } from '../config';

const useMovies = query => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (query.length < 3) {
			setMovies([]);
			setError(false);
			return;
		}

		const controller = new AbortController();

		(async () => {
			try {
				setError('');
				setIsLoading(true);
				const response = await fetch(
					`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
					{ signal: controller.signal },
				);

				if (!response.ok)
					throw new Error('Something went wrong with fetching movies.');

				const data = await response.json();

				if (data.Response === 'False') throw new Error('Movie not found');

				setMovies(data.Search);
				setError('');
			} catch (error) {
				console.error(error.message);

				if (error.name !== 'AbortError') setError(error.message);
			} finally {
				setIsLoading(false);
			}
		})();

		return () => controller.abort();
	}, [query]);

	return { movies, error, isLoading };
};

export { useMovies };
