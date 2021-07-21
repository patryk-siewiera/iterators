import React from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "./api";
import { useState, useEffect } from "react";

export default function ViewForm(props) {
	const { id } = useParams();
	const history = useHistory();
	const [questions, setQuestions] = useState([]);

	function getFormQuestions(id) {
		return api.getFormQuestions(id).then((q) => setQuestions(q));
	}

	useEffect(() => {
		getFormQuestions(id);
	}, []);

	// debugger;
	return (
		<div>
			<div>this is view form, {id}.</div>
			<div>
				<button
					onClick={() => {
						history.push("/");
					}}
				>
					{console.log(questions)}
					Back
				</button>
			</div>

			{questions.map((q) => {
				return (
					<div>
						{q.type === "shortAnswer" && (
							<ShortAnswer question={q} />
						)}
						{q.type === "longAnswer" && <LongAnswer question={q} />}
						{/* {{ shortAnswer: <ShortAnswer /> }[q.type]} */}
						{/* {getRenderer(q)} */}
					</div>
				);
			})}
		</div>
	);
}

function getRenderer(question) {
	// strategy design pattern
	if (question.type === "shortAnswer") {
		return <ShortAnswer />;
	}
	if (question.type === "longAnswer") {
		return <LongAnswer />;
	}
	return <div>Error</div>;
}

function ShortAnswer({ question, children }) {
	// composite design pattern
	const [value, setValue] = useState("");
	return (
		<div>
			<div>
				{question.text} {question.required && "(required)"}
			</div>
			<div>
				{children || (
					<input
						type="text"
						placeholder="Your answer..."
						value={value}
						onChange={(ev) => setValue(ev.target.value)}
					/>
				)}
			</div>
		</div>
	);
}

function LongAnswer({ question, ...props }) {
	const [value, setValue] = useState("");
	// reactjs: render function design pattern
	return (
		<ShortAnswer question={question}>
			<textarea onChange={(ev) => setValue(ev.target.value)}>
				{value}
			</textarea>
			{value}
		</ShortAnswer>
	);
}
