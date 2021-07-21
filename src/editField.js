import React, { useState } from "react";
import "./editField.css";

export default function EditField() {
	const [questionType, setQuestionType] = useState("");
	return (
		<div className="editField">
			<input
				className="questionField"
				type="text"
				placeholder="question..."
			/>
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
			<label className="required">
				<input
					value="Add option"
					type="checkbox"
					className="required"
				/>
				Required
			</label>
			<div className="questionToAnswer">
				{questionType === "shortAnswer" && (
					<input
						className="shortAnswer"
						type="text"
						placeholder="placeholder text..."
					/>
				)}
				{questionType === "longAnswer" && (
					<textarea
						className="longAnswer"
						type="text"
						rows="5"
						placeholder="placeholder text..."
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
						<div className="addMore">
							<button className="addMore">add more </button>
						</div>
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
						</label>{" "}
						<div className="addMore">
							<button>add more </button>
						</div>
					</div>
				)}
				{questionType === "line" && (
					<div>
						<input
							type="text"
							placeholder="Minimum value..."
							className="linebox"
						/>
						<input
							type="text"
							placeholder="Maximum value..."
							className="linebox"
						/>
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
			<div className="buttonBox">
				<button type="button" className="remove">
					Remove this field
				</button>
				<button type="button" className="moveUp">
					Move Up
				</button>
				<button type="button" className="moveDown">
					Move down
				</button>
			</div>
		</div>
	);
}
