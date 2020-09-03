import { ApolloError } from 'apollo-server-express';

const resolver = (_, { issueId, transitionId }, { dataSources: { jiraApi } }) => {
  return jiraApi
    .moveIssue(issueId, transitionId)
    .then(() => true)
    .catch(() => {
      throw new ApolloError('CANNOT_MOVE_ISSUE');
    });
};

export default resolver;
