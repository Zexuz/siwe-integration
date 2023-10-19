import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type ValidationSchema = {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
};

export const validate = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params } = schema;

    if (body) {
      const { error } = body.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
    }

    if (query) {
      const { error } = query.validate(req.query);
      if (error) return res.status(400).send(error.details[0].message);
    }

    if (params) {
      const { error } = params.validate(req.params);
      if (error) return res.status(400).send(error.details[0].message);
    }

    next();
  };
};
