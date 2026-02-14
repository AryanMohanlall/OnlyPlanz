import { Router } from "express";
import { createUser, getUserById, getAllUsers, loginUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/:id", authMiddleware, getUserById);
router.get("/", authMiddleware, getAllUsers);

export default router;
