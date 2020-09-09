export default {
  summary: parent => parent.fields.summary,
  type: parent => parent.fields.issuetype.name,
  description: parent => parent.fields.description,
  priority: parent => parent.fields.priority.name,
  status: parent => parent.fields.status.name,
  subTasks: parent => parent.fields.subtasks,
  transitions: (parent, __, { dataSources: { jiraApi } }) =>
    jiraApi.getTransitions(parent.id).then(data => data.transitions),
  author: parent => parent.fields.creator,
  reporter: parent => parent.fields.reporter,
  isSubTask: parent => parent.fields.issuetype.subtask,
  createdAt: parent => parent.fields.created,
  updatedAt: parent => parent.fields.updated,
  dueDate: parent => parent.fields.duedate
};
