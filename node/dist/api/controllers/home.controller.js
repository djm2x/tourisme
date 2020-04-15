"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
let HomeController = 
// @UseBefore(JwtMiddleware)
class HomeController {
    list() {
        return {
            bnr1: "2464068867179663_2495149740738242",
            bnr2: "2464068867179663_2495149934071556",
            inter1: "2464068867179663_2495150220738194",
            inter2: "2464068867179663_2495150424071507"
        };
    }
    listPromise() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const UnitAds = {
                bnr1: "2464068867179663_2495149740738242",
                bnr2: "2464068867179663_2495149934071556",
                inter1: "2464068867179663_2495150220738194",
                inter2: "2464068867179663_2495150424071507"
            };
            return yield new Promise((res, rej) => res(UnitAds));
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/list')
], HomeController.prototype, "list", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/listPromise')
], HomeController.prototype, "listPromise", null);
HomeController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/home')
    // @UseBefore(JwtMiddleware)
], HomeController);
exports.HomeController = HomeController;
