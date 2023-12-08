import { useQuiz } from '../contexts/QuizContest';

function Options() {
	const { questions, dispatch, answer, index } = useQuiz();
	const question = questions[index];

	const hasAnswered = answer !== null;
	return (
		<div className="options">
			{question.options.map((opt, index) => (
				<button
					className={`btn btn-option ${
						index === answer ? 'answer' : ''
					} ${
						hasAnswered
							? index === question.correctOption
								? 'correct'
								: 'wrong'
							: ''
					}`}
					key={opt}
					disabled={hasAnswered}
					onClick={() =>
						dispatch({ type: 'newAnswer', payload: index })
					}
				>
					{opt}
				</button>
			))}
		</div>
	);
}

export default Options;
