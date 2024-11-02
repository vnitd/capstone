import express, { Express, json, NextFunction, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import { createServer } from "http";
import { connect } from "mongoose";
import cors from "cors";

import normalizePort from "./utils/normalizePort.js";
import { onError, onListening } from "./utils/appEvents.js";
import userRoute from "./routes/users.route.js";
import languageRoute from "./routes/languages.route.js";

dotenv.config();

var __max: number = 0;
if (process.env.DEVMODE)
	(function () {
		const originalLog = console.log;
		function span(str: string | undefined) {
			if ((str?.length || 0) > __max) {
				__max = str?.length || __max;
				return "";
			}
			var res: string = "";
			for (var i = 0; i < __max - (str?.length || __max); i++) res += " ";
			return res;
		}

		console.log = function (...args) {
			const stack = new Error().stack?.split("\n");
			const caller = stack?.[2].match(/\((.*):(\d+):(\d+)\)/);
			if (caller) {
				const file = caller[1].split("\\").pop();
				const line = caller[2];
				const tmpLine = `\x1b[1m\x1b[34m${file}:\x1b[0m${line}`;
				const sp = span(tmpLine);
				originalLog.apply(console, [`[${tmpLine}${sp}]`, ...args]);
			} else {
				originalLog.apply(console, args);
			}
		};
	})();

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
app.use(
	cors({
		origin: "*",
		methods: "*",
	})
);
app.options(
	/(.*)/,
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
app.use(`${apiPrefix}/languages`, languageRoute);

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
