import { Button } from '../../ui/Button.jsx';
import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice.js';

const DeleteItem = ({ pizzaId }) => {
	const dispatch = useDispatch();
	return (
		<Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
			Delete
		</Button>
	);
};

export { DeleteItem };
