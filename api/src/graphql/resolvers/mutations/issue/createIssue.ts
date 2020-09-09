const resolver = (
  _,
  { input, input: { summary, projectId, sprintId, issueTypeName, statusName } },
  { dataSources: { jiraApi } }
) => {
  return jiraApi.createIssue(summary, projectId, issueTypeName).then(issue => {
    return jiraApi.moveIssueToSprint(sprintId, issue.id).then(() => {
      return jiraApi.getTransitions(issue.id).then(data => {
        const transition = data.transitions.find(transition => transition.name === statusName);
        return jiraApi.moveIssue(issue.id, transition?.id).then(() => jiraApi.getIssue(issue.id));
      });
    });
  });
};

export default resolver;
