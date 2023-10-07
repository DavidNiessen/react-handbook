const formatCurrency = value =>
	new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
	}).format(value);

const BalanceDisplay = () => (
	<div className="balance">{formatCurrency(123456)}</div>
);

export default BalanceDisplay;
