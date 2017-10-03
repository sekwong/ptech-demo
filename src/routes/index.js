// src/index.js

import changeCase from 'change-case';
import express from 'express';
import requireDir from 'require-dir';

const routes = requireDir();

function initRoutes(app) {
  'use strict';
  // Initialize all routes
  Object.keys(routes).forEach(function(routeName) {
    const router = express.Router();
    // You can add some middleware here 
    // router.use(someMiddleware);
    // Initialize the route to add its functionality to router
    require('./' + routeName).default(router);
    // Add router to the speficied route name in the app
    app.use('/' + changeCase.paramCase(routeName), router);
  }); 
};

export default initRoutes;

