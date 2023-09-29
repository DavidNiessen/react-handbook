import styles from './Login.module.css';
import { useState } from 'react';
import { AppNav } from '../components/AppNav.jsx';
import { PageNav } from '../components/PageNav.jsx';

const Login = () => {
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');

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
					<button>Login</button>
				</div>
			</form>
		</main>
	);
};

export { Login };
