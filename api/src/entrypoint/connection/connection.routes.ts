import { Router } from "express";
import {
  startConnection,
  queryConnection,
  checkConnection,
  listConnection,
} from "./connection.controllers";

export const router = Router();

router.post("/:id/query", queryConnection);
router.get("/:id", checkConnection);
router.get("", listConnection);
router.post("", startConnection);
