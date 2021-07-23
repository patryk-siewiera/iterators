import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "./api";

export default function ViewAnswers(props) {
	const { id } = useParams();
	const [answer, setAnswer] = useState([]);
	const history = useHistory();

	function getAnswersToDisplay(id) {
		return api.getAnswers(id);
	}

	const [answers, setAnswers] = useState([]);
	const [answerIds, setAnswerIds] = useState([]);

	useEffect(() => {
		getAnswersToDisplay(id).then((q) => {
			setAnswer(q);
			// debugger;
			setAnswers(Object.values(q));
			setAnswerIds(Object.keys(q));
		});
	}, []);

	function iterateOverObjects(data) {
		console.log(data);
		// data.map((e) => <div>{e}</div>);
	}

	return (
		<>
			<div>
				<button className="goBack" onClick={() => props.onBack()}>
					Go back{" "}
				</button>
			</div>

			<p>q ids: {JSON.stringify(answerIds)}</p>
			<p>q textx: {JSON.stringify(answers.map((ans) => ans[1]))}</p>
			<p>q options: {JSON.stringify(answers.map((ans) => ans[2]))}</p>

			{JSON.stringify(answers)}
		</>
	);
}
