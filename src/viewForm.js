import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "./api";
import "./viewForm.css";

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
					className="backButton"
					onClick={() => {
						history.push("/");
					}}
				>
					{console.log(questions)}
					Back
				</button>
			</div>

			<div className="answersViewForm">
				{" "}
				{questions.map((q) => {
					return (
						<div className="singleQuestion">
							{q.type === "shortAnswer" && (
								<ShortAnswer question={q} />
							)}
							{q.type === "longAnswer" && (
								<LongAnswer question={q} />
							)}
							{q.type === "oneAnswer" && (
								<OneAnswer question={q} />
							)}
							{q.type === "multipleAnswer" && (
								<MultipleAnswer question={q} />
							)}
							{q.type === "line" && <Line question={q} />}

							{/* {{ shortAnswer: <ShortAnswer /> }[q.type]} */}
							{/* {getRenderer(q)} */}
						</div>
					);
				})}
			</div>
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
						className="inputBoxShort"
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
			<textarea
				className="inputBoxLong"
				onChange={(ev) => setValue(ev.target.value)}
			>
				{value}
			</textarea>
			{value}
		</ShortAnswer>
	);
}

function OneAnswer({ question }) {
	const [value, setValue] = useState("");

	return (
		<div>
			<input type="radio" label="aaa" />
			<input type="radio" />
			<input type="radio" />
			<input type="radio" />
			<input type="radio" />
		</div>
	);
}

function MultipleAnswer() {
	const [value, setValue] = useState("");
	return <div>MultipleAnswer</div>;
}
function Line() {
	const [value, setValue] = useState("");
	return <div>Line</div>;
}
