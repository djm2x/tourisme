"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const jwt_service_1 = require("../services/jwt.service");
let JwtMiddleware = class JwtMiddleware {
    constructor() {
        this.jwtService = typedi_1.default.get(jwt_service_1.JwtService);
    }
    use(request, response, next) {
        const token = request.headers['authorization'];
        let jwtPayload;
        // Try to validate the token and get data
        try {
            jwtPayload = this.jwtService.verifyToken(token);
            response.locals.jwtPayload = jwtPayload;
        }
        catch (error) {
            // If token is not valid, respond with 401 (unauthorized)
            const html = `
      <div style="display: flex; justify-content: center; align-items: center;  height: 100%; width: 100vw; background-color: azure;">
        <h1>Hello brother : ${error.message}</h1>
      </div>
      `;
            return response.status(401).send(html);
        }
        next();
    }
};
JwtMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], JwtMiddleware);
exports.JwtMiddleware = JwtMiddleware;
