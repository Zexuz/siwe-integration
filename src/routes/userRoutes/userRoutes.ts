import express from "express";
import * as userController from "../../controllers/userController";
import { updateUserSchemaValidator } from "./validators";

const router = express.Router();

router.get("/me", userController.meHandler);
router.post("/me", updateUserSchemaValidator, userController.updateMeHandler);

export default router;
