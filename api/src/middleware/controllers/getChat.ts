import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function getChats(req: Request, res: Response) {
  const { profileId, contactId } = req.params;

  try {
    if (!profileId || !contactId)
      return res.status(404).json({ message: 'Could not get request params.' });

    // Get users id's with given profile id's
    const usersId = await prisma.user.findMany({
      where: {
        OR: [
          { profileId: Number(profileId) },
          { profileId: Number(contactId) },
        ],
      },
      select: { id: true },
    });

    // Find chat in which there is users with profileId and contactId
    let chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { users: { some: { id: usersId[0].id } } },
          { users: { some: { id: usersId[1].id } } },
        ],
      },
      include: { messages: true },
    });

    // If chat does not exists create it
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          users: {
            connect: [{ id: usersId[0].id }, { id: usersId[1].id }],
          },
        },
        include: { messages: true, users: true }, // messages will be empty array
      });
    }

    // Returns
    return res.status(200).json(chat);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server/db related error ${error}` });
  }
}
