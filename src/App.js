import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
	questions: [],
	// loading, error, ready, active, finished
	status: "loading",
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};
		case "dataFailed":
			return {
				...state,
				status: "error",
			};

		default:
			throw new Error("Unkonwn Action");
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(function () {
		fetch("http://localhost:7000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => {
				console.error(err);
				dispatch({ type: "dataFailed" });
			});
	}, []);

	return (
		<div className="app">
			<Header />

			<Main className="main">
				<p>1 of 15 </p>
			</Main>
		</div>
	);
}
