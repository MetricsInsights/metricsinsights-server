import { Request, Response } from 'express';
import { createUser } from '../services/UserService';

/**
 * Create a new user.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @returns The created user.
 */
export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const user = await createUser(name, email, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
};
