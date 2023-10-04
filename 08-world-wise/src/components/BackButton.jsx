import { Button } from './Button.jsx';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
	const navigate = useNavigate();

	return (
		<Button
			type="back"
			onClick={event => {
				event.preventDefault();

				navigate(-1);
			}}
		>
			&larr; Back
		</Button>
	);
};

export { BackButton };
