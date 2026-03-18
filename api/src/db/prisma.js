"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
var client_js_1 = require("../../prisma/generated/prisma/client.js");
var adapter_neon_1 = require("@prisma/adapter-neon");
var adapter = new adapter_neon_1.PrismaNeon({
    connectionString: process.env.DATABASE_URL,
});
exports.prisma = new client_js_1.PrismaClient({ adapter: adapter });
