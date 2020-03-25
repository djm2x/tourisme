"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const models_1 = require("../model/models");
const typeorm_1 = require("typeorm");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
let UserParcoursVisitesController = class UserParcoursVisitesController {
    constructor() {
        this.service = typeorm_1.getRepository(models_1.UserParcoursVisite);
    }
    getFollowed(startIndex, pageSize, idUser, filter, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userId = response.locals.jwtPayload.userId;
            // let opts = {
            //   skip: startIndex,
            //   take: pageSize,
            //   relations: ['user'],
            //   join: { alias: 'parcours', innerJoin: { v: 'parcours.userParcoursVisites' } },
            //   where: qb => {
            //     qb.where({ titre: Like(`%${filter === '*' ? '' : filter}%`) })
            //       .andWhere('v.userId = :userId', { userId: idUser });
            //   }
            // }
            const p2 = yield this.service.createQueryBuilder('p')
                .where("p.userId = :id", { id: idUser })
                .leftJoinAndSelect("p.parcours", "parcours", "parcours.titre like :filter", { filter: `%${filter === '*' ? '' : filter}%` })
                .skip(startIndex)
                .take(pageSize)
                .leftJoinAndSelect("parcours.user", "user")
                // .leftJoinAndSelect("parcours", "parcours")
                // .andWhere("reponse.userId = :userId", { userId: 100 })
                .getManyAndCount();
            return p2;
            // return await this.service.findAndCount(opts);
        });
    }
    post(model) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.service.save(model);
            }
            catch (error) {
                return model;
            }
        });
    }
    delete(idUser, idParcours) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.createQueryBuilder()
                .delete()
                // .from(UserParcoursVisite)
                .where("userId = :idUser and parcoursId = :idParcours", { idUser, idParcours })
                .execute();
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.UseBefore(jwt_middleware_1.JwtMiddleware),
    routing_controllers_1.Get('/getFollowed/:startIndex/:pageSize/:idUser/:filter'),
    tslib_1.__param(0, routing_controllers_1.Param('startIndex')), tslib_1.__param(1, routing_controllers_1.Param('pageSize')),
    tslib_1.__param(2, routing_controllers_1.Param('idUser')), tslib_1.__param(3, routing_controllers_1.Param('filter')), tslib_1.__param(4, routing_controllers_1.Res())
], UserParcoursVisitesController.prototype, "getFollowed", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/post'),
    tslib_1.__param(0, routing_controllers_1.Body())
], UserParcoursVisitesController.prototype, "post", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete/:idUser/:idParcours'),
    tslib_1.__param(0, routing_controllers_1.Param('idUser')), tslib_1.__param(1, routing_controllers_1.Param('idParcours'))
], UserParcoursVisitesController.prototype, "delete", null);
UserParcoursVisitesController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/userParcoursVisites'),
    routing_controllers_1.UseBefore(jwt_middleware_1.JwtMiddleware)
], UserParcoursVisitesController);
exports.UserParcoursVisitesController = UserParcoursVisitesController;
