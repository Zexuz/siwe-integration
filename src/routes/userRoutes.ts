import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/me", userController.me);
router.post("/me", userController.updateMe);

export default router;
