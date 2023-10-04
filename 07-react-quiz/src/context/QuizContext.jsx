import { createContext, useContext, useEffect, useReducer } from 'react';
import {
	SECS_PER_QUESTIONS,
	SIMULATE_NETWORK_DELAY_MS,
	SIMULATE_NETWORK_ERROR,
	SIMULATED_DATA,
} from '../config';
import { ACTION_TYPE, STATUS } from '../constants';
import { Error } from '../components/Error';

const QuizContext = createContext();

const initialState = {
	questions: [],
	status: STATUS.LOADING,
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

const reducer = (state, { type, payload }) => {
	const { questions, status, index, points, highscore, secondsRemaining } =
		state;

	switch (type) {
		case ACTION_TYPE.DATA_RECEIVED:
			return { ...state, questions: payload, status: STATUS.READY };
		case ACTION_TYPE.DATA_FAILED:
			return { ...state, status: STATUS.ERROR };
		case ACTION_TYPE.START:
			return {
				...state,
				status: STATUS.ACTIVE,
				secondsRemaining: questions.length * SECS_PER_QUESTIONS,
			};
		case ACTION_TYPE.NEW_ANSWER:
			const question = questions.at(index);
			return {
				...state,
				answer: payload,
				points:
					payload === question.correctOption
						? points + question.points
						: points,
			};
		case ACTION_TYPE.NEXT_QUESTION:
			return { ...state, index: index + 1, answer: null };
		case ACTION_TYPE.FINISH:
			return {
				...state,
				status: STATUS.FINISHED,
				highscore: Math.max(points, highscore),
			};
		case ACTION_TYPE.RESTART:
			return { ...initialState, questions, highscore, status: STATUS.READY };
		case ACTION_TYPE.TICK:
			return {
				...state,
				secondsRemaining: secondsRemaining - 1,
				status: secondsRemaining === 0 ? STATUS.FINISHED : status,
			};
		default:
			throw new Error('Unknown Action Type');
	}
};

const QuizContextProvider = ({ children }) => {
	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(previous, current) => previous + current.points,
		0,
	);

	useEffect(() => {
		// fetch('http://localhost:8000/questions')
		// 	.then(response => response.json())
		// 	.then(data => dispatch({ type: actionType.DATA_RECEIVED, payload: data }))
		// 	.catch(() => dispatch({ type: actionType.DATA_FAILED }));

		setTimeout(() => {
			dispatch(
				SIMULATE_NETWORK_ERROR
					? { type: ACTION_TYPE.DATA_FAILED }
					: {
							type: ACTION_TYPE.DATA_RECEIVED,
							payload: SIMULATED_DATA.questions,
					  },
			);
		}, SIMULATE_NETWORK_DELAY_MS);
	}, []);

	return (
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highscore,
				secondsRemaining,
				numQuestions,
				maxPossiblePoints,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

const useQuiz = () => useContext(QuizContext);

export { QuizContextProvider, useQuiz };
