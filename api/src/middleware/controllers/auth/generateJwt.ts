import { Request, Response } from 'express';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

export default async function generateJwt(req: Request, res: Response) {
  // Extract profile object from previous mw (signinValidator)
  const profile = req.profile;

  // If no profile exit with status 500
  if (!profile)
    return res.status(500).json({
      errorMessage: 'Could not extract user profile from request object.',
    });

  try {
    // Generate jason web token and send it to client
    jwt.sign(
      { profileId: profile.id },
      process.env.SECRET_KEY!,
      { expiresIn: '3d' },
      (err, token) => {
        if (err) return res.status(500).json({ errorMessage: String(err) });

        return res.json({ token });
      },
    );
  } catch (err) {
    return res.status(500).json({ errMessage: String(err) });
  }
}
