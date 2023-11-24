export default function StartScreen({ numQuestion, dispatch }) {
	return (
		<div className="start">
			<h2>Welcome to the react quiz!</h2>
			<h3>{numQuestion} question to test</h3>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "start" })}
			>
				lets start
			</button>
		</div>
	);
}
