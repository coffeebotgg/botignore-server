import { Router, Request, Response } from "express";
import StatusCodes from "../../constants/statusCodes";
import { IGenerateResponse } from "../../interfaces/response.interface";
import generateFile from "../../functions/generateFile";
import fs from "fs";

export const router = Router();

router.get("/generate/:uid", async (req: Request, res: Response) => {
	const { uid } = req.params;

	const { code, response } = (await generateFile(uid)) as IGenerateResponse<
		200 | 404
	>;

	if (code === 200) {
		const { file } = response as any;

		const html = fs.readFileSync("./src/html/index.html", "utf-8");
		// replace pre tag content with file
		const replaced = html.replace(
			/<pre id="file"><\/pre>/g,
			`<pre id="file">${file}</pre>`
		);

		return res.status(StatusCodes.OK).send(replaced);
	} else {
		return res.status(StatusCodes.NotFound).json(response);
	}
});
