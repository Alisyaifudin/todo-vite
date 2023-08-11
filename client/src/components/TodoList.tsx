import React from "react";
import Button from "./Atom/button";
import Todo from "./Todo";
import Skeleton from "./Skeleton";
import useFetch from "../hooks/use-fetch";
import { TagContext } from "../App";
import { EditBody, Task } from "../types";
import { BASE_URL } from "../const";

function TodoList() {
	const { tag, setTag } = React.useContext(TagContext);
	const { data, loading, error } = useFetch<Task[]>("/task/get", tag, BASE_URL);
	const [isLoading, setIsLoading] = React.useState(false);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		if (!data) return;
		const states: EditBody[] = data.map((task) => {
			const completed = form.get(`task-${task.id}`) === "on";
			const deleted = form.get(`delete-${task.id}`) === "on";
			return { id: task.id, completed, deleted };
		});
		fetch(`${BASE_URL}/task/edit`, {
			method: "PUT",
			body: JSON.stringify(states),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.data) console.error(data.error);
				setTag(Math.random().toString());
				setIsLoading(false);
			})
			.catch((err) => console.error(err));

		setIsLoading(true);
	};
	const tasks = data || [];
	const isError = error !== null;

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
			<ul className="flex flex-col gap-1">
				{isError ? (
					<p className="text-red-500">Error</p>
				) : loading ? (
					<>
						<li>
							<Skeleton />
						</li>
						<li>
							<Skeleton />
						</li>
						<li>
							<Skeleton />
						</li>
					</>
				) : (
					tasks?.map((task) => (
						<Todo id={task.id} key={task.id} completed={task.completed}>
							{task.task}
						</Todo>
					))
				)}
			</ul>
			<Button disabled={isLoading}>Save</Button>
		</form>
	);
}

export default TodoList;
