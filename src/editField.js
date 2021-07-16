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
				<option value="longAnswer">Long Answer</option>
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
				{questionType === "shortAnswer" && (
					<input
						className="shortAnswer"
						type="text"
						placeholder="question..."
					/>
				)}
				{questionType === "longAnswer" && (
					<textarea
						className="longAnswer"
						type="text"
						placeholder="question..."
						rows="5"
					/>
				)}
				{questionType === "oneAnswer" && (
					<div className="answers">
						<label>
							<input type="radio" name="answer" /> answer
						</label>
						<label>
							<input type="radio" name="answer" /> answer
						</label>
						<label>
							<input type="radio" name="answer" /> answer
						</label>
						<label>
							<input type="radio" name="answer" /> answer
						</label>
						<button>add more </button>
					</div>
				)}
				{questionType === "multipleAnswer" && (
					<div className="answers">
						<label>
							<input type="checkbox" name="answer" /> answer
						</label>
						<label>
							<input type="checkbox" name="answer" /> answer
						</label>
						<label>
							<input type="checkbox" name="answer" /> answer
						</label>
						<label>
							<input type="checkbox" name="answer" /> answer
						</label>
						<button>add more </button>
					</div>
				)}

				{questionType === "line" && (
					<div>
						<input type="text" placeholder="Minimum value..." />
						<input type="text" placeholder="Maximum value..." />
					</div>
				)}
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
