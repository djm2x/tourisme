"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const express = require("express");
const fake_data_1 = require("./api/model/fake.data");
const path_1 = require("path");
routing_controllers_1.useContainer(typedi_1.Container);
class MyApp {
    constructor() { }
    dbConfig() {
        const opts = {
            type: 'sqlite',
            name: 'default',
            database: `${__dirname}/api/data/db-travel.sqlite`,
            entities: [`${__dirname}/api/model/*{.js,.ts}`],
            synchronize: true,
            logging: [
                'error',
            ],
        };
        typeorm_1.createConnection(opts)
            .then(() => console.log('Create connection with database has done successfully'))
            .then(() => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield new fake_data_1.FakeData().insertSomeFakeData(); }))
            .catch(e => console.log(e));
        return this;
    }
    start() {
        const opts = {
            routePrefix: '/api',
            cors: true,
            classTransformer: true,
            controllers: [`${__dirname}/api/controllers/*.ts`, `${__dirname}/api/controllers/*.js`],
            middlewares: [`${__dirname}/api/middlewares/*.ts`, `${__dirname}/api/middlewares/*.js`],
        };
        return routing_controllers_1.createExpressServer(opts);
    }
}
const PORT = process.env.PORT || 3000;
const myApp = new MyApp();
myApp
    .dbConfig()
    .start()
    // .get('*', (req, res, next) => {
    //   // basic middleware
    //   console.log(`express:req from ${req.originalUrl}`);
    //   console.log(`express:req type ${req.method}`);
    //   next();
    // })
    .use(express.static(path_1.join(__dirname, '/api/public')))
    .use((req, res) => res.sendFile(path_1.join(__dirname, '/api/public', 'index.html')))
    .listen(PORT, () => {
    // console.log(join(__dirname, '/api/public', 'index.html'));
    console.log(`Listening at http://localhost:${PORT}/`);
});
