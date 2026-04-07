import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function leaveGroup(req: Request, res: Response) {
  const { profileId, groupChatId } = req.body;

  if (!profileId || !groupChatId)
    return res
      .status(404)
      .json({ msg: 'No profileId or groupChatId provided' });

  try {
    await prisma.groupChat.update({
      where: { id: groupChatId },
      data: {
        chatters: {
          disconnect: { id: profileId },
        },
      },
    });

    return res
      .status(200)
      .json({ msg: `User with id: ${profileId} left group` });
  } catch (e) {
    return res.status(500).json({ e });
  }
}
