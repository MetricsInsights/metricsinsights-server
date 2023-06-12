import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Create a new user in the database.
 * @param name - User's name.
 * @param email - User's email.
 * @param password - User's password.
 * @returns The created user.
 */
export const createUser = async (name: string, email: string, password: string): Promise<any> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        updatedAt: new Date
      },
    });

    return user;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};
