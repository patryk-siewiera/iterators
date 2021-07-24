import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    useParams
} from "react-router-dom";
import App from "./App";
import EditForm from "./editForm";
import "./index.css";
import ViewAnswers from "./viewAnswers";
import ViewForm from "./viewForm";

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
					onAnswer={(id) => {
						history.push(`/answer/${id}`);
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
			<Route path="/answer/:id">
				<ViewAnswers id={id} onBack={() => history.push("/")} />
			</Route>
		</>
	);
}
