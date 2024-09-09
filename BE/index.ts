import express, { Express, json, NextFunction, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import { createServer } from "http";
import { connect } from "mongoose";
import cors from "cors";

import normalizePort from "./utils/normalizePort.js";
import { onError, onListening } from "./utils/appEvents.js";
import userRoute from "./routes/users.route.js";

dotenv.config();

const app: Express = express();

/**
 * Init mongoose.
 */
connect(process.env.MONGODB_URL as string)
	.then(() => {
		console.log("🚀 Connected to the server successful!");
	})
	.catch((reason) => console.log(reason));

// Khởi tạo Firebase

/**
 * Get port from .env and store in Express.
 */
const port: any = normalizePort(process.env.PORT || "8080");
app.set("port", port);

/**
 * Middleware setup.
 */
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
console.log(process.env.FE_URL);
app.use(
	cors({
		origin: "*",
		methods: "*",
	})
);
app.options(
	"*",
	cors({
		origin: "*",
		methods: "*",
	})
);

/**
 * Routes setup.
 */
const apiPrefix = process.env.API_PREFIX;
console.log(apiPrefix);
app.get("/", (_req, res) => {
	res.json({ message: "Hello world!" });
});
app.use(`${apiPrefix}/users`, userRoute);

/**
 * Handle errors.
 */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err?.stack);
	res.status(500).json({
		message: "Internal Server Error!",
		stack: err?.message,
	});
});

/**
 * Create HTTP server.
 */
var server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError(port));
server.on("listening", onListening(server));
