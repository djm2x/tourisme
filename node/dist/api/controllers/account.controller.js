"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const user_repository_1 = require("../repository/user.repository");
const jwt_service_1 = require("../services/jwt.service");
let AccountsController = 
// @UseBefore(JwtMiddleware)
class AccountsController {
    constructor() {
        this.service = typedi_1.default.get(user_repository_1.UserRepository);
        this.jwt = typedi_1.default.get(jwt_service_1.JwtService);
    }
    login(model) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.service.findOneOrFail({ where: { email: model.email, password: model.password } });
                user.password = '';
                const token = this.jwt.createToken(user);
                return { user, token };
            }
            catch (error) {
                throw new routing_controllers_1.NotFoundError(error.message);
            }
        });
    }
    create(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.add(user);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body())
], AccountsController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/create'),
    tslib_1.__param(0, routing_controllers_1.Body())
], AccountsController.prototype, "create", null);
AccountsController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/accounts')
    // @UseBefore(JwtMiddleware)
], AccountsController);
exports.AccountsController = AccountsController;
