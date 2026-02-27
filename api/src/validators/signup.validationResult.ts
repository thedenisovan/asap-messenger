import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { error } from 'node:console';

function signupValidatorResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = validationResult(req);

  if (result.isEmpty()) next();

  return res.status(200).send({ errors: result.array() });
}

export default signupValidatorResult;
