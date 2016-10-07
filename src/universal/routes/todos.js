import TodoApp from '../modules/Todos/TodoApp';
import TodoList from '../modules/Todos/TodoList';
import ViewerQueries from '../modules/Todos/queries/ViewerQueries';

export default {
  path: '/',
  component: TodoApp,
  queries: ViewerQueries,
  indexRoute: {
    component: TodoList,
    queries: ViewerQueries,
    prepareParams: () => ({status: 'any'})
  },
  childRoutes: [
    {
      path: ':status',
      component: TodoList,
      queries: ViewerQueries
    }
  ]
};
