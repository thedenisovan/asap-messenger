import { Request, Response } from 'express';
import { prisma } from '../../db/prisma.js';

export default async function addNewContact(req: Request, res: Response) {
  const { profileId, email } = req.body;

  try {
    const newContact = await prisma.profile.findUnique({
      where: { email },
    });

    const profile = await prisma.profile.findUnique({
      where: { id: Number(profileId) },
    });

    // If user with given email does not exist
    if (!newContact || !profile) return res.sendStatus(404);

    // If user tries to add him self to contact forbid it
    if (newContact.email === profile.email)
      return res
        .status(403)
        .json({ message: 'Cant add your self to contacts' });

    // Update user who adds new contact, by adding contact to his contact list
    await prisma.user.update({
      where: { profileId: Number(profileId) },
      data: { contacts: { connect: { profileId: newContact.id } } },
    });

    // Update user db field of whom is being added in to contacts, by adding
    // person who adds him
    await prisma.user.update({
      where: { profileId: Number(newContact.id) },
      data: { contactBy: { connect: { profileId: Number(profileId) } } },
    });

    return res.sendStatus(200);
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(500).json({ errorMessage: error.message });
    else return res.status(500).json({ errorMessage: String(error) });
  }
}
