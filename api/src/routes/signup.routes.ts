import { Router, Request, Response } from 'express';
import signupValidator from '../validators/signup.validators.js';
import signupValidatorResult from '../validators/signup.validationResult.js';

const signupRoute = Router();

signupRoute.post(
  '/',
  signupValidator,
  signupValidatorResult,
  (req: Request, res: Response) =>
    res.json({ message: 'This is signup route' }),
);

export default signupRoute;
