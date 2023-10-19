import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.post("/signin", authController.signIn);

export default router;
