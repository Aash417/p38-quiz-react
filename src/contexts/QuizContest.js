import { createContext, useContext, useEffect, useReducer } from 'react';
import { questions as data } from '../data';

const SECS_PER_QUESTION = 30;
const initialState = {
	questions: [],
	// loading, error, ready, active, finished
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};
const QuizContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case 'newAnswer':
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore:
					state.points > state.highscore
						? state.points
						: state.highscore,
			};
		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
			};
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status:
					state.secondsRemaining === 0 ? 'finished' : state.status,
			};
		default:
			throw new Error('Unkonwn Action');
	}
}

function QuizProvider({ children }) {
	const [
		{
			questions,
			status,
			index,
			answer,
			points,
			highscore,
			secondsRemaining,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestion = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	);

	useEffect(function () {
		// if you are using this app with json server use a. other wise use b.
		// a.
		/*
		fetch('http://localhost:7000/questions')
			.then((res) => res.json())
			.then((data) => dispatch({ type: 'dataReceived', payload: data }))
			.catch((err) => {
				console.error(err);
				dispatch({ type: 'dataFailed' });
			});
		*/

		// b.
		if (!data) dispatch({ type: 'dataFailed' });
		// console.log(data);

		dispatch({ type: 'dataReceived', payload: data });
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
				dispatch,
				numQuestion,
				maxPossiblePoints,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

function useQuiz() {
	const context = useContext(QuizContext);
	if (context === undefined)
		throw new Error('context was used outside the Provider.');

	return context;
}

export { useQuiz, QuizProvider };
