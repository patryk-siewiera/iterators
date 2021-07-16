import "./App.css";
import React, { useState, useEffect } from "react";

function newForm(name, description) {
	const form = {
		name: name,
		description: description,
	};
	return form;
}

function App() {
	const [formList, setFormList] = useState([]);
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	return (
		<div className="App">
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
	);
}

export default App;
