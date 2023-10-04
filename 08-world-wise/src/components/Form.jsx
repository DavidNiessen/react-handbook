// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import styles from './Form.module.css';
import { Button } from './Button.jsx';
import { BackButton } from './BackButton.jsx';
import { useURLPosition } from '../hooks/useURLPosition.js';
import { Message } from './Message.jsx';
import { Spinner } from './Spinner.jsx';
import { useCities } from '../context/CitiesContext.jsx';
import { useNavigate } from 'react-router-dom';

export const convertToEmoji = countryCode => {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
};

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Form = () => {
	const [lat, lng] = useURLPosition();
	const { createCity, isLoading } = useCities();
	const navigate = useNavigate();

	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [emoji, setEmoji] = useState();
	const [geoCodingError, setGeoCodingError] = useState('');

	useEffect(() => {
		if (!lat || !lng) return;
		const fetchCityData = async () => {
			try {
				setIsLoadingGeocoding(true);
				setGeoCodingError('');

				const response = await fetch(
					`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
				);
				const data = await response.json();

				if (!data.countryCode)
					throw new Error(
						"That doesn't seem to be a city. Click somewhere else.",
					);

				setCityName(data.city || data.locality || '');
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
			} catch (error) {
				setGeoCodingError(error.message);
			} finally {
				setIsLoadingGeocoding(false);
			}
		};
		fetchCityData();
	}, [lat, lng]);

	const handleSubmit = event => {
		event.preventDefault();

		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
			id: Math.floor(Math.random() * 1_000_000_000),
		};

		createCity(newCity);
		navigate('/app/cities');
	};

	if (isLoadingGeocoding) return <Spinner />;

	if (!lat || !lng)
		return <Message message="Start by clicking somewhere on the map." />;

	if (geoCodingError) return <Message message={geoCodingError} />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ''}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					id="date"
					onChange={date => setDate(date)}
					selected={date}
					dateFormat={'dd/MM/yyyy'}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={e => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
};

export { Form };
