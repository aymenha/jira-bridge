const resolver = (_, { issueId }, { dataSources: { jiraApi } }) => {
  return jiraApi.getTransitions(issueId).then(data => data.transitions);
};

export default resolver;
