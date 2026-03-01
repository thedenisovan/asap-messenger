import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';
import bcrypt from 'bcryptjs';

export default async function signupUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const profile = await prisma.profile.create({
      data: {
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        lastOnline: new Date(),
        avatarUrl: '',
      },
    });

    await prisma.user.create({
      data: {
        profileId: profile.id,
      },
    });

    return res.status(200).json({ message: 'profile created' });
  } catch (error) {
    return res.status(404).json({ errorMessage: error });
  }
}
