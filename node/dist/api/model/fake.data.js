"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("./models");
const faker = require("faker");
// import { UowService } from '../services/uow.service';
const typedi_1 = require("typedi");
const user_repository_1 = require("../repository/user.repository");
const parcours_repository_1 = require("../repository/parcours.repository");
const user_parcours_visite_repository_1 = require("../repository/user.parcours.visite.repository");
const user_parcours_cree_repository_1 = require("../repository/user.parcours.cree.repository");
const etap_repository_1 = require("../repository/etap.repository");
const quizz_repository_1 = require("../repository/quizz.repository");
const reponse_repository_1 = require("../repository/reponse.repository");
class FakeData {
    constructor() {
        // private uow = Container.get(UowService);
        this.serviceUser = typedi_1.default.get(user_repository_1.UserRepository);
        this.serviceParcours = typedi_1.default.get(parcours_repository_1.ParcoursRepository);
        this.serviceUserParcoursVisite = typedi_1.default.get(user_parcours_visite_repository_1.UserParcoursVisiteRepository);
        this.serviceUserParcoursCree = typedi_1.default.get(user_parcours_cree_repository_1.UserParcoursCreeRepository);
        this.serviceEtap = typedi_1.default.get(etap_repository_1.EtapRepository);
        this.serviceQuizz = typedi_1.default.get(quizz_repository_1.QuizzRepository);
        this.serviceReponse = typedi_1.default.get(reponse_repository_1.ReponseRepository);
    }
    insertSomeFakeData() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const i = yield this.serviceUser.count();
            if (i > 0) {
                return;
            }
            const count = 100;
            yield this.addUsers(count);
            yield this.addParcours(count);
            yield this.addUserParcoursVisite(count);
            yield this.addUserUserParcoursCree(count);
            yield this.addEtap(count);
            yield this.addQuizz(count);
            yield this.addReponse(count);
            console.log('Database seeding has done succesfully');
        });
    }
    addUsers(count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = [...Array(count - 1).keys()].map(i => {
                const o = new models_1.User();
                o.firstname = faker.name.firstName();
                o.lastname = faker.name.lastName();
                o.email = faker.internet.email();
                o.password = faker.internet.password(6);
                o.role = 'user';
                return o;
            });
            list.push({
                firstname: 'sa',
                lastname: 'admin',
                email: 'admin@angular.io',
                password: '123',
                role: 'admin'
            });
            yield this.serviceUser.addList(list);
        });
    }
    addParcours(count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = [...Array(count).keys()].map(i => {
                const o = new models_1.Parcours();
                o.titre = faker.name.title();
                o.image = faker.image.imageUrl();
                o.descriptif = faker.name.jobDescriptor();
                o.temps = faker.random.number(10);
                o.lat = +faker.address.latitude();
                o.lng = +faker.address.longitude();
                return o;
            });
            yield this.serviceParcours.addList(list);
        });
    }
    addUserParcoursVisite(count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = [...Array(count).keys()].map(i => {
                const o = new models_1.UserParcoursVisite();
                o.userId = i + 1;
                o.parcoursId = i + 1;
                o.date = faker.date.future();
                return o;
            });
            yield this.serviceUserParcoursVisite.addList(list);
        });
    }
    addUserUserParcoursCree(count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = [...Array(count).keys()].map(i => {
                const o = new models_1.UserParcoursCree();
                o.userId = i + 1;
                o.parcoursId = i + 1;
                o.date = faker.date.future();
                return o;
            });
            yield this.serviceUserParcoursCree.addList(list);
        });
    }
    addEtap(count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = [...Array(count).keys()].map(i => {
                const o = new models_1.Etap();
                o.adresse = faker.name.title();
                o.lat = +faker.address.latitude();
                o.lng = +faker.address.longitude();
                o.parcoursId = faker.random.number({ min: 1, max: 10 });
                return o;
            });
            yield this.serviceEtap.addList(list);
        });
    }
    addQuizz(count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = [...Array(count).keys()].map(i => {
                const o = new models_1.Quizz();
                o.question = faker.name.title();
                o.reponse = `reponse ${faker.random.number({ min: 1, max: 3 })}`;
                o.choix = `['reponse 1', 'reponse 2','reponse 3',]`;
                o.etapId = faker.random.number({ min: 1, max: 10 });
                return o;
            });
            yield this.serviceQuizz.addList(list);
        });
    }
    addReponse(count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = [...Array(count).keys()].map(i => {
                const o = new models_1.Reponse();
                o.reponse = faker.name.title();
                o.date = faker.date.past();
                // o.lat = faker.address.latitude();
                // o.lng = faker.address.longitude();
                o.quizzId = faker.random.number({ min: 1, max: 10 });
                o.userId = faker.random.number({ min: 1, max: 10 });
                return o;
            });
            yield this.serviceReponse.addList(list);
        });
    }
}
exports.FakeData = FakeData;
