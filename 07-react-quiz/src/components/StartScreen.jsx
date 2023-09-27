import { ACTION_TYPE } from './App';

const StartScreen = ({ numQuestions, dispatch }) => {
	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{numQuestions} questions to test your React mastery</h3>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: ACTION_TYPE.START })}
			>
				Let's start
			</button>
		</div>
	);
};

export { StartScreen };
