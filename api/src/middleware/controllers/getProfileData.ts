import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function getProfileData(req: Request, res: Response) {
  const { profileId } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: { id: Number(profileId) },
    });

    if (!profile) return res.status(200).json({ message: 'profile not found' });

    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
