import 'reflect-metadata';
import { createExpressServer, useContainer, RoutingControllersOptions } from 'routing-controllers';
import { Container } from 'typedi';
import { createConnection, ConnectionOptions } from 'typeorm';
import { Application } from 'express';
import * as express from 'express';
import { FakeData } from './api/model/fake.data';

import { config } from './api/config';
import { join } from 'path';

useContainer(Container);

class MyApp {

  constructor() { }

  dbConfig() {
    const opts: ConnectionOptions = {
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
    }

    createConnection(opts)
      .then(() => console.log('Create connection with database has done successfully'))
      .then(async () => await new FakeData().insertSomeFakeData())
      .catch(e => console.log(e))
      ;

    return this;
  }

  start(): Application {

    const opts: RoutingControllersOptions = {
      routePrefix: '/api',
      cors: true,
      classTransformer: true,
      controllers: [`${__dirname}/api/controllers/*.ts`, `${__dirname}/api/controllers/*.js`],
      middlewares: [`${__dirname}/api/middlewares/*.ts`, `${__dirname}/api/middlewares/*.js`],
      // interceptors: [__dirname + '/interceptors/*.js'],
    }


    return createExpressServer(opts);
  }
}


const PORT = process.env.PORT || 3001;
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
  .use(express.static(join(__dirname, '/api/public')))
  .use((req, res) => res.sendFile(join(__dirname, '/api/public', 'index.html')))
  .listen(PORT, () => {
    // console.log(join(__dirname, '/api/public', 'index.html'));
    console.log(`Listening at http://localhost:${PORT}/`)
  })
  ;


