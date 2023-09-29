import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Homepage } from './pages/Homepage.jsx';
import { Product } from './pages/Product.jsx';
import { Pricing } from './pages/Pricing.jsx';
import { PageNotFound } from './pages/PageNotFound.jsx';
import { AppLayout } from './pages/AppLayout.jsx';
import { Login } from './pages/Login.jsx';
import { CityList } from './components/CityList.jsx';
import { SIM_DATA, SIM_NETWORK_DELAY_MS } from './config.js';
import { CountryList } from './components/CountryList.jsx';
import { City } from './components/City.jsx';
import { Form } from './components/Form.jsx';

const App = () => {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route index element={<Navigate replace to="cities" />} />
					<Route
						path="cities"
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route path="cities/:id" element={<City />} />
					<Route
						path="countries"
						element={<CountryList cities={cities} isLoading={isLoading} />}
					/>
					<Route path="form" element={<Form />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export { App };
