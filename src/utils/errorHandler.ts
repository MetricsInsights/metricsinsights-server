import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  console.error(error);

  return res.status(500).json({ error: 'Internal server error' });
}
