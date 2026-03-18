"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyToken;
var jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
function verifyToken(req, res, next) {
    // Get auth header value
    var bearerHeader = req.headers['authorization'];
    //Check if bearer exists
    if (bearerHeader != null) {
        // Extract token from header
        var bearer = bearerHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(bearer, process.env.SECRET_KEY, function (err, payload) {
            if (err || typeof payload === 'string')
                return res.sendStatus(403);
            // Assign decoded payload to payload req object
            req.payload = payload;
            next();
        });
    }
    else {
        return res
            .status(403)
            .json({ message: 'No valid jason token, failed authorization.' });
    }
}
