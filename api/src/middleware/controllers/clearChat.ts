import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function clearChat(req: Request, res: Response) {
  const { chatId, groupChatId } = req.body;

  if (!chatId && !groupChatId)
    return res.status(404).json({ msg: 'No chat id provided' });

  if (isNaN(Number(chatId)) && isNaN(Number(groupChatId)))
    return res
      .status(404)
      .json({ msg: 'Both group chat id and chat id is of NaN format' });

  try {
    await prisma.message.deleteMany({
      where: { chatId, groupChatId },
    });

    return res.status(200).json({ msg: 'Chat cleared' });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
}
