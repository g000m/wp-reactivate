import React, {useState} from 'react';

function SettingsForm({ addTodo }) {
	const [ key, setKey ] = useState("");
	const [ value, setValue ] = useState("");
	// console.log(value, setValue);

	const handleSubmit = e => {
		e.preventDefault();

		if (!value || !key) return;
		addTodo({key:key, text:value});
		setKey("");
		setValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input1 input-key"
				value={key}
				onChange={e => setKey(e.target.value)}
				placeholder="ph key"
			/>
			<input
				type="text"
				className="input2 input-value"
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder="ph val"
			/>
			{/* submitting by return broke after adding the second field, until I added this button*/}
			<button type="submit" value="Submit" style={{display:'none'}}/>
		</form>
	)
}

export default SettingsForm;
