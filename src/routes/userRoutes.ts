import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/me", userController.me);

export default router;
