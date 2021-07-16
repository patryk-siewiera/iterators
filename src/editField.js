import React, { useState } from "react";
import "./editField.css";

export default function EditField() {
	const [questionType, setQuestionType] = useState("");
	return (
		<div className="editField">
			<select
				name="questionType"
				onChange={(ev) => setQuestionType(ev.target.value)}
			>
				<option value="shortAnswer">Short Answer</option>
				<option value="long Answer">Long Answer</option>
				<option value="oneAnswer">One Answer</option>
				<option value="multipleAnswer">Multiple Answer</option>
				<option value="line">Line</option>
			</select>

			<label>
				<input
					value="Add option"
					type="checkbox"
					className="required"
				/>
				Required
			</label>
			<button type="button" className="remove">
				Remove this field
			</button>
			<button type="button" className="moveUp">
				Move Up
			</button>
			<button type="button" className="moveDown">
				Move down
			</button>
			<div className="question">
				<input type="text" placeholder="question..." />
			</div>
			{(questionType === "oneAnswer" ||
				questionType === "multipleAnswer") && (
				<label>
					<input
						value="Add option"
						type="checkbox"
						className="optional"
					/>
					Allow other answer
				</label>
			)}
		</div>
	);
}
