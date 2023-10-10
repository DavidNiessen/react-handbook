import { Button } from '../../ui/Button.jsx';
import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice.js';

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
	const dispatch = useDispatch();

	return (
		<div className="flex items-center gap-2 md:gap-3">
			<Button
				type="round"
				onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
			>
				-
			</Button>
			<span className="gap-1 text-sm font-medium">{currentQuantity}</span>
			<Button
				type="round"
				onClick={() => dispatch(increaseItemQuantity(pizzaId))}
			>
				+
			</Button>
		</div>
	);
};

export { UpdateItemQuantity };
