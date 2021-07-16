import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import EditForm from "./editForm";

ReactDOM.render(<MyApp />, document.getElementById("root"));

function MyApp() {
	const [page, setPage] = useState("edit");
	const [id, setId] = useState({});
	return (
		<React.StrictMode>
			{page === "app" && (
				<App
					onEdit={(id) => {
						setPage("edit");
						setId(id);
					}}
				/>
			)}

			{page === "edit" && (
				<EditForm
					form={id}
					onBack={() => {
						setPage("app");
					}}
				/>
			)}
		</React.StrictMode>
	);
}
