import { getUsers,getUserById,updateUserById,deleteUserById } from "../controllers/user.controller.js";
import express from "express";
import { verifyToken } from "../middleware/verifyToken,.js";

const router = express.Router();
router.get("/", getUsers)
router.get("/:id",verifyToken, getUserById);
router.put("/:id", verifyToken, updateUserById);
router.delete("/:id", verifyToken, deleteUserById);
export default router;