import 'babel-polyfill';
import path from 'path';
import compression from 'compression';
import express from 'express';
import config from '../../config.json';
import graphql from './middlewares/graphql';
import errorHandler from './middlewares/errorHandler';
import createSSR from './createSSR';

const app = express();
const PROD = process.env.NODE_ENV === 'production';

// Expose a GraphQL endpoint
app.use('/graphql', graphql);

if (!PROD) {
  const {webpackDev, webpackHot} = require('./middlewares/webpack');

  app.use(webpackDev);
  app.use(webpackHot);
}

if (PROD) {
  app.use(compression());
  app.use('/static', express.static(path.resolve(__dirname, '..', '..', 'build')));
}

app.use('/css/', express.static(path.resolve(__dirname, '..', '..', 'src', 'universal', 'styles')));

app.get('*', createSSR);
app.use(errorHandler);

app.listen(
  config.port, () => {
    console.log(`App is now running on http://localhost:${config.port}`);
  }
);

