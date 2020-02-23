import React, {useEffect, useState} from 'react';
import './App.css';
import SettingsForm from "./SettingsForm";
import Setting from "./Setting";

import fetchWP from "../utils/fetchWP";


function App(wpObject) {

	const [ todos, setTodos ] = useState([]);
	const [ nonce, setNonce ] = useState(wpObject.wpObject.api_nonce);
	const [ example, setExample ] = useState({});
	let fetch_wp;

	useEffect(() => {
		fetch_wp = new fetchWP({
			restURL: wpObject.wpObject.api_url,
			restNonce: wpObject.wpObject.api_nonce,
		});
	});

	const addTodo = text => {
		text.isCompleted = false;
		const newTodos = [ ...todos,  text  ];

		console.log("newTodos", newTodos);

		setTodos(newTodos);
		updateSetting(newTodos);
	};

	const postPost = async (text) => {
		fetch('https://pagediff.lan/wp-json/wp/v2/posts', {
				method:
					"POST",
				headers: {
					'Content-Type': 'application/json',
					'accept': 'application/json',
					'X-WP-Nonce': nonce,
				},
				body: JSON.stringify({
					title: text.key,
					content: text.value,
					status: 'publish'
				})
			}
		).then(function (response) {
			return response.json();
		}).then(function (post) {
			console.log(post);
		});
	};

	const updateSetting = (todos) => {
		console.log('updateSettings', todos);
		fetch_wp.post( 'example', { exampleSetting: todos } )
			.then(
				(json) => processOkResponse(json, 'saved'),
				(err) => console.log('error', err)
			);
	};

	const processOkResponse = (json, action) => {
		if (json.success) {
			// @TODO show indication on page
			console.log('saved successfully');
		} else {
			console.log(`Setting was not ${action}.`, json);
		}
	};

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

	const getSetting = () => {
		fetch_wp.get('example')
			.then(json => {
					const arr = json.value.map(e => {
						let newVar = { key:e.key, value: e.value, isCompleted: false };
						return newVar
					});

					setTodos(arr);
				},
				(err) => console.log('error', err)
			);
	};

	useEffect(() => {
		getSetting();
	}, []);

	return (
		<div className="app">
			{<div className="todo-list">
				{todos.map((todo, index) => (
					<Setting
						key={index}
						index={index}
						todo={todo}
						completeTodo={completeTodo}
						deleteTodo={deleteTodo}
					/>
				))}
				<SettingsForm addTodo={addTodo}/>
			</div>}
		</div>
	);
}

export default App;
