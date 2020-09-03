export default {
  summary: parent => parent.fields.summary,
  type: parent => parent.fields.issuetype.name,
  priority: parent => parent.fields.priority.name,
  status: parent => parent.fields.status.name,
  transitions: (parent, __, { dataSources: { jiraApi } }) =>
    jiraApi.getTransitions(parent.id).then(data => data.transitions)
};

