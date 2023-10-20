import Joi from "joi";
import { validate } from "../../middlewares/validationMiddleware";

const signInSchema = {
  body: Joi.object({
    message: Joi.string().min(1),
    signature: Joi.string().min(132).max(132),
  }),
};
export const signInSchemaValidator = validate(signInSchema);
