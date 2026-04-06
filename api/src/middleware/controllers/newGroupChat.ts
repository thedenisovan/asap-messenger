import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function newGroupChat(req: Request, res: Response) {
  const { members, chatName, adminId } = req.body;

  const intAdminId = Number(adminId);
  const intMembers = [...members, adminId];

  if (!intMembers || !chatName || !intAdminId) {
    return res
      .status(404)
      .json({ msg: 'No members, chat name or adminId provided' });
  }

  try {
    const groupChat = await prisma.groupChat.create({
      data: {
        chatName,
        admin: {
          connect: [{ id: intAdminId }],
        },
        // Cast member string id in to numbers
        chatters: {
          connect: intMembers.map((id: number) => ({ id })),
        },
      },
      include: { chatters: true, messages: true, admin: true },
    });

    return res.status(200).json(groupChat);
  } catch (e) {
    return res.status(500).json({ msg: `Error message ${e}` });
  }
}
