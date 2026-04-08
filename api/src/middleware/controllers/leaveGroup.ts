import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function leaveGroup(req: Request, res: Response) {
  const { profileId, groupChatId, chatId, directContactId } = req.body;

  if (!profileId)
    return res
      .status(404)
      .json({ msg: 'No profileId or groupChatId provided' });

  try {
    // Leave group chat
    if (groupChatId && !chatId) {
      await prisma.groupChat.update({
        where: { id: groupChatId },
        data: {
          chatters: {
            disconnect: { id: profileId },
          },
        },
      });
      // Leave direct chat
    } else if (chatId && !groupChatId) {
      // Remove user from chat relation
      await prisma.chat.update({
        where: { id: chatId },
        data: {
          users: {
            disconnect: { profileId },
          },
        },
      });

      // Disconnect users contact from user relation table
      await prisma.user.update({
        where: { profileId },
        data: {
          contacts: { disconnect: { profileId: directContactId } },
        },
      });
    }

    return res
      .status(200)
      .json({ msg: `User with id: ${profileId} left chat` });
  } catch (e) {
    return res.status(500).json({ e });
  }
}
