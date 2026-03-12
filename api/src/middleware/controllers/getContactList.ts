import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function getContactList(req: Request, res: Response) {
  const { profileId } = req.params;

  try {
    const contacts = await prisma.user.findUnique({
      where: { profileId: Number(profileId) },
      select: {
        contacts: true,
        blocked: true,
        contactBy: true,
        blockedBy: true,
      },
    });

    if (!contacts)
      return res.status(200).json({ message: 'profile not found' });

    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
