import React, {useState} from "react";

function Setting({ todo, index, completeTodo, deleteTodo}) {
	const [ value, setValue ] = useState(todo.value);

	return (
		<div className="todo">
			<label htmlFor={todo.key+'-value'} className="setting_key">{todo.key}</label>
			<div
				style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
			>
				<input
					type="text"
					name={todo.key+'-value'}
					className="input2 input-value"
					value={value}
					onChange={e => setValue(e.target.value)}
					placeholder="value"
				/>

			</div>
				<div>
					{/*<button onClick={() => completeTodo(index)}>Complete</button>*/}
					<button onClick={() => deleteTodo(index)}>X</button>
				</div>
		</div>
	);
}

export default Setting
