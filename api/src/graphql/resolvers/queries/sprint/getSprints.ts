const resolver = (_, __, { dataSources: { jiraApi } }) => {
  return jiraApi.getSprints().then(data => data.values);
};

export default resolver;
