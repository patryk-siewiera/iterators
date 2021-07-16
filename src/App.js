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
				<div>{JSON.stringify(formList, null, 2)}</div>
			</div>
			<div className="list">
				<ul>
					{formList.map((e) => {
						return (
							<li>
								<div className="name">Name: {e.name}</div>
								<div className="desc">
									Desc: {e.description}
								</div>
								<div className="actions">
									<button
										className="edit"
										onClick={() => {
											onEdit(e, e.id, e.name);
										}}
									>
										edit
									</button>
									<button className="moveUp">moveUp</button>
									<button className="delete">Delete</button>
									<button className="moveDown">
										moveDown
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
