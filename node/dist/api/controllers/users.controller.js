"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const models_1 = require("../model/models");
const typeorm_1 = require("typeorm");
let UserController = 
// @UseBefore(MyMiddleware)
class UserController {
    constructor() {
        this.service = typeorm_1.getRepository(models_1.User);
    }
    getAll(startIndex, pageSize, sortBy, sortDir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const opts = {
                skip: startIndex,
                take: pageSize,
                order: { [sortBy]: sortDir.toUpperCase() }
            };
            return yield this.service.findAndCount(opts);
        });
    }
    // @Get()
    // async getAll() {
    //   return await this.service.get();
    // }
    post(model) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.save(model);
        });
    }
    put(id, model) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.update(id, model);
        });
    }
    get(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.findOne(id);
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir'),
    tslib_1.__param(0, routing_controllers_1.Param('startIndex')), tslib_1.__param(1, routing_controllers_1.Param('pageSize')), tslib_1.__param(2, routing_controllers_1.Param('sortBy')), tslib_1.__param(3, routing_controllers_1.Param('sortDir'))
], UserController.prototype, "getAll", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/post'),
    tslib_1.__param(0, routing_controllers_1.Body())
], UserController.prototype, "post", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/put/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body())
], UserController.prototype, "put", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id'))
], UserController.prototype, "get", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id'))
], UserController.prototype, "delete", null);
UserController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/users')
    // @UseBefore(MyMiddleware)
], UserController);
exports.UserController = UserController;
