import "./App.css";
import React, { useState, useEffect } from "react";

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
	const [desc, setDesc] = useState("");
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
					onChange={(ev) => setDesc(ev.target.value)}
					type="text"
					placeholder="List Desciption"
					id="description"
					value={desc}
				/>
				{/* https://youtu.be/pCA4qpQDZD8?t=1160 */}
				<button
					type="submit"
					onClick={(e) =>
						setFormList(formList.concat(newForm(name, desc)))
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
									<button className="delete">Delete</button>
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
