import graphQLHTTP from 'express-graphql';

import logger from '../utils/logger';
import {schema} from '../data/schema';

const PROD = process.env.NODE_ENV === 'production';

export default graphQLHTTP({
  schema,
  graphiql: !PROD,
  pretty: !PROD,

  formatError: (error) => {
    logger.error(error);
    return {message: 'Internal server error.'};
  }
});
