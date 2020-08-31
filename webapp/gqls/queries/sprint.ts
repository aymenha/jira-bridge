import { gql } from '@apollo/client';

const GET_SPRINTS = gql`
  query getSprints {
    getSprints {
      id
      name
      startDate
      endDate
      state
      issues {
        id
        key
        summary
        type
        priority
        status
      }
    }
  }
`;

const GET_CURRENT_SPRINT = gql`
  query getCurrentSprint {
    getCurrentSprint {
      id
      name
      startDate
      endDate
      state
      issues {
        id
        key
        summary
        type
        priority
        status
      }
    }
  }
`;

export { GET_SPRINTS, GET_CURRENT_SPRINT };
