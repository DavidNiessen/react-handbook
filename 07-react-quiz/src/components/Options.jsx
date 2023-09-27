import { ACTION_TYPE } from './App';

const Options = ({ question, dispatch, answer }) => {
	const hasAnswered = answer !== null;

	return (
		<div className="options">
			{question.options.map((option, index) => (
				<button
					key={option}
					className={`btn btn-option ${index === answer ? 'answer' : ''} ${
						hasAnswered
							? index === question.correctOption
								? 'correct'
								: 'wrong'
							: ''
					}`}
					disabled={hasAnswered}
					onClick={() =>
						dispatch({ type: ACTION_TYPE.NEW_ANSWER, payload: index })
					}
				>
					{option}
				</button>
			))}
		</div>
	);
};

export { Options };
