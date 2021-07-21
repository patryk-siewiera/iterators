import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import EditForm from "./editForm";
import ViewForm from "./viewForm";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
	useParams,
} from "react-router-dom";

ReactDOM.render(<MyApp />, document.getElementById("root"));

function MyApp() {
	return (
		<React.StrictMode>
			<Router>
				<Switch>
					<Routes />
				</Switch>
			</Router>
		</React.StrictMode>
	);
}

function Routes(params) {
	const history = useHistory();
	let { id } = useParams();
	return (
		<>
			<Route exact path="/">
				<App
					onEdit={(id) => {
						history.push(`/edit/${id}`);
					}}
					onView={(id) => {
						history.push(`/view/${id}`);
					}}
				/>
			</Route>
			<Route exact path="/edit/:id">
				<EditForm
					form={id}
					onBack={() => {
						history.push("/");
					}}
				/>
			</Route>
			<Route path="/view/:id?">
				<ViewForm id={id} />
			</Route>
		</>
	);
}
