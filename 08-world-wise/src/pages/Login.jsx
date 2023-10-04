import styles from './Login.module.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { PageNav } from '../components/PageNav.jsx';
import { useAuth } from '../context/FakeAuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');
	const navigate = useNavigate();
	const { login, isAuthenticated } = useAuth();

	useLayoutEffect(() => {
		if (isAuthenticated) navigate('/app');
	}, [isAuthenticated, navigate]);

	const handleLogin = event => {
		event.preventDefault();

		login(email, password);
	};

	return (
		<main className={styles.login}>
			<PageNav />

			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<button onClick={handleLogin}>Login</button>
				</div>
			</form>
		</main>
	);
};

export { Login };
