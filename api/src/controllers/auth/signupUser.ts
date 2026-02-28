import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function signupUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    await prisma.profile.create({
      data: {
        username,
        email,
        password,
        lastOnline: new Date(),
        avatarUrl: '',
      },
    });

    return res.status(200).json({ message: 'profile created' });
  } catch (error) {
    return res.status(404).json({ errorMessage: error });
  }
}
