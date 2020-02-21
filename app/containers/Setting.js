import React from "react";

function Setting({ todo, index, completeTodo, deleteTodo}) {
	return (
		<div className="todo">
			<div className="setting_key">{todo.key}</div>
			<div
				style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
			>
				{todo.text}

			</div>
				<div>
					<button onClick={() => completeTodo(index)}>Complete</button>
					<button onClick={() => deleteTodo(index)}>X</button>
				</div>
		</div>
	);
}

export default Setting
