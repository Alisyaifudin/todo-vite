import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

const HOST = process.env.DATABASE_HOST;
const USER = process.env.DATABASE_USER;
const DATABASE = process.env.DATABASE_NAME;
const PASSWORD = process.env.DATABASE_PASSWORD;
const PORT = process.env.DATABASE_PORT;

if (!HOST || !USER || !DATABASE || !PASSWORD || !PORT) {
	const config = {
		host: HOST,
		user: USER,
		database: DATABASE,
		password: PASSWORD,
		port: PORT,
	};
	throw new Error(`Missing database configuration:\n ${config}`);
}

if (Number.isNaN(Number(PORT))) {
	throw new Error(`Invalid database port: ${PORT}`);
}

const connection = mysql.createConnection({
	host: HOST,
	user: USER,
	database: DATABASE,
	password: PASSWORD,
	port: Number(PORT),
});

export const db = drizzle(connection);