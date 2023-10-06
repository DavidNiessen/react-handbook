import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import { SIM_DATA, SIM_NETWORK_DELAY_MS } from '../config.js';

const CitiesContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
};

const ACTION = {
	LOADING: 'loading',
	CITIES: {
		LOADED: 'cities/loaded',
	},
	CITY: {
		LOADED: 'city/loaded',
		CREATED: 'city/created',
		DELETED: 'city/deleted',
	},
	REJECTED: 'rejected',
};

const reducer = (state, { type, payload }) => {
	const { cities } = state;

	switch (type) {
		case ACTION.LOADING:
			return {
				...state,
				isLoading: true,
			};
		case ACTION.CITIES.LOADED:
			return {
				...state,
				isLoading: false,
				cities: payload,
			};
		case ACTION.CITY.LOADED:
			return {
				...state,
				isLoading: false,
				currentCity: payload,
			};
		case ACTION.CITY.CREATED:
			return {
				...state,
				isLoading: false,
				cities: [...cities, payload],
				currentCity: payload,
			};
		case ACTION.CITY.DELETED:
			return {
				...state,
				isLoading: false,
				cities: cities.filter(city => city.id !== payload),
			};
		case ACTION.REJECTED:
			return {
				...state,
				isLoading: false,
				error: payload ?? 'An error occurred',
			};
		default:
			throw new Error('Unknown action type');
	}
};

const CitiesProvider = ({ children }) => {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	useEffect(() => {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		const fetchCities = async () => {
			dispatch({ type: ACTION.LOADING });

			try {
				await delay(SIM_NETWORK_DELAY_MS);
				const data = SIM_DATA.cities;
				dispatch({ type: ACTION.CITIES.LOADED, payload: data });
			} catch {
				dispatch({
					type: ACTION.REJECTED,
					payload: 'There was an error loading cities...',
				});
			}
		};
		fetchCities();
	}, []);

	const getCity = useCallback(
		async id => {
			if (+id === currentCity.id) return;

			const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

			try {
				dispatch({ type: ACTION.LOADING });

				await delay(SIM_NETWORK_DELAY_MS);
				const data = SIM_DATA.cities.find(city => city.id === +id);
				dispatch({
					type: ACTION.CITY.LOADED,
					payload: data,
				});
			} catch {
				dispatch({
					type: ACTION.REJECTED,
					payload: 'There was an error loading the city...',
				});
			}
		},
		[currentCity.id],
	);

	const createCity = async newCity => {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		try {
			dispatch({ type: ACTION.LOADING });

			await delay(SIM_NETWORK_DELAY_MS);
			SIM_DATA.cities = [...SIM_DATA.cities, newCity];

			dispatch({
				type: ACTION.CITY.CREATED,
				payload: newCity,
			});
		} catch {
			dispatch({
				type: ACTION.REJECTED,
				payload: 'There was an error loading data...',
			});
		}
	};

	const deleteCity = async id => {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		try {
			dispatch({ type: ACTION.LOADING });
			await delay(SIM_NETWORK_DELAY_MS);

			SIM_DATA.cities = SIM_DATA.cities.filter(city => city.id !== id);
			dispatch({
				type: ACTION.CITY.DELETED,
				payload: id,
			});
		} catch {
			dispatch({
				type: ACTION.REJECTED,
				payload: 'There was an error loading data...',
			});
		}
	};

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
};

const useCities = () => useContext(CitiesContext);

export { CitiesProvider, useCities };
