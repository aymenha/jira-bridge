export default {
  summary: parent => parent.fields.summary,
  type: parent => parent.fields.issuetype.name,
  priority: parent => parent.fields.priority.name,
  status: parent => parent.fields.status.name
};
