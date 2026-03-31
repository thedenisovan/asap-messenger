import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function clearChat(req: Request, res: Response) {
  const { chatId } = req.body;

  if (!chatId) return res.status(404).json({ msg: 'No chat id provided' });

  const intChatId = Number(chatId);

  if (isNaN(intChatId))
    return res
      .status(404)
      .json({ msg: 'Chat id is invalid format, expected integer' });

  try {
    await prisma.message.deleteMany({
      where: { chatId: intChatId },
    });

    return res.status(200).json({ msg: 'Chat cleared' });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
}
