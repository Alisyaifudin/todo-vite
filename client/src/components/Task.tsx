import React, { useState } from "react";

interface TaskProps {
	children: string;
	id: number;
	completed: boolean;
}

function Task({ children, id, completed }: TaskProps) {
	const [checked, setChecked] = useState(completed);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};
	return (
		<>
			<label className={checked ? "line-through" : ""} htmlFor={`task-${id}`}>
				{children}
			</label>
            <div className="flex-1"/>
			<input
				className="hidden"
				name={`task-${id}`}
				id={`task-${id}`}
				type="checkbox"
				checked={checked}
				onChange={handleChange}
			/>
		</>
	);
}

export default Task;
