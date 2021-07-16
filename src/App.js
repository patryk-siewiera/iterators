import "./App.css";
import React, { useState } from "react";

function newForm(name) {
	const form = {
		name: name,
	};
	return form;
}

function App() {
	const [formList, setFormList] = useState([]);
	return (
		<div className="App">
			<h1>PS forms</h1>
			<button
				onClick={(e) => setFormList(formList.concat(newForm("list1")))}
			>
				New form
			</button>
			<div>{JSON.stringify(formList)}</div>
		</div>
	);
}

export default App;
