"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class SuperRepository {
    constructor(entity) {
        this.entity = entity;
        this.context = typeorm_1.getRepository(entity);
    }
    addList(models) {
        return this.context.createQueryBuilder().insert().values(models).execute();
    }
    queryble() {
        return this.context;
    }
    add(model) {
        return this.context.insert(model);
    }
    count() {
        return this.context.count();
    }
    findAndCount(options) {
        return this.context.findAndCount(options);
    }
    findOneOrFail(options) {
        return this.context.findOneOrFail(options);
    }
    query(req) {
        return this.context.query(req);
    }
    get(options = { order: { id: -1 } }) {
        return this.context.find(options);
    }
    findById(id, options) {
        return this.context.findOne(id, options);
    }
    update(id, model) {
        // const old = await this.context.findOneOrFail(id);
        return this.context.update(id, model);
    }
    delete(criteria) {
        return this.context.delete(criteria);
    }
}
exports.SuperRepository = SuperRepository;
