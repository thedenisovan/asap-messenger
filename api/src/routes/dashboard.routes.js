"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verifyToken_js_1 = require("../middleware/verifyToken.js");
var getProfileData_js_1 = require("../middleware/controllers/getProfileData.js");
var isOnlineUpdate_js_1 = require("../middleware/controllers/isOnlineUpdate.js");
var getContactList_js_1 = require("../middleware/controllers/getContactList.js");
var addNewContact_js_1 = require("../middleware/controllers/addNewContact.js");
var dashboard = (0, express_1.Router)();
// Request to return payload data
dashboard.get('/', verifyToken_js_1.default, function (req, res) {
    return res.json({ payload: req.payload });
});
dashboard.get('/:profileId/contacts', verifyToken_js_1.default, getContactList_js_1.default);
dashboard.get('/:profileId', verifyToken_js_1.default, getProfileData_js_1.default);
dashboard.put('/isOnlineUpdate', verifyToken_js_1.default, isOnlineUpdate_js_1.default);
dashboard.put('/addNewContact', verifyToken_js_1.default, addNewContact_js_1.default);
exports.default = dashboard;
