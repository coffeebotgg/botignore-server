import express, { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import env from "../utils/env.process";
import StatusCodes from "../constants/statusCodes";
import ApiUsageMiddleware from "../API/middleware/apiUsage";
import { router } from "../API";

export default class Server {
	private app: express.Application;
	private port: number | string;

	constructor() {
		this.app = express();
		this.port = env.port;
	}

	public start() {
		// logger.server("⏳ Starting server...");
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(ApiUsageMiddleware);

		// logger middleware
		this.app.use((req, res, next) => {
			logger.API(`${req.method} ${req.path} ${req.ip}`);
			next();
		});

		this.app.use(router);

		this.app.use(this.errorHandler);

		this.app.listen(this.port, () => {
			logger.server(`🚀 Server started on port ${this.port}`);
		});
	}

	private errorHandler(
		error: any,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		logger.error(error);

		res.status(StatusCodes.InternalServerError).send({
			message: error.message,
		});
	}
}

new Server().start();
