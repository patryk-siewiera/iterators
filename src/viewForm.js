import React from "react";
import { useParams, useHistory } from "react-router-dom";

export default function ViewForm(props) {
	const { id } = useParams();
	const history = useHistory();
	return (
		<div>
			<div>this is view form, {id}.</div>
			<button
				onClick={() => {
					history.goBack();
				}}
			>
				Back
			</button>
		</div>
	);
}
