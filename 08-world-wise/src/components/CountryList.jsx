import styles from './CountryList.module.css';
import { Spinner } from './Spinner.jsx';
import { CountryItem } from './CountryItem.jsx';
import { Message } from './Message.jsx';

const CountryList = ({ cities, isLoading }) => {
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return (
			<Message message="Add your first city by clicking on a city on the map" />
		);

	const countries = cities.reduce((arr, city) => {
		if (!arr.map(el => el.country).includes(city.country))
			return [...arr, city];
		else return arr;
	}, []);

	console.log(countries);

	return (
		<ul className={styles.countryList}>
			{countries.map(city => (
				<CountryItem key={city.country} city={city} />
			))}
		</ul>
	);
};

export { CountryList };
