import React, { useState } from "react";
import EditField from "./editField";

function newQuestion(question, type) {
	const form = {
		question: question,
		type: type,
	};
	return form;
}

export default function EditForm(props) {
	const [question, setQuestion] = useState([]);
	return (
		<div>
			<h1>EDIT FORM</h1>
			<button
				onClick={(ev) => {
					const newQuestionList = [
						...question.concat(newQuestion("a", "b")),
					];
					setQuestion(newQuestionList);
				}}
			>
				add new field{" "}
			</button>
			<button>save</button>
			<button
				className="goBack"
				onClick={() => {
					props.onBack();
				}}
			>
				Go back
			</button>{" "}
			<EditField />
			{question.map((e) => {
				return <EditField />;
			})}
		</div>
	);
}
