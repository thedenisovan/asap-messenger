"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
function validatorResult(req, res, next) {
    var result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty())
        return next();
    return res.status(200).json({ errors: result.array() });
}
exports.default = validatorResult;
