import express, { Request, Response } from 'express';
import { authenticateUser } from '../services/AuthService';

const router = express.Router();

// User authentication
router.post('/auth', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authenticateUser(email, password);

    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
});

export default router;
