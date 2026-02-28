import { body } from 'express-validator';
import { prisma } from '../db/prisma.js';

const signupValidator = [
  body('username')
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 16 })
    .withMessage('Username must be 6-16 characters long.'),
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      const profile = await prisma.profile.findUnique({
        where: { email: value },
      });

      if (profile != null) {
        throw new Error('E-mail already in use');
      }
    }),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,}$/)
    .withMessage(
      'Password must be 6+ chars, with at least one uppercase, lowercase, number and symbol.',
    ),
  body('passwordConfirmation')
    .notEmpty()
    .custom(async (value, { req }) => {
      if (value !== req.body.password)
        throw new Error('Passwords did not match.');
    }),
];

export default signupValidator;
