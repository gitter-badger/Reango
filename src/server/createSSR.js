import fs from 'fs';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom-stream/server';
import Relay from 'react-relay';
import {match} from 'react-router';
import {join, basename} from 'path';
import promisify from 'es6-promisify';

import config from '../../config.json';
import Html from './Html';

const networkLayer = new Relay.DefaultNetworkLayer(config.graphQLAddress);

function renderApp(res, data, props, assets) {
  const htmlStream = renderToStaticMarkup(
    <Html
      data={data}
      markupProps={props}
      assets={assets}
    />
  );
  res.write('<!DOCTYPE html>');
  htmlStream.pipe(res, {end: false});
  htmlStream.on('end', () => res.end());
}

function matchRoutes({req, res, next}, routes, assets) {
  match(
    {routes, location: req.url}, (error, redirectLocation, renderProps) => {
      if (error) {
        next(error);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        IsomorphicRouter.prepareData(renderProps, networkLayer).then(
          ({data, props}) => { renderApp(res, data, props, assets); }
        );
      } else {
        res.status(404).send('Not Found');
      }
    }
  );
}

export default async (req, res, next) => { // eslint-disable-line  arrow-parens
  if (process.env.NODE_ENV === 'production') {
    const routes = require('../../build/prerender');
    const assets = require('../../build/assets.json');

    const readFile = promisify(fs.readFile);
    assets.manifest.text = await readFile(join(__dirname, '..', '..', 'build', basename(assets.manifest.js)), 'utf-8');
    matchRoutes({req, res, next}, routes, assets);
  } else {
    const routes = require('../universal/routes');

    matchRoutes({req, res, next}, routes);
  }
};
