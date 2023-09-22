import { useEffect, useState } from 'react';
import { StarRating } from './StarRating';
import { Loader } from './Loader';
import { API_KEY } from '../config';

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState('');

	const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		movie => movie.imdbID === selectedId,
	)?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
		imdbRating,
	} = movie;

	const handleAdd = () => {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: +imdbRating,
			runtime: +runtime.split(' ').at(0),
			userRating,
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	};

	useEffect(() => {
		const callback = event => {
			if (event.code === 'Escape') {
				onCloseMovie();
			}
		};

		document.addEventListener('keydown', callback);

		return () => document.removeEventListener('keydown', callback);
	}, [onCloseMovie]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const response = await fetch(
				`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`,
			);

			const data = await response.json();
			setMovie(data);
			setIsLoading(false);
		})();
	}, [selectedId]);

	useEffect(() => {
		if (!title) return;
		document.title = title;
		return () => (document.title = 'usePopcorn');
	}, []);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<img src={poster} alt={`Poster of ${title}`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>

					<section>
						<div className="rating">
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>

									{userRating > 0 && (
										<button className="btn-add" onClick={handleAdd}>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>You rated this movie {watchedUserRating}/10 ⭐.</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>

					<button className="btn-back" onClick={onCloseMovie}>
						&larr;
					</button>
				</>
			)}
		</div>
	);
};

export { MovieDetails };
