const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

const accountReducer = (state = initialState, { type, payload }) => {
	const { balance, loan } = state;

	switch (type) {
		case 'account/deposit':
			return { ...state, balance: balance + payload };
		case 'account/withdraw':
			return { ...state, balance: balance - payload };
		case 'account/requestLoan':
			if (loan > 0) return state;
			return {
				...state,
				loan: payload.amount,
				loanPurpose: payload.purpose,
				balance: balance + payload.amount,
			};
		case 'account/payLoan':
			return { ...state, loan: 0, loanPurpose: '', balance: balance - loan };
		default:
			return state;
	}
};

const deposit = amount => ({ type: 'account/deposit', payload: amount });
const withdraw = amount => ({ type: 'account/withdraw', payload: amount });
const requestLoan = (amount, purpose) => ({
	type: 'account/requestLoan',
	payload: { amount, purpose },
});
const payLoan = () => ({ type: 'account/payLoan' });

export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan };
