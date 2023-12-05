import StatusCodes from "../constants/statusCodes";
import RedisClient from "../Cache";
import { IGenerateResponse } from "../interfaces/response.interface";
import { IHashTableData } from "../interfaces/hashtable.interface";
import {
	IDE_Id,
	TemplateId,
	FrameworkId,
	LanguageId,
	ApplicationId,
} from "../constants/customId";
import { globSync } from "glob";
import logger from "../utils/logger";
import fs from "fs";

const root = process.cwd();

const convertToFile = (preview: IHashTableData): string => {
	let generatedFile = ``;

	// gitignore files
	const gitignoreFiles = globSync(`./src/gitignore/**/*.gitignore`);
	// console.log(gitignoreFiles);
	const selected = Object.values(preview.selections).flat();

	selected.forEach((id) => {
		gitignoreFiles.forEach((file) => {
			file = file.replace("src/gitignore/", "");
			file = file.replace(/\\/g, "/");
			if (file.includes(id)) {
				const data = fs.readFileSync(file, "utf-8");
				const gitName = file.split("/").pop();
				generatedFile += `=============================================\n# ${gitName}\n=============================================\n\n`;
				generatedFile += `${data}\n\n`;
			}
		});
	});

	return generatedFile;
};

const generateFile = async (
	uid: string
): Promise<IGenerateResponse<number>> => {
	// fetch from redis
	const redis = new RedisClient();
	await redis.connect();
	const preview = (await redis.getById(uid)) as IHashTableData;
	await redis.disconnect();

	// if not found
	if (!preview) {
		const response: IGenerateResponse<404> = {
			code: 404,
			response: {
				code: StatusCodes.NotFound,
				message: "Preview not found",
			},
		};
		return response;
	}

	const file = convertToFile(preview);

	// if found
	const response: IGenerateResponse<200> = {
		code: 200,
		response: {
			code: StatusCodes.OK,
			file: file,
		},
	};
	return response;
};

export default generateFile;
