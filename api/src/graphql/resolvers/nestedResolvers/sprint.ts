export default {
  issues: (parent, args, { dataSources: { jiraApi } }) => jiraApi.getSprintIssues(parent.id).then(data => data.issues)
};
