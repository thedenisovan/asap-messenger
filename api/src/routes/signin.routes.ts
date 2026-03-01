import { Router, Request, Response } from 'express';
import signinValidator from '../validators/signin.validator.js';
import validatorResult from '../validators/validationResult.js';

const signinRoute = Router();

signinRoute.post(
  '/',
  signinValidator,
  validatorResult,
  (req: Request, res: Response) => {
    res.json({ message: 'this is signin route' });
  },
);

export default signinRoute;
