import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import StatusCodes from "../../constants/statusCodes";
import env from "../../utils/env.process";

export default function (req: Request, res: Response, next: NextFunction) {
	if (req.path.includes("/docs")) return next();

	// No API Key provided
	// if (
	// 	!req.headers.authorization ||
	// 	req.headers.authorization !== env.apiKey
	// ) {
	// 	logger.warn("Unauthorized API usage");
	// 	return res.status(StatusCodes.Unauthorized).send("Unauthorized");
	// }

	next();
}
