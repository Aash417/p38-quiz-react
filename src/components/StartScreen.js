import { useQuiz } from '../contexts/QuizContest';

export default function StartScreen() {
	const { numQuestion, dispatch } = useQuiz();
	return (
		<div className="start">
			<h2>Welcome to the react quiz!</h2>
			<h3>{numQuestion} question to test</h3>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'start' })}
			>
				lets start
			</button>
		</div>
	);
}
