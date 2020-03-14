"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("./user.repository");
class UowRepository {
    constructor() {
        this.users = new user_repository_1.UserRepository();
    }
}
exports.UowRepository = UowRepository;
