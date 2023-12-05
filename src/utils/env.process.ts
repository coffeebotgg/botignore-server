import { config } from "dotenv";
config();

export default {
	port: process.env.PORT || 3000,
	prod: process.env.NODE_ENV === "production" ? true : false,
	host: process.env.HOST
		? `${process.env.HOST}:${process.env.PORT || 3000}`
		: "http://localhost:3000",
	redis: {
		port: Number(process.env.REDIS_PORT) || 6379,
		host: process.env.REDIS_HOST || "localhost",
		password: process.env.REDIS_PASS || "",
		username: process.env.REDIS_USER || "",
	},
};
