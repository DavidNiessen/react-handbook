import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import { useCities } from '../context/CitiesContext.jsx';

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

const CityItem = ({ city }) => {
	const { cityName, emoji, date, id, position } = city;
	const { currentCity } = useCities();

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					city.id === currentCity.id ? styles['cityItem--active'] : ''
				}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	);
};

export { CityItem };
