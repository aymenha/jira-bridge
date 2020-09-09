import { gql } from '@apollo/client';

const CREATE_ISSUE = gql`
  mutation createIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
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
`;

const MOVE_ISSUE = gql`
  mutation moveIssue($issueId: ID!, $transitionId: ID!) {
    moveIssue(issueId: $issueId, transitionId: $transitionId)
  }
`;

const UPDATE_ISSUE = gql`
  mutation update($issueId: ID!, $input: UpdateIssueInput!) {
    updateIssue(issueId: $issueId, input: $input)
  }
`;

export { CREATE_ISSUE, MOVE_ISSUE, UPDATE_ISSUE };
