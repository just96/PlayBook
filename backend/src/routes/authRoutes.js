import { Router } from "express";
import { register, login, getAllUsers, deleteUser } from "../controllers/authController.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);

export default router;
