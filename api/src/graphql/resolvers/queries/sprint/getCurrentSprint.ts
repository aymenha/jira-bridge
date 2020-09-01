import { sprintStatesByKey } from '../../../../utils/constants';

const resolver = (_, __, { dataSources: { jiraApi } }) => {
  return jiraApi.getSprints().then((data) => data.values.find((sprint) => sprint.state === sprintStatesByKey.active));
};

export default resolver;
