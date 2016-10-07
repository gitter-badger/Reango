import Auth from '../modules/auth/Auth';
import TodoList from '../modules/Todos/TodoList';
import ViewerQueries from '../modules/Todos/queries/ViewerQueries';

export default {
  path: 'signup',
  indexRoute: {
    component: Auth,
    queries: ViewerQueries
  }
};
