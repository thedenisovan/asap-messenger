import { Router } from 'express';

const signupRoute = Router();

signupRoute.post('/', (req, res) =>
  res.json({ message: 'This is signup route' }),
);

export default signupRoute;
