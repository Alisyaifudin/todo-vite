import React from "react";

interface DeleteProps {
	id: number;
    checked: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Delete({ id, checked, handleChange }: DeleteProps) {
	return (
		<>
			<label className={`select-none cursor-pointer ${checked ? "paren opacity-30" : ""}`} htmlFor={`delete-${id}`}>
				🗑️
			</label>
			<input
				className="hidden"
				name={`delete-${id}`}
				id={`delete-${id}`}
				type="checkbox"
				checked={checked}
				onChange={handleChange}
			/>
		</>
	);
}

export default Delete;
