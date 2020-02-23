import React, {useState} from 'react';

function SettingsForm({ addTodo }) {
	const [ key, setKey ] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		if (!key) return;
		addTodo({key:key, value:''});
		setKey("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input1 input-key"
				value={key}
				onChange={e => setKey(e.target.value)}
				placeholder="option key"
			/>
			{/* submitting by return broke after adding the second field, until I added this button*/}
			{/*<button type="submit" value="Submit" style={{display:'none'}}/>*/}
		</form>
	)
}

export default SettingsForm;
