import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';

const chatPage = Router();

// Request to get user data
chatPage.get('/', verifyToken, (req, res) =>
  res.json({ payload: req.payload }),
);

export default chatPage;
