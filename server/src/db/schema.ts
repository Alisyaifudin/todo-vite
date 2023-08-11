import { InferModel } from "drizzle-orm";
import { int, mysqlTable, varchar, boolean, mysqlSchema } from "drizzle-orm/mysql-core";


export const tasks = mysqlTable("tasks", {
	id: int("id").primaryKey(),
	task: varchar("task", { length: 255 }).notNull(),
	completed: boolean("completed").default(false).notNull(),
});

export type Task = InferModel<typeof tasks, "select">;

