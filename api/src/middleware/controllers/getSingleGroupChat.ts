import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function getSingleGroupChat(req: Request, res: Response) {
  const { chatId } = req.params;

  if (!chatId)
    return res.status(404).json({ msg: 'No group chat id provided' });

  const intChatId = Number(chatId);

  if (isNaN(intChatId))
    return res.status(404).json({ msg: 'Group chat id must be integer' });

  try {
    const chat = await prisma.groupChat.findUnique({
      where: { id: intChatId },
      include: { chatters: true, messages: true, admin: true },
    });

    return res.status(200).json(chat);
  } catch (e) {
    return res.status(500).json({ msg: `Internal server error ${e}` });
  }
}
