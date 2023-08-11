import express from "express";
import cors from "cors";
import "dotenv/config";

const FRONTEND_URL = process.env.FRONTEND_URL;

if (!FRONTEND_URL) {
	throw new Error("FRONTEND_URL is not set");
}

const corsOptions = {
	origin: FRONTEND_URL,
	optionsSuccessStatus: 200,
};

export const app = express();

const port = 3000;
export const BASE_URL = process.env.BASE_URL ?? "";

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get(`${BASE_URL}`, (req, res) => {
	res.send({ message: "Working!" });
});

app.get(`${BASE_URL}/hello`, (req, res) => {
	res.send({ message: "Hello World! Hey!" });
});

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
