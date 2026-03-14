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

    const contactsProfiles = await prisma.profile.findMany({
      where: {
        id: {
          in: contacts?.contacts.map((user) => user.profileId),
        },
      },
    });

    if (!contacts || !contactsProfiles)
      return res.status(200).json({ message: 'profile not found' });

    return res.status(200).json({ contactsProfiles });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
