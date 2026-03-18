"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var signup_validators_js_1 = require("../validators/signup.validators.js");
var validationResult_js_1 = require("../validators/validationResult.js");
var signupUser_js_1 = require("../middleware/controllers/auth/signupUser.js");
var signupRoute = (0, express_1.Router)();
signupRoute.post('/', signup_validators_js_1.default, validationResult_js_1.default, signupUser_js_1.default);
exports.default = signupRoute;
