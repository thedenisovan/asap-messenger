import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  //Check if bearer exists
  if (bearerHeader != null) {
    // Extract token from header
    const bearer = bearerHeader.split(' ')[1];

    jwt.verify(bearer, process.env.SECRET_KEY!, (err, payload) => {
      if (err || typeof payload === 'string') return res.sendStatus(403);

      // Assign decoded payload to payload req object
      req.payload = payload as MyJwtPayload;

      next();
    });
  } else {
    return res
      .status(403)
      .json({ message: 'No valid jason token, failed authorization.' });
  }
}
