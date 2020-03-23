"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
let LoggingMiddleware = class LoggingMiddleware {
    use(request, response, next) {
        console.log('do something...');
        next();
    }
};
LoggingMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], LoggingMiddleware);
exports.LoggingMiddleware = LoggingMiddleware;
