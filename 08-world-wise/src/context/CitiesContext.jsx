import { createContext, useContext, useEffect, useState } from 'react';
import { SIM_DATA, SIM_NETWORK_DELAY_MS } from '../config.js';

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		const fetchCities = async () => {
			try {
				setIsLoading(true);

				await delay(SIM_NETWORK_DELAY_MS);
				setCities(SIM_DATA.cities);
			} catch {
				alert('There was an error');
			} finally {
				setIsLoading(false);
			}
		};
		fetchCities();
	}, []);

	const getCity = async id => {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		try {
			setIsLoading(true);

			await delay(SIM_NETWORK_DELAY_MS);
			setCurrentCity(SIM_DATA.cities.find(city => city.id === +id));
		} catch {
			alert('There was an error');
		} finally {
			setIsLoading(false);
		}
	};

	const createCity = async newCity => {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		try {
			setIsLoading(true);

			await delay(SIM_NETWORK_DELAY_MS);
			SIM_DATA.cities = [...SIM_DATA.cities, newCity];
			setCurrentCity(newCity);

			setCities(cities => [...cities, newCity]);
		} catch {
			alert('There was an error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<CitiesContext.Provider
			value={{ cities, isLoading, currentCity, getCity, createCity }}
		>
			{children}
		</CitiesContext.Provider>
	);
};

const useCities = () => useContext(CitiesContext);

export { CitiesProvider, useCities };
