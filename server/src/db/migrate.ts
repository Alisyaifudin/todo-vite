import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { migrate } from "drizzle-orm/mysql2/migrator";
dotenv.config();

const HOST = process.env.DATABASE_HOST;
const USER = process.env.DATABASE_USER;
const DATABASE = process.env.DATABASE_NAME;
const PASSWORD = process.env.DATABASE_PASSWORD;
const PORT = process.env.DATABASE_PORT;

if (!HOST || !USER || !DATABASE || !PASSWORD || !PORT) {
	throw new Error("Missing database configuration");
}

if (Number.isNaN(Number(PORT))) {
	throw new Error(`Invalid database port: ${PORT}`);
}

const poolConnection = mysql.createPool({
	host: HOST,
	user: USER,
	database: DATABASE,
	password: PASSWORD,
	port: Number(PORT)
  });

  const db = drizzle(poolConnection);

async function main() {
	console.log("migration started...");
	await migrate(db, { migrationsFolder: "drizzle" });
	console.log("migration finished");
	process.exit(0);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
