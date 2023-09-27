import { Header } from './Header';
import { Main } from './Main';
import { useEffect, useReducer } from 'react';
import { Loader } from './Loader';
import { Error } from './Error';
import {
	SECS_PER_QUESTIONS,
	SIMULATE_NETWORK_DELAY_MS,
	SIMULATE_NETWORK_ERROR,
	SIMULATED_DATA,
} from '../config';
import { StartScreen } from './StartScreen';
import { Question } from './Question';
import { NextButton } from './NextButton';
import { Progress } from './Progress';
import { FinishScreen } from './FinishScreen';
import { Footer } from './Footer';
import { Timer } from './Timer';

const STATUS = {
	LOADING: 'LOADING',
	ERROR: 'ERROR',
	READY: 'READY',
	ACTIVE: 'ACTIVE',
	RUNNING: 'RUNNING',
	FINISHED: 'FINISHED',
};

const ACTION_TYPE = {
	DATA_RECEIVED: 'DATA_RECEIVED',
	DATA_FAILED: 'DATA_FAILED',
	START: 'START',
	NEW_ANSWER: 'NEW_ANSWER',
	NEXT_QUESTION: 'NEXT_QUESTION',
	FINISH: 'FINISH',
	RESTART: 'RESET',
	TICK: 'TICK',
};

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

const App = () => {
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
		<div className="app">
			<Header />

			<Main>
				{status === STATUS.LOADING && <Loader />}
				{status === STATUS.ERROR && <Error />}
				{status === STATUS.READY && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === STATUS.ACTIVE && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions.at(index)}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<NextButton
								dispatch={dispatch}
								answer={answer}
								index={index}
								numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}
				{status === STATUS.FINISHED && (
					<FinishScreen
						dispatch={dispatch}
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={highscore}
					/>
				)}
			</Main>
		</div>
	);
};

export { App, ACTION_TYPE, STATUS };
