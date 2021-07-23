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
			></textarea>
		</ShortAnswer>
	);
}

function OneAnswer({ question }) {
	const [value, setValue] = useState("");

	return (
		<div className="oneAnswer">
			<form>
				{question.text}
				{question.required && " (required)"}
				{question.options.map((ans) => {
					return (
						<label className="labelOneAnswer">
							<input
								type="radio"
								label="radio"
								name="oneAnswer"
								onChange={(ev) => setValue(ev.target.value)}
							/>
							{ans}
						</label>
					);
				})}
			</form>
		</div>
	);
}

function MultipleAnswer({ question }) {
	const [value, setValue] = useState("");
	return (
		<div className="oneAnswer">
			<form>
				{question.text}
				{question.required && "(required)"}
				{question.options.map((ans) => {
					return (
						<label className="labelOneAnswer">
							<input
								type="checkbox"
								label="checkbox"
								name="oneAnswer"
								onChange={(ev) => setValue(ev.target.value)}
							/>
							{ans}
						</label>
					);
				})}
			</form>
		</div>
	);
}
function Line({ question }) {
	const [value, setValue] = useState("");
	return (
		<form>
			{question.text}
			{question.required && " (required)"}
			<div className="sliderContainer">
				<input
					type="range"
					min={question.range[0]}
					max={question.range[1]}
					class="slider"
					id="myRange"
					onChange={(ev) => setValue(ev.target.value)}
				/>
				{value}
			</div>
		</form>
	);
}
