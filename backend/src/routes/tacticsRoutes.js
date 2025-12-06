import { Router } from "express";
import {
  getTactics,
  getCurrentTactic,
  newTactic,
  updateTactic,
  deleteCurrentTactic,
} from "../controllers/tacticsControllers.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getTactics);
router.get("/:id", auth, getCurrentTactic);
router.post("/", auth, newTactic);
router.put("/:id", auth, updateTactic);
router.delete("/:id", auth, deleteCurrentTactic);

export default router;
