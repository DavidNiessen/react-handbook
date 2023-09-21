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
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
		if (query.length < 3) {
			setMovies([]);
			setError(false);
			return;
		}
		(async () => {
			try {
				setError('');
				setIsLoading(true);
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
				);

				if (!response.ok)
					throw new Error('Something went wrong with fetching movies.');

				const data = await response.json();

				if (data.Response === 'False') throw new Error('Movie not found');

				setMovies(data.Search);
			} catch (error) {
				console.error(error.message);
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [query]);

	const handleSelectMovie = id =>
		setSelectedId(selectedId => (id === selectedId ? null : id));

	const handleCloseMovie = () => setSelectedId(null);

	const handleAddWatched = movie => setWatched(watched => [...watched, movie]);

	const handleDeleteWatched = id =>
		setWatched(watched => watched.filter(movie => movie.imdbID !== id));

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
