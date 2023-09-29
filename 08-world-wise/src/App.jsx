import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage.jsx';
import { Product } from './pages/Product.jsx';
import { Pricing } from './pages/Pricing.jsx';
import { PageNotFound } from './pages/PageNotFound.jsx';
import { AppLayout } from './pages/AppLayout.jsx';
import { Login } from './pages/Login.jsx';
import { CityList } from './components/CityList.jsx';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route index element={<CityList />}></Route>
					<Route path="cities" element={<CityList />}></Route>
					<Route path="countries" element={<p>Countries</p>}></Route>
					<Route path="form" element={<p>Form</p>}></Route>
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export { App };