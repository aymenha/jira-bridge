import { gql } from '@apollo/client';

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

export { MOVE_ISSUE, UPDATE_ISSUE };
