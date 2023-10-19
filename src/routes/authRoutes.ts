import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.post("/signin", authController.signIn);
router.get("/nonce", authController.nonce);

export default router;
