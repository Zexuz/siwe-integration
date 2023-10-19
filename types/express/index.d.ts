declare namespace Express {
  interface Request {
    userId?: string;
    getUserIdOrFail(): string;
  }
}
