import express from "express";

export const logErrorMiddleware = () => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      next();
    } catch (e) {
      console.log(
        `Received error for path ${req.path} and method ${req.method}: ${e}`,
      );
      console.log(`Params: ${JSON.stringify(req.params)}`);
      console.log(`Body: ${JSON.stringify(req.body)}`);
      console.log(`Query: ${JSON.stringify(req.query)}`);
      res.status(500);
      res.json({ message: "Internal server error" });
    }
  };
};
