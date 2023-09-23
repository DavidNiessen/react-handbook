import React, { useState } from 'react';
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
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

const App = () => {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	const { movies, error, isLoading } = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], 'watched');

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
