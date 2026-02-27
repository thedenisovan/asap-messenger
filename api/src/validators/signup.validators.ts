import { query, body } from 'express-validator';

const signupValidator = [
  body('username')
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 16 })
    .withMessage('Username must be 6-16 characters long.'),
];

export default signupValidator;
