import { Header } from './components/Header';
import { Main } from './components/Main';
import { Loader } from './components/Loader';
import { Error } from './components/Error';
import { StartScreen } from './components/StartScreen';
import { Question } from './components/Question';
import { NextButton } from './components/NextButton';
import { Progress } from './components/Progress';
import { FinishScreen } from './components/FinishScreen';
import { Footer } from './components/Footer';
import { Timer } from './components/Timer';
import { STATUS } from './constants';
import { useQuiz } from './context/QuizContext';

const App = () => {
	const {
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
	} = useQuiz();

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

export { App };
