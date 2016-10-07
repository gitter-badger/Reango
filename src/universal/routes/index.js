import App from '../components/App';

export default {
  component: App,
  childRoutes: [
    require('./accounts'),
    require('./todos')

  ]
};

