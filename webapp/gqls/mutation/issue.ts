import { gql } from '@apollo/client';

const MOVE_ISSUE = gql`
  mutation moveIssue($issueId: ID!, $transitionId: ID!) {
    moveIssue(issueId: $issueId, transitionId: $transitionId)
  }
`;

export { MOVE_ISSUE };
