import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import getProfileData from '../middleware/controllers/getProfileData.js';
import isOnlineUpdate from '../middleware/controllers/isOnlineUpdate.js';

const userProfile = Router();

// Request to return payload data
userProfile.get('/', verifyToken, (req, res) =>
  res.json({ payload: req.payload }),
);

userProfile.get('/:profileId', verifyToken, getProfileData);
userProfile.put('/isOnlineUpdate', verifyToken, isOnlineUpdate);

export default userProfile;
