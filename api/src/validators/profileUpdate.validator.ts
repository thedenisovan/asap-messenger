import { body } from 'express-validator';
import { prisma } from '../db/prisma.js';

const profileUpdateValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.')
    .bail()
    .isLength({ min: 6, max: 16 })
    .withMessage('Username must be 6-16 characters long.'),

  body('newPassword')
    .notEmpty()
    .isLength({ min: 6 })
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,}$/)
    .withMessage(
      'Password must be 6+ chars, with at least one uppercase, lowercase, number and symbol.',
    ),
];

export default profileUpdateValidator;
