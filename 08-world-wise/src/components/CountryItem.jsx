import styles from './CountryItem.module.css';

const CountryItem = ({ city }) => {
	return (
		<li className={styles.countryItem}>
			<span>{city.emoji}</span>
			<span>{city.country}</span>
		</li>
	);
};

export { CountryItem };
