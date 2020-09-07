const resolver = (_, { sprintId }, { dataSources: { jiraApi } }) => {
  return jiraApi.getSprintIssues(sprintId).then(data => data.issues);
};

export default resolver;
