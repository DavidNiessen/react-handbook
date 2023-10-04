import { ACTION_TYPE } from '../constants';

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
	if (answer === null) return;

	if (index < numQuestions - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: ACTION_TYPE.NEXT_QUESTION })}
			>
				Next
			</button>
		);

	if (index === numQuestions - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: ACTION_TYPE.FINISH })}
			>
				Finish
			</button>
		);
};

export { NextButton };
