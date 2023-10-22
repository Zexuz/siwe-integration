import Joi from "joi";
import { validate } from "../../middlewares/validationMiddleware";

const signInSchema = {
  body: Joi.object({
    message: Joi.string().required().min(1),
    signature: Joi.string().required().min(132).max(132),
    address: Joi.string().required().min(42).max(42),
  }),
};

const getNonceSchema = {
  query: Joi.object({
    address: Joi.string().required().min(42).max(42),
  }),
};

export const getNonceSchemaValidator = validate(getNonceSchema);

export const signInSchemaValidator = validate(signInSchema);
