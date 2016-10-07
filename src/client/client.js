import Relay from 'react-relay';
import history from 'universal/utils/history'; // eslint-disable-line import/no-extraneous-dependencies
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {match, Router} from 'react-router';
import {AppContainer} from 'react-hot-loader';

const environment = new Relay.Environment();
environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

const data = JSON.parse(document.getElementById('preloadedData').textContent);

IsomorphicRelay.injectPreparedData(environment, data);

const rootElement = document.getElementById('root');

function render() {
  const routes = require('universal/routes/index'); // eslint-disable-line import/no-extraneous-dependencies

  match(
    {routes, history}, (error, redirectLocation, renderProps) => {
      IsomorphicRouter.prepareInitialRender(environment, renderProps).then(
        (props) => {
          ReactDOM.render(
            <AppContainer>
              <Router {...props}/>
            </AppContainer>
            , rootElement
          );
        }
      );
    }
  );
}

render();

if (module.hot) {
  module.hot.accept(
    'universal/routes/index', () => {
      setTimeout(
        () => {
          ReactDOM.unmountComponentAtNode(rootElement);
          render();
        }
      );
    }
  );
}
