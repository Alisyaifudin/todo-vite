import React, { useState } from "react";
import Task from "./Task";
import Delete from "./Delete";

interface TodoProps {
	children: string;
	id: number;
	completed: boolean;
}

function Todo({ children, id, completed }: TodoProps) {
	const [checked, setChecked] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};
	return (
		<li className={`flex justify-between ${checked ? "opacity-30" : null}`}>
			<Task id={id} completed={completed}>
				{children}
			</Task>
			<Delete checked={checked} handleChange={handleChange} id={id} />
		</li>
	);
}

export default Todo;
