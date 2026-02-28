import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

function signupValidatorResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = validationResult(req);

  if (result.isEmpty()) return next();

  return res.status(200).send({ errors: result.array() });
}

export default signupValidatorResult;
