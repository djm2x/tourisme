"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const models_1 = require("../model/models");
const typeorm_1 = require("typeorm");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
let ParcoursController = 
// @UseBefore(JwtMiddleware)
class ParcoursController {
    constructor() {
        this.service = typeorm_1.getRepository(models_1.Parcours);
    }
    getAll(startIndex, pageSize, filter, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const opts = {
                skip: startIndex,
                take: pageSize,
                relations: ['user'],
                where: { titre: typeorm_1.Like(`%${filter === '*' ? '' : filter}%`) },
                order: { id: 'DESC' }
            };
            return yield this.service.findAndCount(opts);
        });
    }
    // @UseBefore(JwtMiddleware)
    // @Get('/getFollowed/:startIndex/:pageSize/:idUser/:filter')
    // async getFollowed(@Param('startIndex') startIndex, @Param('pageSize') 
    // pageSize, @Param('idUser') idUser, @Param('filter') filter: string, @Res() response: Response) {
    //   const userId = response.locals.jwtPayload.userId as number;
    //   let opts = {
    //     skip: startIndex,
    //     take: pageSize,
    //     relations: ['user'],
    //     join: { alias: 'parcours', innerJoin: { v: 'parcours.userParcoursVisites' } },
    //     where: qb => {
    //       qb.where({  titre: Like(`%${filter === '*' ? '' : filter}%`)})
    //         .andWhere('v.userId = :userId', { userId: idUser });
    //     }
    //   }
    //   return await this.service.findAndCount(opts);
    // }
    getCreated(startIndex, pageSize, idUser, filter, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userId = response.locals.jwtPayload.userId;
            let opts = {
                skip: startIndex,
                take: pageSize,
                relations: ['user'],
                where: { userId: idUser, titre: typeorm_1.Like(`%${filter === '*' ? '' : filter}%`) },
            };
            return yield this.service.findAndCount(opts);
        });
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
    get(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userId = response.locals.jwtPayload.userId;
            const p2 = yield this.service.createQueryBuilder('p')
                .leftJoinAndSelect("p.user", "user")
                .leftJoinAndSelect("p.etaps", "etap")
                .leftJoinAndSelect("etap.quizzs", "quizz")
                .leftJoinAndSelect("quizz.reponses", "reponse", "reponse.userId = :userId", { userId: userId })
                .where("p.id = :id", { id: id })
                // .andWhere("reponse.userId = :userId", { userId: 100 })
                .getOne();
            return p2;
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/getAll/:startIndex/:pageSize/:filter?'),
    tslib_1.__param(0, routing_controllers_1.Param('startIndex')), tslib_1.__param(1, routing_controllers_1.Param('pageSize')), tslib_1.__param(2, routing_controllers_1.Param('filter')), tslib_1.__param(3, routing_controllers_1.Res())
], ParcoursController.prototype, "getAll", null);
tslib_1.__decorate([
    routing_controllers_1.UseBefore(jwt_middleware_1.JwtMiddleware),
    routing_controllers_1.Get('/getCreated/:startIndex/:pageSize/:idUser/:filter'),
    tslib_1.__param(0, routing_controllers_1.Param('startIndex')), tslib_1.__param(1, routing_controllers_1.Param('pageSize')),
    tslib_1.__param(2, routing_controllers_1.Param('idUser')), tslib_1.__param(3, routing_controllers_1.Param('filter')), tslib_1.__param(4, routing_controllers_1.Res())
], ParcoursController.prototype, "getCreated", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/post'),
    tslib_1.__param(0, routing_controllers_1.Body())
], ParcoursController.prototype, "post", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/put/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body())
], ParcoursController.prototype, "put", null);
tslib_1.__decorate([
    routing_controllers_1.UseBefore(jwt_middleware_1.JwtMiddleware),
    routing_controllers_1.Get('/get/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res())
], ParcoursController.prototype, "get", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id'))
], ParcoursController.prototype, "delete", null);
ParcoursController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/parcours')
    // @UseBefore(JwtMiddleware)
], ParcoursController);
exports.ParcoursController = ParcoursController;
