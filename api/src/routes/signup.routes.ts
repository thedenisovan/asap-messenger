import { Router, Request, Response } from 'express';
import signupValidator from '../validators/signup.validators.js';
import validatorResult from '../validators/validationResult.js';
import signupUser from '../controllers/auth/signupUser.js';

const signupRoute = Router();

signupRoute.post('/', signupValidator, validatorResult, signupUser);

export default signupRoute;
