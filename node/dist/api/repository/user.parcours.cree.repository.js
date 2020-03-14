"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const super_repository_1 = require("./super.repository");
const models_1 = require("../model/models");
class UserParcoursCreeRepository extends super_repository_1.SuperRepository {
    constructor() {
        super(models_1.UserParcoursCree);
    }
}
exports.UserParcoursCreeRepository = UserParcoursCreeRepository;
