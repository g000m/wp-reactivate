import React, {useEffect, useState} from 'react';
import './App.css';
import TodoForm from "./TodoForm";
import Todo from "./Todo";


function App(wpObject) {

	const [ todos, setTodos ] = useState([]);
	const [ nonce, setNonce ] = useState(wpObject.wpObject.api_nonce);

	const addTodo = text => {
		console.log("new: " + text);
		// POST new item here
		postPost(text);
		const newTodos = [ ...todos, { text } ];

		setTodos(newTodos);
	};

	const postPost = async (text) => {
		fetch('https://pagediff.lan/wp-json/wp/v2/posts', {
				method:
					"POST",
				headers:
					{
						'Content-Type': 'application/json',
						'accept': 'application/json',
						'X-WP-Nonce': nonce,
					}
				,
				body: JSON.stringify({
					title: text,
					content: 'teabate',
					status: 'publish'
				})
			}
		)

			.then(function (response) {
				return response.json();
			}).then(function (post) {
			console.log(post);
		});
	}

	const completeTodo = index => {
		const newTodos = [ ...todos ];

		newTodos[ index ].isCompleted = (!newTodos[ index ].isCompleted);
		setTodos(newTodos);
	};

	const deleteTodo = index => {
		const newTodos = [ ...todos ];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	const fetchStuff = async () => {
		await fetch(`https://pagediff.lan/wp-json/wp/v2/posts`)
			.then(response => response.json())
			.then(myJSON => {  // Logic goes here
				const arr = myJSON.map(e => {
					return { text: e.title.rendered, isCompleted: false }
				});

				setTodos(arr);
			});
	}

	useEffect(() => {
		fetchStuff();
	}, []);

	return (
		<div className="app">
			{<div className="todo-list">
				{todos.map((todo, index) => (
					<Todo
						key={index}
						index={index}
						todo={todo}
						completeTodo={completeTodo}
						deleteTodo={deleteTodo}
					/>
				))}
				<TodoForm addTodo={addTodo}/>
			</div>}
		</div>
	);
}

export default App;
