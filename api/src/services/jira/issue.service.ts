import { getInstance } from "./jira.service";

interface IssueService {
  getIssue(issueId: string): Promise<Issue>;
}

async function getIssue(issueId: string): Promise<Issue> {
  const res = await getInstance().issue.getIssue({
    issueKey: issueId,
  });
  return res;
}

export const issueService: IssueService = {
  getIssue,
};
