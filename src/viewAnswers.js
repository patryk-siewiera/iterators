import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "./api";

export default function ViewAnswers(props) {
	const { id } = useParams();
	const [answer, setAnswer] = useState("");
	const history = useHistory();

	function getAnswersToDisplay(id) {
		return api.getAnswers(id).then((q) => setAnswer(q));
	}

	useEffect(() => {
		getAnswersToDisplay(id);
	});

	return (
		<>
			<div>
				<button className="goBack" onClick={() => props.onBack()}>
					Go back{" "}
				</button>
			</div>
			{JSON.stringify(answer[id], null, 2)}
			{console.log(answer[id])}
		</>
	);
}
