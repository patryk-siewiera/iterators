import React from "react";

export default function EditForm(props) {
	return (
		<div>
			<button
				className="goBack"
				onClick={() => {
					props.onBack();
				}}
			>
				Go back
			</button>{" "}
			<h1>EDIT FORM</h1>
			<div>{JSON.stringify(props)}</div>
			<button>add new field </button>
			<button>save</button>
		</div>
	);
}
