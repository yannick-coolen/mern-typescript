import { NextFunction, Request, Response } from 'express';

/**
 * This function will be executed when the response meet an error.
 * @param err The message that will be returned after this function has been executed.
 * @param res Will send back a response status, along with the stack IF the status will be an error and the NODE_ENV is not set as production.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
