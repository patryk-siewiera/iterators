import "./App.css";
import React, { useState, useEffect } from "react";
import api from "./api";

function newForm(name, description) {
	const form = {
		name: name,
		description: description,
	};
	return form;
}

function App({ onEdit }) {
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
			<div className="list">
				<ul>
					{formList.map((e) => {
						return (
								<li>
									<div className="name">
										Name of list:<b> {e.name}</b>
									</div>
									<div className="desc">
										Description: <i>{e.description}</i>
									</div>
									<button className="answer">
										Answer Questions
									</button>
									<div className="actions">
										<button
											className="edit"
											onClick={() => {
												onEdit(e, e.id, e.name);
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
										<div className="move">
											<button className="moveUp">
												moveUp
											</button>
											<button className="moveDown">
												moveDown
											</button>
										</div>
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
