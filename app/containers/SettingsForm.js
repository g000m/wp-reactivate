import React, {useState} from 'react';

function SettingsForm({ addField, updateSetting }) {
	const [ key, setKey ] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		updateSetting();
	};

	const handleAdd = e => {
		e.preventDefault();

		if (!key) return;
		addField({key:key, value:''});
		setKey("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input input-key"
				value={key}
				onChange={e => setKey(e.target.value)}
				placeholder="option key"
			/>
			{/* submitting by return broke after adding the second field, until I added this button*/}
			<button type="submit" onClick={handleAdd}>+</button>
			<button type="button" onClick={handleSubmit}>Save</button>
		</form>
	)
}

export default SettingsForm;
