import { body } from 'express-validator';
import { prisma } from '../db/prisma.js';
import bcrypt from 'bcryptjs';

const signinValidator = [
  body('email')
    .trim()
    .custom(async (value, { req }) => {
      const profile = await prisma.profile.findUnique({
        where: { email: value },
      });

      req.profile = profile;
    }),

  body('password').custom(async (value, { req }) => {
    if (!req.profile) throw new Error('User with give email does not exist.');

    const isPasswordValid = await bcrypt.compare(value, req.profile.password);
    if (!isPasswordValid) throw new Error('Invalid password.');
  }),
];

export default signinValidator;
