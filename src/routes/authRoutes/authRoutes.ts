import express from "express";
import * as authController from "../../controllers/authController";
import { getNonceSchemaValidator, signInSchemaValidator } from "./validators";

const router = express.Router();

router.post("/signin", signInSchemaValidator, authController.signInHandler);
router.get("/nonce", getNonceSchemaValidator, authController.nonceHandler);

export default router;
