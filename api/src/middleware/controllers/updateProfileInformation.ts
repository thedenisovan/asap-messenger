import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';
import bcrypt from 'bcryptjs';

export default async function updateProfileInformation(
  req: Request,
  res: Response,
) {
  const { email, username, newPassword, currentPassword } = req.body;

  try {
    const profile = await prisma.profile.findUnique({
      where: { email },
    });

    if (!profile) return res.sendStatus(404);

    // If user enters wrong current password don't update profile
    const passCompareResult = await bcrypt.compare(
      currentPassword,
      profile?.password,
    );

    // If pass confirm fails
    if (!passCompareResult)
      return res.status(200).json({ message: 'Wrong current password' });

    // Else update user profile with new data
    await prisma.profile.update({
      where: { email },
      data: { username, password: await bcrypt.hash(newPassword, 10) },
    });

    return res.status(200).json({ message: 'Profile updated' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
