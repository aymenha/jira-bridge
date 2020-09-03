export default {
  issues: (parent, args, { dataSources: { jiraApi } }) => jiraApi.getSprintIssues(parent.id).then(data => data.issues),
  configuration: (parent, args, { dataSources: { jiraApi } }) =>
    jiraApi.getBoardConfiguration(parent.originBoardId).then(data => data.columnConfig)
};
