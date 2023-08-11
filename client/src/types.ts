export type Result<T, E = any> = {
	data?: T;
	error?: E;
};

export type Task = {
	id: number;
	task: string;
	completed: boolean;
}

export type EditBody = {
	id: number;
	completed: boolean;
	deleted: boolean;
};