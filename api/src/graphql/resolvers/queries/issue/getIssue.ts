const resolver = (_, { issueId }, { dataSources: { jiraApi } }) => {
  return jiraApi.getIssue(issueId);
};

export default resolver;
