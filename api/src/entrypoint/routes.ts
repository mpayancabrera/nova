import { Router } from "express";
import { router as datasetRouter } from "./dataset";
import { router as connectionRouter } from "./connection";

export const router = Router();

router.use("/connection", connectionRouter);
router.use("/dataset", datasetRouter);
