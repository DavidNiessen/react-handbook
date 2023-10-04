import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
};

const ACTION = {
	LOGIN: 'login',
	LOGOUT: 'logout',
};

const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case ACTION.LOGIN:
			return { ...state, user: payload, isAuthenticated: true };
		case ACTION.LOGOUT:
			return initialState;
		default:
			throw new Error('Unknown action');
	}
};

const AuthProvider = ({ children }) => {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const login = (email, password) => {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: ACTION.LOGIN, payload: FAKE_USER });
		}
	};

	const logout = () => {
		dispatch({ type: ACTION.LOGOUT });
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
