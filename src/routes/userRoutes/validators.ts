import Joi from "joi";
import { validate } from "../../middlewares/validationMiddleware";

const updateUserSchema = {
  body: Joi.object({
    username: Joi.string().min(1).max(42),
    bio: Joi.string().max(500),
  }),
};
export const updateUserSchemaValidator = validate(updateUserSchema);
