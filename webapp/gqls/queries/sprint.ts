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
        description
        type
        priority
        status
        createdAt
        dueDate
        author {
          id
          displayName
          emailAddress
        }
        transitions {
          id
          name
        }
        subTasks {
          id
          summary
          status
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
        description
        type
        priority
        status
        createdAt
        dueDate
        author {
          id
          displayName
          emailAddress
        }
        reporter {
          id
          displayName
          emailAddress
        }
        transitions {
          id
          name
        }
        subTasks {
          id
          summary
          status
        }
      }
    }
  }
`;

export { GET_SPRINTS, GET_CURRENT_SPRINT };
