"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const models_1 = require("../model/models");
const typeorm_1 = require("typeorm");
let ReponsesController = 
// @UseBefore(JwtMiddleware)
class ReponsesController {
    constructor() {
        this.service = typeorm_1.getRepository(models_1.Reponse);
    }
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
    routing_controllers_1.Post('/post'),
    tslib_1.__param(0, routing_controllers_1.Body())
], ReponsesController.prototype, "post", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/put/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body())
], ReponsesController.prototype, "put", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id'))
], ReponsesController.prototype, "get", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id'))
], ReponsesController.prototype, "delete", null);
ReponsesController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/reponses')
    // @UseBefore(JwtMiddleware)
], ReponsesController);
exports.ReponsesController = ReponsesController;
