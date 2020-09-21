import { Router } from "express";
import { listDataset } from "./list.dataset";

export const router = Router();

router.get("", listDataset);
