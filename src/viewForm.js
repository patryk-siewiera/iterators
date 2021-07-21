import React from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "./api";
import { useState, useEffect } from "react";

export default function ViewForm(props) {
	const { id } = useParams();
	const history = useHistory();
	const [questions, setQuestions] = useState("");

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
			<button
				onClick={() => {
					history.goBack();
				}}
			>
				{console.log(questions)}
				Back
			</button>
		</div>
	);
}
