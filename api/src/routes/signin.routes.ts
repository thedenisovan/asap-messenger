import { Router } from 'express';
import signinValidator from '../validators/signin.validator.js';
import validatorResult from '../validators/validationResult.js';
import generateJwt from '../middleware/controllers/auth/generateJwt.js';

const signinRoute = Router();

signinRoute.post('/', signinValidator, validatorResult, generateJwt);

export default signinRoute;
