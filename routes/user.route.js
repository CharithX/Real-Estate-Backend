import { getUsers,getUserById,updateUserById,deleteUserById, savePost, profilePosts } from "../controllers/user.controller.js";
import express from "express";
import { verifyToken } from "../middleware/verifyToken,.js";

const router = express.Router();
router.get("/", getUsers)
// router.get("/:id",verifyToken, getUserById);
router.put("/:id", verifyToken, updateUserById);
router.delete("/:id", verifyToken, deleteUserById);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
export default router;