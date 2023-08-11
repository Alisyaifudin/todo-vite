import express from "express";
import { db } from "../db/";
import { Task, tasks } from "../db/schema";
import { desc, eq } from "drizzle-orm";

const taskRoute = express.Router();

type Result<T, E = any> = {
	data: T;
	error: E;
};

taskRoute.post("/add", async (req, res) => {
	const task: string = req.body.task;
	try {
		if (task === "") throw Error("Task cannot be empty");
		const ids = await db.select().from(tasks).orderBy(desc(tasks.id));
		if (ids.length > 15) throw Error("Task limit reached");
		const id = ids.length > 0 ? ids[0].id + 1 : 0;

		await db.insert(tasks).values({
			id,
			task,
		});
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

taskRoute.get("/get", async (req, res) => {
	try {
		const result = await db.select().from(tasks);
		res.send({
			data: result,
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
		for (const task of body) {
			if (task.deleted) {
				await db.delete(tasks).where(eq(tasks.id, task.id));
				continue;
			}
			await db.update(tasks).set({ completed: task.completed }).where(eq(tasks.id, task.id));
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
