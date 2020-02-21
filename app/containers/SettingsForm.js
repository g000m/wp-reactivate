import React, {useState, Component} from 'react';

function SettingsForm({ addTodo }) {
	const [ value, setValue ] = useState("");
	// console.log(value, setValue);

	const handleSubmit = e => {
		e.preventDefault();

		if (!value) return;
		addTodo(value);
		setValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text"
				   className="input"
				   value={value}
				   onChange={e => setValue(e.target.value)}
				   placeholder="ph val"
			/>
		</form>
	)
}

export default SettingsForm;
