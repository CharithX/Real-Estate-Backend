import express from "express";
import {
  shouldBeLoggeedIn,
  shouldBeAdmin,
} from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken,.js";

const router = express.Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggeedIn);


router.get("/should-be-admin", shouldBeAdmin);

export default router;
