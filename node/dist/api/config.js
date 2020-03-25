"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./model/models");
exports.config = {
    jwt: {
        jwtSecret: '@QEGTUI'
    },
    db: {
        type: 'sqlite',
        name: 'default',
        database: `${__dirname}/data/my.sqlite`,
        // entities: [__dirname + "/entity/*{.js,.ts}"],
        entities: [
            models_1.User,
        ],
        synchronize: true,
        logging: [
            'error',
        ],
    },
    server: {
        routePrefix: '/api',
        cors: true,
        classTransformer: true,
        controllers: [`${__dirname}/controllers/*.ts`, `${__dirname}/controllers/*.js`],
        middlewares: [`${__dirname}/middlewares/*.ts`, `${__dirname}/middlewares/*.js`],
    }
};
