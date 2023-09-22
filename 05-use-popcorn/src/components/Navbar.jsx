import { Logo } from './Logo';

const Navbar = ({ children }) => (
	<nav className="nav-bar">
		<Logo />
		{children}
	</nav>
);

export { Navbar };
