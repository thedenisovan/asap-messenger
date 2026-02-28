import { Router, Request, Response } from 'express';
import signupValidator from '../validators/signup.validators.js';
import signupValidatorResult from '../validators/signup.validationResult.js';
import signupUser from '../controllers/auth/signupUser.js';

const signupRoute = Router();

signupRoute.post('/', signupValidator, signupValidatorResult, signupUser);

export default signupRoute;
