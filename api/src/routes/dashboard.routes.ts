import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import getProfileData from '../middleware/controllers/getProfileData.js';
import isOnlineUpdate from '../middleware/controllers/isOnlineUpdate.js';
import getContactList from '../middleware/controllers/getContactList.js';
import addNewContact from '../middleware/controllers/addNewContact.js';

const dashboard = Router();

// Request to return payload data
dashboard.get('/', verifyToken, (req, res) =>
  res.json({ payload: req.payload }),
);

dashboard.get('/:profileId/contacts', verifyToken, getContactList);
dashboard.get('/:profileId', verifyToken, getProfileData);

dashboard.put('/isOnlineUpdate', verifyToken, isOnlineUpdate);
dashboard.put('/addNewContact', verifyToken, addNewContact);

export default dashboard;
