import { useLocation } from 'react-router-dom';

const PageNotFound = () => {
	// TEST
	const location = useLocation();
	console.log(location);

	return (
		<div>
			<h1>Page not found 😢</h1>
		</div>
	);
};

export { PageNotFound };
