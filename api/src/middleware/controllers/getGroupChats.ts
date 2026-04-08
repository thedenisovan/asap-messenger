import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function getGroupChat(req: Request, res: Response) {
  const { profileId } = req.params;

  if (!profileId)
    return res.status(404).json({ msg: 'Po profile id provided ir params' });

  try {
    const groupChats = await prisma.groupChat.findMany({
      where: {
        chatters: { some: { id: +profileId } },
      },
      include: { chatters: { include: { profile: true } }, admin: true },
    });

    return res.status(200).json(groupChats);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
