import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function getChat(req: Request, res: Response) {
  const { profileId, contactId } = req.body;

  try {
    if (!profileId || !contactId)
      return res
        .status(404)
        .json({ message: 'Could not get request body parameters.' });

    const [intProfileId, intContactId] = [Number(profileId), Number(contactId)];

    if (isNaN(intProfileId) || isNaN(intContactId))
      return res.status(400).json({ message: 'Invalid ID(s)' });

    // Find chat in which there is users with profileId and contactId
    let chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { users: { some: { profileId: intProfileId } } },
          { users: { some: { profileId: intContactId } } },
        ],
      },
      include: { messages: true, users: true },
    });

    // If chat does not exists create it
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          users: {
            connect: [{ profileId: intProfileId }, { profileId: intContactId }],
          },
        },
        include: { messages: true, users: true }, // messages will be empty array
      });
    }

    return res.status(200).json(chat);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server/db related error ${error}` });
  }
}
