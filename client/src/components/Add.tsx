import React, { useContext } from "react";
import Button from "./Atom/button";
import { TagContext } from "../App";
// import { Res } from "../pages/api/task/add";

function Add() {
	const { setTag } = useContext(TagContext);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const task = form.get("add-task");
		async function fetching() {
			if (!task) return;
			const response = await fetch("/api/task/add", {
				method: "POST",
				body: task.toString(),
			});
			const data = (await response.json());
			if (data.data) setTag(Math.random().toString());
			else console.error(data.error);
		}
		fetching();
		event.currentTarget.reset();
		(event.currentTarget[0] as HTMLInputElement).focus();
	};
	return (
		<form className="flex justify-between gap-2 items-stretch" onSubmit={handleSubmit}>
			<input
				className="flex-1 px-1 outline outline-1 focus:outline-2 rounded-sm"
				maxLength={50}
				type="text"
				name="add-task"
				placeholder="Enter todo"
			/>
			<Button>Add</Button>
		</form>
	);
}

export default Add;
