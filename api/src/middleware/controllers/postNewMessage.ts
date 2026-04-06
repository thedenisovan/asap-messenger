import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function postNewMessage(req: Request, res: Response) {
  const { userId, groupChatId, chatId, messageText } = req.body;
  const [intUserId] = [Number(userId)];

  if (!userId) {
    return res.status(404).json({ msg: 'No user id  provided' });
  } else if (isNaN(intUserId))
    return res.status(404).json({ msg: 'Invalid user id NaN' });
  else if (messageText === '' || typeof messageText !== 'string')
    return res.status(404).json({ msg: 'No message provided' });

  try {
    const user = await prisma.user.findUnique({
      where: { profileId: intUserId },
      select: { id: true },
    });

    if (!user)
      return res
        .status(404)
        .json({ msg: 'No user found with given id profileId' });

    const message = await prisma.message.create({
      data: {
        message: messageText,
        userId: user.id,
        chatId: chatId,
        groupChatId: groupChatId,
      },
    });

    return res.status(200).json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Error while working with db, error: ${error}` });
  }
}
