import styles from './CountryItem.module.css';

const CountryItem = ({ country }) => {
	return (
		<li className={styles.countryItem}>
			<span>{country.emoji}</span>
			<span>{country.country}</span>
		</li>
	);
};

export { CountryItem };

export default CountryItem;
