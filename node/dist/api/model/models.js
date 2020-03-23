"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let User = class User {
    constructor() {
        this.id = null;
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.password = '';
        this.role = '';
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], User.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], User.prototype, "firstname", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], User.prototype, "lastname", void 0);
tslib_1.__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column('text')
], User.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], User.prototype, "password", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], User.prototype, "role", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => UserParcoursVisite, va => va.user)
], User.prototype, "userParcoursVisites", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => UserParcoursCree, va => va.user)
], User.prototype, "userParcoursCrees", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Reponse, va => va.user)
], User.prototype, "reponses", void 0);
User = tslib_1.__decorate([
    typeorm_1.Entity('user')
], User);
exports.User = User;
let Parcours = class Parcours {
    constructor() {
        this.id = null;
        this.titre = '';
        this.image = '';
        this.descriptif = '';
        this.temps = 0;
        this.lat = 0;
        this.lng = 0;
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Parcours.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Parcours.prototype, "titre", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Parcours.prototype, "image", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Parcours.prototype, "descriptif", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Parcours.prototype, "temps", void 0);
tslib_1.__decorate([
    typeorm_1.Column('integer')
], Parcours.prototype, "lat", void 0);
tslib_1.__decorate([
    typeorm_1.Column('integer')
], Parcours.prototype, "lng", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Etap, va => va.parcours)
], Parcours.prototype, "etaps", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => UserParcoursVisite, va => va.parcours)
], Parcours.prototype, "userParcoursVisites", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => UserParcoursCree, va => va.parcours)
], Parcours.prototype, "userParcoursCrees", void 0);
Parcours = tslib_1.__decorate([
    typeorm_1.Entity('Parcours')
], Parcours);
exports.Parcours = Parcours;
let UserParcoursVisite = class UserParcoursVisite {
    constructor() {
        this.userId = null;
        this.parcoursId = null;
        this.date = new Date();
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('integer')
], UserParcoursVisite.prototype, "userId", void 0);
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('integer')
], UserParcoursVisite.prototype, "parcoursId", void 0);
tslib_1.__decorate([
    typeorm_1.Column('date')
], UserParcoursVisite.prototype, "date", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => User, a => a.userParcoursVisites, { onDelete: 'CASCADE' })
], UserParcoursVisite.prototype, "user", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Parcours, a => a.userParcoursVisites, { onDelete: 'CASCADE' })
], UserParcoursVisite.prototype, "parcours", void 0);
UserParcoursVisite = tslib_1.__decorate([
    typeorm_1.Entity('UserParcoursVisite')
], UserParcoursVisite);
exports.UserParcoursVisite = UserParcoursVisite;
let UserParcoursCree = class UserParcoursCree {
    constructor() {
        this.userId = null;
        this.parcoursId = null;
        this.date = new Date();
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('integer')
], UserParcoursCree.prototype, "userId", void 0);
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('integer')
], UserParcoursCree.prototype, "parcoursId", void 0);
tslib_1.__decorate([
    typeorm_1.Column('date')
], UserParcoursCree.prototype, "date", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => User, a => a.userParcoursCrees, { onDelete: 'CASCADE' })
], UserParcoursCree.prototype, "user", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Parcours, a => a.userParcoursCrees, { onDelete: 'CASCADE' })
], UserParcoursCree.prototype, "parcours", void 0);
UserParcoursCree = tslib_1.__decorate([
    typeorm_1.Entity('UserParcoursCree')
], UserParcoursCree);
exports.UserParcoursCree = UserParcoursCree;
let Etap = class Etap {
    constructor() {
        this.id = null;
        this.adresse = '';
        this.lat = 0;
        this.lng = 0;
        this.parcoursId = 0;
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Etap.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Etap.prototype, "adresse", void 0);
tslib_1.__decorate([
    typeorm_1.Column('integer')
], Etap.prototype, "lat", void 0);
tslib_1.__decorate([
    typeorm_1.Column('integer')
], Etap.prototype, "lng", void 0);
tslib_1.__decorate([
    typeorm_1.Column('integer')
], Etap.prototype, "parcoursId", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Parcours, a => a.etaps, { onDelete: 'CASCADE' })
], Etap.prototype, "parcours", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Quizz, va => va.etap)
], Etap.prototype, "quizzs", void 0);
Etap = tslib_1.__decorate([
    typeorm_1.Entity('Etap')
], Etap);
exports.Etap = Etap;
let Quizz = class Quizz {
    constructor() {
        this.id = null;
        this.question = '';
        this.reponse = '';
        this.choix = '';
        this.etapId = 0;
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Quizz.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Quizz.prototype, "question", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Quizz.prototype, "reponse", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Quizz.prototype, "choix", void 0);
tslib_1.__decorate([
    typeorm_1.Column('integer')
], Quizz.prototype, "etapId", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Etap, a => a.quizzs, { onDelete: 'CASCADE' })
], Quizz.prototype, "etap", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Reponse, va => va.quizz)
], Quizz.prototype, "reponses", void 0);
Quizz = tslib_1.__decorate([
    typeorm_1.Entity('Quizz')
], Quizz);
exports.Quizz = Quizz;
let Reponse = class Reponse {
    constructor() {
        this.id = null;
        this.reponse = '';
        this.quizzId = 0;
        this.date = new Date();
        this.userId = 0;
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Reponse.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column('text')
], Reponse.prototype, "reponse", void 0);
tslib_1.__decorate([
    typeorm_1.Column('integer')
], Reponse.prototype, "quizzId", void 0);
tslib_1.__decorate([
    typeorm_1.Column('date')
], Reponse.prototype, "date", void 0);
tslib_1.__decorate([
    typeorm_1.Column('integer')
], Reponse.prototype, "userId", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Quizz, a => a.reponses, { onDelete: 'CASCADE' })
], Reponse.prototype, "quizz", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => User, va => va.reponses)
], Reponse.prototype, "user", void 0);
Reponse = tslib_1.__decorate([
    typeorm_1.Entity('Reponse')
], Reponse);
exports.Reponse = Reponse;
