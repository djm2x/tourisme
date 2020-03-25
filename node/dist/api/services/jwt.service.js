"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as jwt from 'jsonwebtoken';
const config_1 = require("../config");
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtService {
    constructor() { }
    createToken(user) {
        const claims = { userId: user.id, username: user.lastname };
        const key = config_1.config.jwt.jwtSecret;
        const opt = { expiresIn: '1h' };
        return jsonwebtoken_1.sign(claims, key, opt);
    }
    verifyToken(token) {
        return jsonwebtoken_1.verify(token, config_1.config.jwt.jwtSecret);
    }
}
exports.JwtService = JwtService;
