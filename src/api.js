let formsArray = [];

let formsQuestions = {
	0: [],
};

const api = {
	getForms() {
		fetch("/forms"); // just for informing which requests are taking place in network tab
		return new Promise((res, reject) => {
			res([
				{
					id: 0,
					name: "Kwestionariusz",
					questions: "use .getFormQuestions",
				},
				...formsArray,
			]);
		});
	},
	getFormQuestions(id) {
		fetch("/questions/" + id);
		return new Promise((res, rej) => {
			res([
				{ id: 44, text: "wiek", type: "shortAnswer" },
				{ id: 45, text: "imie i nazwisko", type: "shortAnswer" },
			]);
		});
	},
	createForm(data) {
		fetch("/form", { method: "POST" });
		formsArray.push(data);
		return Promise.resolve(data);
	},
	createQuestion(id, data) {
		formsQuestions[id] = formsQuestions[id] || [];
	},
	deleteForm(id) {
		fetch("/form", { method: "DELETE" });
		formsArray = formsArray.filter((form) => form.id !== id); // TODO use splice here, change to const
		return Promise.resolve({ info: "OK" });
	},
	deleteQuestion(id) {
		fetch("/question/" + id, { method: "DELETE" });
		formsQuestions = formsQuestions.filter((q) => q.id !== id);
		return Promise.resolve({ info: "OK" });
	},
	deleteQuestions(formId) {
		fetch("/question/*", { method: "DELETE" });
		delete formsQuestions[formId];
		return Promise.resolve({ info: "OK" });
	},
	updateForm(id, data) {
		fetch("/form" + id, { method: "PATCH" });
		formsArray = formsArray.map((form) => {
			if (form.id === id) {
				// a = {a: 0, b: 1}, b = {b: 2, c: 1} => {...a, ...b} === {a: 0, b: 2, c: 1}
				return { ...form, ...data };
			}
			return form;
		});
		return Promise.resolve(data);
	},
	updateQuestion(id, data) {
		fetch("/question" + id, { method: "PATCH" });
		formsQuestions[id] = { ...formsQuestions[id], ...data };
		return Promise.resolve(formsQuestions[id]);
	},
};

export default api

/*
function AddFrom(params) {
	const name = ""; // usestate
	const desc = "";
	return (
		<div>
			<input type="text" name="name" />
			<input type="text" name="desc" />
			<button
				type="submit"
				onClick={() => {
					api.createForm({ name, desc }).then((r) => {
						refresh();
					});
				}}
			></button>
		</div>
	);
}

function Form({ id }) {
	const [questions, setQuestions] = useState([]);
    useEffect(() => {
        api.getFormQuestions(id).then((questions) => {
			setQuestions(questions);
		});
    }, [])
    return <div>

    </div>
}

function ExampleApiUsage() {
	const [forms, setForms] = useState([]);
	useEffect(() => {
        api.getForms().then((res) => {
			setForms(res);
		});
    }, [])
	return (
		<div>
			{forms.map((form) => (
				<div>
					<Form id={form.id} />
				</div>
			))}
		</div>
	);
}
*/