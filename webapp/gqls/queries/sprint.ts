import { gql } from '@apollo/client';

const GET_SPRINTS = gql`
  query getSprints {
    getSprints {
      id
      name
      startDate
      endDate
      state
      configuration {
        columns
      }
      issues {
        id
        key
        summary
        type
        priority
        status
        transitions {
          id
          name
        }
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
      configuration {
        columns
      }
      issues {
        id
        key
        summary
        type
        priority
        status
        transitions {
          id
          name
        }
      }
    }
  }
`;

export { GET_SPRINTS, GET_CURRENT_SPRINT };
