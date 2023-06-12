import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || '';

/**
 * Authenticate a user based on the provided email and password.
 * @param email - User's email.
 * @param password - User's password.
 * @returns The authentication token.
 */
export const authenticateUser = async (email: string, password: string): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null; // User not found
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null; // Invalid password
  }

  const token = jwt.sign({ userId: user.user_id }, jwtSecret, { expiresIn: '1h' });

  return token;
};
