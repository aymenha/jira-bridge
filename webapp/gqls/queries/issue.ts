import { gql } from '@apollo/client';

const GET_SPRINT_ISSUES = gql`
  query getSprintIssues($sprintId: ID!) {
    getSprintIssues(sprintId: $sprintId) {
      id
      key
      summary
      type
      priority
      description
      author {
        id
        displayName
        emailAddress
      }
      subTasks {
        id
        summary
        status
      }
      createdAt
      dueDate
    }
  }
`;

export { GET_SPRINT_ISSUES };
