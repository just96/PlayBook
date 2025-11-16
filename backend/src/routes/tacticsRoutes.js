import { Router } from "express";
import {
  getTactics,
  getCurrentTactic,
  newTactic,
  updateTactic,
  deleteCurrentTactic,
} from "../controllers/tacticsControllers.js";

const router = Router();

router.get("/", getTactics);
router.get("/:id", getCurrentTactic);
router.post("/", newTactic);
router.put("/:id", updateTactic);
router.delete("/:id", deleteCurrentTactic);
// seed via Postman
// router.post("/bulk", createManyTactics);

export default router;
