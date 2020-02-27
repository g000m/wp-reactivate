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
		updateSetting(newTodos); // get all fields, including value for newly added
	};

	const handleSave = () => {
		updateSetting(todos);
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

	function load_Settings(json) {
		const arr = json.value.map(e => {
			return { ...e, isCompleted: false };
		});

		return arr;
	}

	const getSetting = () => {
		// @TODO change endpoint name from 'example'

		return fetch_wp.get('example');
	};

	const service = {
		getData() {
			return Promise.resolve('{"answer":42}');
		}
	}

	const machine = {
		dispatch(actionName, ...payload) {
			const actions = this.transitions[ this.state ];
			const action = this.transitions[ this.state ][ actionName ];

			if (action) {
				console.log(`action dispatched: ${actionName}`);
				action.apply(machine, payload);
			}
		},
		changeStateTo(newState) {
			console.log(`state changed: ${newState}`);
			machine.state = newState;
		},
		state: 'idle',
		transitions: {
			'idle': {
				load: function () {
					machine.changeStateTo('fetching');
					getSetting().then(
						data => {
							try {
								machine.dispatch('success', data);
							} catch (error) {
								machine.dispatch('failure', error)
							}
						},
						error => machine.dispatch('failure', error)
					);
				}
			},
			'fetching': {
				success: function (data) {
					setTodos(load_Settings(data))
					console.log(`<strong>And the answer is ${data.answer}</strong>`);
					machine.changeStateTo('idle');
				},
				failure: function (error) {
					machine.changeStateTo('error');
				}
			},
			'error': {
				retry: function () {
					machine.changeStateTo('idle');
					machine.dispatch('click');
				}
			}
		}
	}

	useEffect(() => {
		// getSetting();
		console.log(`initial state: ${ machine.state }`);
		machine.dispatch('load');
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
				<SettingsForm addField={addField} updateSetting={handleSave}/>
			</div>}
		</div>
	);
}

export default App;
