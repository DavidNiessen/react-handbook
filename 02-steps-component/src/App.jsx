import { useState } from 'react';

const messages = [
	'Learn React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑',
];

const App = () => {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

	const handlePrevious = () => {
		if (step > 1) setStep(step => step - 1);
	};

	const handleNext = () => {
		if (step < 3) setStep(step => step + 1);
	};

	return (
		<>
			<button className="close" onClick={() => setIsOpen(isOpen => !isOpen)}>
				&times;
			</button>

			{isOpen && (
				<div className="steps">
					<div className="numbers">
						<div className={`${step >= 1 ? 'active' : ''}`}>1</div>
						<div className={`${step >= 2 ? 'active' : ''}`}>2</div>
						<div className={`${step >= 3 ? 'active' : ''}`}>3</div>
					</div>

					<StepMessage step={step}>{messages[step - 1]}</StepMessage>

					<div className="buttons">
						<Button
							textColor="#fff"
							backgroundColor="#7950f2"
							onClick={handlePrevious}
						>
							<span>👈</span> Previous
						</Button>

						<Button
							textColor="#fff"
							backgroundColor="#7950f2"
							onClick={handleNext}
						>
							Next <span>👉</span>
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

const StepMessage = ({ step, children }) => (
	<div className="message">
		<h3>Step {step}</h3>
		{children}
	</div>
);

const Button = ({ textColor, backgroundColor, onClick, children }) => (
	<button style={{ backgroundColor, color: textColor }} onClick={onClick}>
		{children}
	</button>
);

export { App };
