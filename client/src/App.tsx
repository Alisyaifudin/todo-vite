// import { BASE_URL } from "./const";
import Add from "./components/Add";
import TodoList from "./components/TodoList";
import { createContext, useState } from "react";

export const TagContext = createContext({
	tag: "haha",
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setTag: (_value: string) => {},
});

const TagProvider = TagContext.Provider;

const App = () => {
	const [tag, setTag] = useState("haha");

	return (
		<main className="mx-auto w-full max-w-lg p-5">
			<section className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold text-center">Todo App</h1>
				<TagProvider value={{ tag, setTag }}>
					<Add />
					<TodoList />
				</TagProvider>
			</section>
		</main>
	);
};

export default App;
