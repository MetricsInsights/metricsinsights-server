import express, { Request, Response } from 'express';
import { createUser } from '../services/UserService';
import { validateUserCreation } from '../middlewares/authMiddleware';

const router = express.Router();

// Create a new user
router.post('/users', validateUserCreation, async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await createUser(name, email, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
});

export default router;
