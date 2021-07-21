import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import EditForm from "./editForm";
import ViewForm from "./viewForm";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(<MyApp />, document.getElementById("root"));

function MyApp() {
	const [page, setPage] = useState("ViewForm");
	const [id, setId] = useState({});
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Route exact path="/">
					<App
						onEdit={(id) => {
							setPage("edit");
							setId(id);
						}}
					/>
				</Route>
				<Route exact path="/edit">
					<EditForm
						form={id}
						onBack={() => {
							setPage("app");
						}}
					/>
				</Route>
				<Route exact path="/view">
					<ViewForm />
				</Route>
			</BrowserRouter>

			{/* {page === "app" && (
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

			{page === "ViewForm" && <ViewForm />} */}
		</React.StrictMode>
	);
}
