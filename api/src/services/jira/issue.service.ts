import { getJiraInstance } from "./jira.service";
import { Issue } from "../../dtos";
import { Sprint } from "jira.js/out/api";

interface IssueService {
  getIssue(issueId: string): Promise<Issue>;
  getIssuesBySprint(sprintId: number): Promise<any>;
}

let _sprintInstance: Sprint;
function getInstance() {
  if (!_sprintInstance) {
    _sprintInstance = new Sprint(getJiraInstance());
  }
  return _sprintInstance;
}

async function getIssuesBySprint(sprintId: number) {
  const response = getInstance().getIssuesForSprint({
    sprintId,
  });
  return response;
}

async function getIssue(issueId: string): Promise<Issue> {
  const response = await getJiraInstance().issues.getIssue({
    issueIdOrKey: issueId,
  });
  return response;
}

export const issueService: IssueService = {
  getIssue,
  getIssuesBySprint,
};
