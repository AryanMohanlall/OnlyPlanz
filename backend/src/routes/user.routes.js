import { Router } from "express";
import { createUser, getUserById, getAllUsers } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", createUser);

router.get("/:id", authMiddleware, getUserById);
router.get("/", authMiddleware, getAllUsers);

export default router;
