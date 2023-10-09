export const formatCurrency = value =>
	new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'EUR',
	}).format(value);

export const formatDate = dateStr =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(dateStr));

export const calcMinutesLeft = dateStr => {
	const d1 = new Date().getTime();
	const d2 = new Date(dateStr).getTime();
	return Math.round((d2 - d1) / 60000);
};
