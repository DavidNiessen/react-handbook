import CreateCustomer from './features/customers/CreateCustomer';
import Customer from './features/customers/Customer';
import { useSelector } from 'react-redux';
import BalanceDisplay from './features/accounts/BalanceDisplay';
import AccountOperations from './features/accounts/AccountOperations';

const App = () => {
	const fullName = useSelector(store => store.customer.fullName);

	return (
		<div>
			<h1>🏦 The React-Redux Bank ⚛️</h1>

			{fullName ? (
				<>
					<Customer />
					<AccountOperations />
					<BalanceDisplay />
				</>
			) : (
				<CreateCustomer />
			)}
		</div>
	);
};

export default App;
