import express from "express";
import { db } from "../db/";

const taskRoute = express.Router();

type Result<T, E = any> = {
	data: T;
	error: E;
};

type Id = {
	constructor: {
		name: "RowDataPacket";
	};
	id: number;
};

taskRoute.post("/add", async (req, res) => {
	const task: string = req.body.task;
	try {
		if (task === "") throw Error("Task cannot be empty");
		// const ids = await db.select().from(tasks).orderBy(desc(tasks.id));
		const connection = await db;
		const [ids, _0] = await connection.query<Id[]>(`SELECT id FROM tasks ORDER BY id DESC`);
		if (ids.length > 15) throw Error("Task limit reached");
		const id = ids.length > 0 ? ids[0].id + 1 : 0;
		await connection.execute("INSERT INTO `tasks` (`id`, `task`, `completed`) VALUES (?, ?, '0')", [
			id,
			task,
		]);
		return res.status(200).send({
			data: true,
			error: undefined,
		});
	} catch (e) {
		console.error(e);
		return res.status(500).send({
			data: undefined,
			error: "Internal Server Error",
		});
	}
});

type Task = {
	constructor: {
		name: "RowDataPacket";
	};
	id: number;
	task: string;
	completed: number;
};

taskRoute.get("/get", async (req, res) => {
	try {
		const connection = await db;
		const [rows, _] = await connection.query<Task[]>(`SELECT * FROM tasks ORDER BY id DESC`);
		const data = rows.map((row) => ({ ...row, completed: row.completed === 1 }));
		res.send({
			data,
			error: undefined,
		});
	} catch (e) {
		res.send({
			data: undefined,
			error: e,
		});
	}
});

type EditBody = {
	id: number;
	completed: boolean;
	deleted: boolean;
};

taskRoute.put("/edit", async (req, res) => {
	const body = req.body as EditBody[];
	try {
		const connection = await db;
		for (const task of body) {
			if (task.deleted) {
				await connection.execute("DELETE FROM `tasks` WHERE `id` = ?", [task.id]);
				continue;
			}
			await connection.execute("UPDATE `tasks` SET `completed` = ? WHERE `id` = ?", [
				task.completed,
				task.id,
			]);
		}
		return res.status(200).send({
			data: true,
			error: undefined,
		});
	} catch (e) {
		console.error(e);
		return res.status(500).send({
			data: undefined,
			error: "Internal Server Error",
		});
	}
});

export default taskRoute;
