import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "./api";
import "./viewAnswers.css";

export default function ViewAnswers(props) {
	const { id } = useParams();
	const [answers, setAnswers] = useState([]);
	const [answerIds, setAnswerIds] = useState([]);
	const history = useHistory();

	function getAnswersToDisplay(id) {
		return api.getAnswers(id);
	}

	useEffect(() => {
		getAnswersToDisplay(id).then((q) => {
			setAnswers(Object.values(q));
			setAnswerIds(Object.keys(q));
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

	function questionsIterate(questionID) {
		return (
			<div>
				iterate Questionsiterate Questionsiterate Questionsiterate
				Questions
			</div>
		);
	}

	return (
		<>
			<div>
				<button className="goBack" onClick={() => props.onBack()}>
					Go back{" "}
				</button>
			</div>
			{questionsIterate()}
			<div className="answersBody">{answersIterate(1)}</div>
		</>
	);
}
