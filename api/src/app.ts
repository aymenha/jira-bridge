import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema, { JiraApi } from './graphql';

const app = express();

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({ jiraApi: new JiraApi() })
});

apolloServer.applyMiddleware({ app });

export { app };
