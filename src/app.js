// src/ index.js

import express from 'express';
import dotenv from 'dotenv';
import changeCase from 'change-case';
import routes from './routes';

dotenv.config();

const app = express();
const router = express.Router();
Object.keys(routes).forEach((routeName) => {
  routes[routeName].default(router);
  app.use(`/api/${changeCase.paramCase(routeName)}`, router);
});
export default app;
