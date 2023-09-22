import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Search } from './components/Search';
import { NumResults } from './components/NumResults';
import { Main } from './components/Main';
import { Box } from './components/Box';
import { Loader } from './components/Loader';
import { MovieList } from './components/MovieList';
import { ErrorMessage } from './components/ErrorMessage';
import { MovieDetails } from './components/MovieDetails';
import { WatchedSummary } from './components/WatchedSummary';
import { WatchedMovieList } from './components/WatchedMovieList';
import { API_KEY } from './config';

const App = () => {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	const [watched, setWatched] = useState(() => {
		const storedValue = localStorage.getItem('watched');
		return storedValue ? JSON.parse(storedValue) : [];
	});

	useEffect(() => {
		if (query.length < 3) {
			setMovies([]);
			setError(false);
			return;
		}

		handleCloseMovie();

		const controller = new AbortController();

		(async () => {
			try {
				setError('');
				setIsLoading(true);
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
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

	const handleSelectMovie = id =>
		setSelectedId(selectedId => (id === selectedId ? null : id));

	const handleCloseMovie = () => setSelectedId(null);

	const handleAddWatched = movie => setWatched(watched => [...watched, movie]);

	const handleDeleteWatched = id =>
		setWatched(watched => watched.filter(movie => movie.imdbID !== id));

	useEffect(() => {
		localStorage.setItem('watched', JSON.stringify(watched));
	}, [watched]);

	return (
		<>
			<Navbar>
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
};

export { App };
