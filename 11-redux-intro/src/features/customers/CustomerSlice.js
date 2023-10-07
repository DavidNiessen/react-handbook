const initialState = {
	fullName: '',
	nationalID: '',
	createdAt: '',
};

const customerReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'customer/createCustomer':
			return {
				...state,
				fullName: payload.fullName,
				nationalID: payload.nationalID,
				createdAt: payload.createdAt,
			};
		case 'customer/updateName':
			return { ...state, fullName: payload };
		default:
			return state;
	}
};

const createCustomer = (fullName, nationalID) => ({
	type: 'customer/createCustomer',
	payload: { fullName, nationalID, createdAt: new Date().toISOString() },
});
const updateName = fullName => ({
	type: 'account/updateName',
	payload: fullName,
});

export default customerReducer;
export { createCustomer, updateName };
