let formsArray = [
	{
		id: 0,
		name: "Questions Basics",
		questions: "use .getFormQuestions",
		description: "text inputs",
	},
	{
		id: 1,
		name: "Questions 2",
		questions: "use .getFormQuestions",
		description: "radio, checkboxes and line type",
	},
	{
		id: 2,
		name: "Questions 3",
		questions: "use .getFormQuestions",
		description: "all type mixed",
	},
];

let formsQuestions = {
	0: {
		type: "shortAnswer",
		text: "What your age?",
		required: true,
	},
	1: {
		type: "longAnswer",
		text: "Could you describe best travel in your life?",
		required: false,
	},
	2: {
		type: "oneAnswer",
		text: "Where you live?",
		options: ["Poland", "Germany", "Russia"],
		additionalAnswers: true,
		required: true,
	},
	3: {
		type: "multipleAnswer",
		text: "What languages do you speak?",
		options: ["Polish", "English", "German"],
		additionalAnswers: false,
		required: false,
	},
	4: {
		type: "line",
		text: "How well you swim?",
		range: [0, 10],
		required: false,
	},
	5: {
		type: "shortAnswer",
		text: "What your name?",
		required: true,
	},
	6: {
		type: "longAnswer",
		text: "Descibe your favourite animal?",
		required: false,
	},
	7: {
		type: "oneAnswer",
		text: "Do you like programming?",
		options: ["True", "False"],
		additionalAnswers: true,
		required: true,
	},
	8: {
		type: "multipleAnswer",
		text: "What type of music you listen?",
		options: [
			"Jazz",
			"Rock",
			"Pop",
			"Indie",
			"Folk",
			"Hip Hop",
			"Blues",
			"Country",
		],
		additionalAnswers: false,
		required: false,
	},
	9: {
		type: "line",
		text: "How often you dance?",
		range: [0, 30],
		required: true,
	},
};

const allFormQuestionsByFormId = (formId) => {
	return questionInForms[formId].map(
		(questionId) => formsQuestions[questionId]
	);
};

const viewAnswersByFormId = (formId) => {
	// return JSON.stringify(answersToForms, null, 2);
	return answersToForms;
};

let questionInForms = {
	0: [0, 1, 2],
	1: [2, 3, 4],
	2: [5, 6, 7, 8, 9],
};

let answersToForms = {
	0: {
		0: {
			0: "30",
			1: "Boasting one of the biggest and baddest national parks in Serengeti and 16 national parks in total, Tanzania is the perfect place to watch the annual wildebeest migration. Watching baby elephants playing with their moms and pops in the muddy Rufiji/Tarangire River is one of the epic lifetime experiences to keep in your memories bright for decades.",
			2: ["Poland", "Germany"],
		},
		1: {
			0: "44",
			1: "Now if you have enough skills and bald courage, heli-skiing is one of the life changing experiences! Named as best for “Off-the-beaten-path powder hounds with an aversion to glamour” by Nat Geo, Girdwood has loads of incredible hills and off-pistes where you can be the first one to shake off the powder. Day trips with 16,000-18,000 vertical feet of skiing guaranteed start from $1,275 per person.",
			2: ["Germany"],
		},
		2: {
			0: "11",
			1: "Meditate with a view of gorgeous Lake Mulshi, while nourishing your body with special foods and your soul with healing practices. Yoga holidays will bring the much needed balance back into your life and allow you to discover something new about yourself. Besides, you can’t miss some of the most amazing temples in whole India – Shreemant Dagdusheth Halwai Sarvajanik Ganpati and iconic ISKCON NVCC Temple!",
			2: ["English"],
		},
	},
	1: { 2: { "What languages do you speak": "" } },
};

const api = {
	getForms() {
		fetch("/forms"); // just for informing which requests are taking place in network tab
		return new Promise((res, reject) => {
			res([...formsArray]);
		});
	},
	getFormQuestions(id) {
		fetch("/questions/" + id);
		return new Promise((res, rej) => {
			res(allFormQuestionsByFormId(id));
		});
	},

	getAnswers(id) {
		fetch("/answers/" + id);
		return new Promise((res, rej) => {
			res(viewAnswersByFormId);
		});
	},
	createForm(data) {
		fetch("/form", { method: "POST" });
		if (!data.name?.length) {
			// throw new Error('missing name')
			return Promise.reject({ error: "missing name" });
		}
		const maxSoFar = Math.max(
			...formsArray.map((f) => f.id).filter(Boolean),
			0
		);
		formsArray.push({
			...data,
			id: maxSoFar + 1,
		});
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

export default api;

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
