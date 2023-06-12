import { Request, Response } from 'express';
import { authenticateUser } from '../services/AuthService';

/**
 * Authenticate a user.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @returns The authentication token.
 */
export const authenticateUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await authenticateUser(email, password);

    if (!token) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};
