import React, { useState } from "react";
import EditField from "./editField";
import "./editForm.css";

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
			<div className="buttons">
				<h1>EDIT FORM</h1>
				<button
					className="newField"
					onClick={(ev) => {
						const newQuestionList = [
							...question.concat(newQuestion("a", "b")),
						];
						setQuestion(newQuestionList);
					}}
				>
					add new field{" "}
				</button>
				<button className="save">save</button>
				<button
					className="goBack"
					onClick={() => {
						props.onBack();
					}}
				>
					Go back
				</button>
			</div>
			<EditField />
			{question.map((e) => {
				return <EditField />;
			})}
		</div>
	);
}
