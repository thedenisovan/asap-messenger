import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

// Listen to interval set in client to fetch this request and update is online status
export default async function isOnlineUpdate(req: Request, res: Response) {
  const { profileId, isOnline } = req.body;

  try {
    const profile = await prisma.profile.update({
      where: { id: Number(profileId) },
      data: { isOnline, lastOnline: new Date() },
    });

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
