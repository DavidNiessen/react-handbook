import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
	isLoading: false,
};

export const deposit = createAsyncThunk(
	'account/deposit',
	async ({ amount, currency }) => {
		if (currency === 'USD') return amount;

		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
		);
		const data = await res.json();
		return data.rates.USD;
	},
);

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		withdraw(state, { payload }) {
			state.balance -= payload;
		},
		requestLoan: {
			prepare(amount, purpose) {
				return { payload: { amount, purpose } };
			},

			reducer(state, { payload: { amount, purpose } }) {
				if (state.loan > 0) return;

				console.log(amount);
				console.log(purpose);

				state.loan = amount;
				state.loanPurpose = purpose;
				state.balance += amount;
			},
		},

		payLoan(state, action) {
			state.balance -= state.loan;
			state.loan = 0;
			state.loanPurpose = '';
		},
	},
	extraReducers: builder =>
		builder
			.addCase(deposit.pending, state => {
				state.isLoading = true;
			})
			.addCase(deposit.fulfilled, (state, { payload }) => {
				state.balance += payload;
				state.isLoading = false;
			})
			.addCase(deposit.rejected, state => {
				state.isLoading = false;
			}),
});

export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// const accountReducer = (state = initialState, { type, payload }) => {
// 	const { balance, loan } = state;
//
// 	switch (type) {
// 		case 'account/deposit':
// 			return { ...state, balance: balance + payload, isLoading: false };
// 		case 'account/withdraw':
// 			return { ...state, balance: balance - payload };
// 		case 'account/requestLoan':
// 			if (loan > 0) return state;
// 			return {
// 				...state,
// 				loan: payload.amount,
// 				loanPurpose: payload.purpose,
// 				balance: balance + payload.amount,
// 			};
// 		case 'account/payLoan':
// 			return { ...state, loan: 0, loanPurpose: '', balance: balance - loan };
// 		case 'account/convertingCurrency':
// 			return { ...state, isLoading: true };
// 		default:
// 			return state;
// 	}
// };
//
// const deposit = (amount, currency) => {
// 	if (currency === 'USD')
// 		return {
// 			type: 'account/deposit',
// 			payload: amount,
// 		};
//
// 	return async (dispatch, getState) => {
// 		dispatch({ type: 'account/convertingCurrency' });
//
// 		const res = await fetch(
// 			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
// 		);
// 		const data = await res.json();
// 		const converted = data.rates.USD;
//
// 		dispatch({
// 			type: 'account/deposit',
// 			payload: converted,
// 		});
// 	};
// };
// const withdraw = amount => ({ type: 'account/withdraw', payload: amount });
// const requestLoan = (amount, purpose) => ({
// 	type: 'account/requestLoan',
// 	payload: { amount, purpose },
// });
// const payLoan = () => ({ type: 'account/payLoan' });
//
// export default accountReducer;
// export { deposit, withdraw, requestLoan, payLoan };
