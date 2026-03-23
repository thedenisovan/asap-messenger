import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function getChats(req: Request, res: Response) {
  const { profileId } = req.params;

  try {
    if (!profileId)
      return res.status(404).json({ message: 'Could not get request params.' });

    // Get all chats for current user
    const chats = await prisma.user.findUnique({
      where: { profileId: Number(profileId) },
      select: { chats: true },
    });

    return res.status(200).json(chats);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server/db related error ${error}` });
  }
}
