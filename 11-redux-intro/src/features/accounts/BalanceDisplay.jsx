import { useSelector } from 'react-redux';

const formatCurrency = value =>
	new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
	}).format(value);

const BalanceDisplay = () => {
	const balance = useSelector(store => store.account.balance);
	return <div className="balance">{formatCurrency(balance)}</div>;
};

export default BalanceDisplay;
