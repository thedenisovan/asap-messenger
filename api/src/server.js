"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config.js");
var app_js_1 = require("./app.js");
var PORT = process.env.PORT || 5000;
app_js_1.default.listen(PORT, function (err) {
    if (err)
        throw err;
    console.log("Listening on port ".concat(PORT));
});
