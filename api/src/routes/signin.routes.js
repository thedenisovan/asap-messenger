"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var signin_validator_js_1 = require("../validators/signin.validator.js");
var validationResult_js_1 = require("../validators/validationResult.js");
var generateJwt_js_1 = require("../middleware/controllers/auth/generateJwt.js");
var signinRoute = (0, express_1.Router)();
signinRoute.post('/', signin_validator_js_1.default, validationResult_js_1.default, generateJwt_js_1.default);
exports.default = signinRoute;
