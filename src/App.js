import React, { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

function App({ onEdit, onView, onAnswer }) {
	const [formList, setFormList] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	function refreshForms() {
		return api.getForms().then((forms) => setFormList(forms));
	}

	useEffect(() => {
		refreshForms();
	}, []);

	return (
		<div className="App">
			<div className="addNewList">
				{" "}
				<h1>PS forms</h1>
				<div className="refreshWarning">
					after <b>refresh</b> app will load default data!
				</div>
				<input
					onChange={(ev) => setName(ev.target.value)}
					type="text"
					placeholder="List Name"
					id="name"
					value={name}
				/>
				<input
					onChange={(ev) => setDescription(ev.target.value)}
					type="text"
					placeholder="List Desciption"
					id="description"
					value={description}
				/>
				{/* https://youtu.be/pCA4qpQDZD8?t=1160 */}
				<div>
					<button
						type="submit"
						onClick={(e) =>
							// setFormList(formList.concat(newForm(name, desc)))
							api
								.createForm({ name, description })
								.then((r) => {
									refreshForms();
								})
								.catch((err) => alert(JSON.stringify(err)))
						}
					>
						New form
					</button>
				</div>
			</div>
			<div className="list">
				<ul>
					{formList.map((e) => {
						return (
							<li>
								<div className="nameAndDesc">
									<div className="name">
										<b> {e.name}</b>
									</div>
									<div className="desc">
										<i>{e.description}</i>
									</div>
								</div>
								<div className="heightButtons">
									{" "}
									<button
										className="answerQuestion"
										onClick={() => {
											onView(e.id, e);
										}}
									>
										Answer Questions
									</button>
									<button
										className="viewAnswers"
										onClick={() => onAnswer(e.id, e)}
									>
										View answers
									</button>
								</div>
								<div className="actions">
									<button
										className="edit"
										onClick={() => {
											onEdit(e.id, e);
										}}
									>
										edit
									</button>
									<button
										className="delete"
										onClick={() => {
											console.warn(
												"delete form id",
												e.id
											);
											api.deleteForm(e.id).then(
												refreshForms
												// () => refreshForms()
											);
										}}
									>
										Delete
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default App;
