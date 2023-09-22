import { Movie } from './Movie';

const MovieList = ({ movies, onSelectMovie }) => (
	<ul className="list list-movies">
		{movies?.map(movie => (
			<Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
		))}
	</ul>
);

export { MovieList };
