import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "./api";
import "./viewAnswers.css";

export default function ViewAnswers(props) {
	const { id } = useParams();
	const [answers, setAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const history = useHistory();

	function getAnswersToDisplay(id) {
		return api.getAnswers(id);
	}

	function getFromQuestions(id) {
		api.getFormQuestions(id).then((q) => setQuestions(q));
	}

	useEffect(() => {
		getAnswersToDisplay(id).then((q) => {
			setAnswers(Object.values(q));
			getFromQuestions(id);
		});
	}, []);

	function answersIterate(questionID) {
		let answerArray = [];
		answers.map((ans) => ans[1]);
		for (let index = 0; index < answers.length; index++) {
			answerArray.push(answers[index][questionID]);
		}
		return answerArray.map((el) => (
			<div className="answerIterated">{el}</div>
		));
	}

	function allAnswers() {
		let answersArray = [];
		for (let index = 0; index < answers.length; index++) {
			answersArray.push(answersIterate(index));
		}
		return answersArray.map((el) => (
			<div>
				<div className="answersBody">{el}</div>
			</div>
		));
	}

	return (
		<>
			<div>
				<button className="goBack" onClick={() => props.onBack()}>
					Go back{" "}
				</button>
			</div>
			<h1>
				Answers to question id: <u>{id}</u>
			</h1>
			<br />
			<div className="answersBody">
				{console.log(questions)}
				{questions.map((q, index) => (
					<div>
						<b>{q.text}</b>
						<br />
						{answersIterate(index)}
						<br />
						<br />
					</div>
				))}
			</div>
		</>
	);
}
