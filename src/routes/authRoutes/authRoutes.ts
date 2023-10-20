import express from "express";
import * as authController from "../../controllers/authController";
import { signInSchemaValidator } from "./validators";

const router = express.Router();

router.post("/signin", signInSchemaValidator, authController.signInHandler);

export default router;
