import 'reflect-metadata';
import {createExpressServer, useContainer, RoutingControllersOptions} from 'routing-controllers';
import {Container} from 'typedi';
import { createConnection, ConnectionOptions } from 'typeorm';
import { Application } from 'express';
import { FakeData } from './api/model/fake.data';
import { config } from './api/config';

useContainer(Container);

class MyApp {

  constructor() { }

  dbConfig() {
    createConnection({
      type: 'sqlite',
      name: 'default',
      database: `${__dirname}/api/data/db-travel.sqlite`,
      entities: [`${__dirname}/api/model/*{.js,.ts}`],
      synchronize: true,
      logging: [
        'error',
        // 'query',
        // 'schema'
      ],
    } as ConnectionOptions)
    .then(() => console.log('Create connection with database has done successfully'))
    .then(async () => await new FakeData().insertSomeFakeData())
    .catch(e => console.log(e));

    return this;
  }

  start() {
    return createExpressServer({
      routePrefix: '/api',
      cors: true,
      classTransformer: true,
      controllers: [`${__dirname}/api/controllers/*.ts`, `${__dirname}/api/controllers/*.js`],
      middlewares: [`${__dirname}/api/middlewares/*.ts`, `${__dirname}/api/middlewares/*.js`],
      // interceptors: [__dirname + '/interceptors/*.js'],
    }) as Application;
  }
}


const PORT = process.env.PORT || 3000;
const myApp = new MyApp();

myApp
  .dbConfig()
  .start()
  .listen(PORT, () => console.log(`Listening at http://localhost:${PORT}/`))
  ;

