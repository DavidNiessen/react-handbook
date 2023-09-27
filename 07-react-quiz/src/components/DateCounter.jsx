import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

const actionType = {
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT',
	SET_COUNT: 'SET_COUNT',
	SET_STEP: 'SET_STEP',
	RESET: 'RESET',
};

const reducer = (state, { type, payload }) => {
	const { count, step } = state;

	switch (type) {
		case actionType.INCREMENT:
			return { ...state, count: count + step };
		case actionType.DECREMENT:
			return { ...state, count: count - step };
		case actionType.SET_COUNT:
			return { ...state, count: payload };
		case actionType.SET_STEP:
			return { ...state, step: payload };
		case actionType.RESET:
			return initialState;
		default:
			throw new Error(`Invalid action type: ${type}`);
	}
};

const DateCounter = () => {
	const [{ count, step }, dispatch] = useReducer(reducer, initialState);

	// This mutates the date object.
	const date = new Date();
	date.setDate(date.getDate() + count);

	const dec = () => {
		dispatch({ type: actionType.DECREMENT });
	};

	const inc = () => {
		dispatch({ type: actionType.INCREMENT });
	};

	const defineCount = event => {
		dispatch({ type: actionType.SET_COUNT, payload: +event.target.value });
	};

	const defineStep = event => {
		dispatch({ type: actionType.SET_STEP, payload: +event.target.value });
	};

	const reset = () => {
		dispatch({ type: actionType.RESET });
	};
	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="1"
					max="10"
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
};

export { DateCounter };
