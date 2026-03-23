import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import getProfileData from '../middleware/controllers/getProfileData.js';
import isOnlineUpdate from '../middleware/controllers/isOnlineUpdate.js';
import getContactList from '../middleware/controllers/getContactList.js';
import addNewContact from '../middleware/controllers/addNewContact.js';
import updateProfileInformation from '../middleware/controllers/updateProfileInformation.js';
import profileUpdateValidator from '../validators/profileUpdate.validator.js';
import validatorResult from '../validators/validationResult.js';
import getChats from '../middleware/controllers/getChats.js';

const dashboard = Router();

// Request to return payload data
dashboard.get('/', verifyToken, (req, res) =>
  res.json({ payload: req.payload }),
);

dashboard.get('/:profileId/contacts', verifyToken, getContactList);
dashboard.get('/:profileId', verifyToken, getProfileData);
dashboard.get('/:profileId/chats', verifyToken, getChats);

dashboard.put('/isOnlineUpdate', verifyToken, isOnlineUpdate);
dashboard.put('/addNewContact', verifyToken, addNewContact);
dashboard.put(
  '/updateProfileInformation',
  profileUpdateValidator,
  validatorResult,
  verifyToken,
  updateProfileInformation,
);

export default dashboard;
