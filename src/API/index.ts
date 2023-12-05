import { Router } from "express";

import { router as APIRouter } from "./routes";

export const router = Router();

router.use("/api/v1/", APIRouter);
