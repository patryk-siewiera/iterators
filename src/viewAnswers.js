import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "./api";
import "./viewAnswers.css";

export default function ViewAnswers(props) {
	const { id } = useParams();
	const [answers, setAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);

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
