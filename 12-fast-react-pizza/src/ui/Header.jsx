import { Link } from 'react-router-dom';
import { SearchOrder } from '../features/order/SearchOrder.jsx';
import { Username } from '../features/user/Username.jsx';

const Header = () => {
	return (
		<header className="flex flex-col items-center justify-between gap-2 border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:flex-row sm:px-6">
			<Link to={'/'} className="tracking-widest">
				Fast React Pizza Co.
			</Link>

			<SearchOrder />

			<Username />
		</header>
	);
};

export default Header;
