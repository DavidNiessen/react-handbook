import { useAuth } from '../context/FakeAuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (!isAuthenticated) navigate('/');
	}, [isAuthenticated, navigate]);

	return isAuthenticated && children;
};

export { ProtectedRoute };
