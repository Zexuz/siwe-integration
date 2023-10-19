import express from "express";
import * as userController from "../../controllers/userController";
import { updateUserSchemaValidator } from "./validators";

const router = express.Router();

router.get("/me", userController.me);
router.post("/me", updateUserSchemaValidator, userController.updateMe);

export default router;
