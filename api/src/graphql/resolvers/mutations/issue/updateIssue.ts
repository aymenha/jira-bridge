const resolver = (_, { issueId, input: { summary, description, dueDate: duedate } }, { dataSources: { jiraApi } }) => {
  const data = { fields: { summary, description }, duedate };

  return jiraApi.updateIssue(issueId, data).then(() => true);
};

export default resolver;
