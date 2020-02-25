import React, {useEffect, useState} from 'react';
import './App.css';
import SettingsForm from "./SettingsForm";
import Setting from "./Setting";

import fetchWP from "../utils/fetchWP";


function App(wpObject) {

	const [ todos, setTodos ] = useState([]);
	let fetch_wp;
	fetch_wp = new fetchWP({
		restURL: wpObject.wpObject.api_url,
		restNonce: wpObject.wpObject.api_nonce,
	});

	const addField = text => {
		text.isCompleted = false;
		const newTodos = [ ...todos, text ];

		setTodos(newTodos);
		updateSetting(newTodos);
	};

	const updateField = (key, value) => {

		const updated = todos.map((item)=>{
			item.value = (item.key === key) ? value : item.value;
			return item;
		}, {...key, ...value});

		setTodos(updated);
	};

	// save to WP
	const updateSetting = (newTodos) => {
		fetch_wp.post('example', { exampleSetting: newTodos }) //@TODO who doesn't todos work here?
			.then(
				(json) => {
					setTodos(json.value)
					processOkResponse(json, 'saved');
				},
				(err) => console.log('error', err)
			);
	};

	const processOkResponse = (json, action) => {
		if (json.success) {
			// @TODO show indication on page
			console.log(`Setting was ${action}`);
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
		// @TODO change endpoint
		fetch_wp.get('example')
			.then(json => {
					const arr = json.value.map(e => {
						return { ...e, isCompleted: false };
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
						updateField={updateField}
					/>
				))}
				<SettingsForm addField={addField} updateSetting={updateSetting}/>
			</div>}
		</div>
	);
}

export default App;
