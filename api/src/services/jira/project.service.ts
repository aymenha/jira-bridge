import { jiraService } from "./jira.service";

interface ProjectService {
  getProjects(): Promise<any>;
  getProject(projectId: string): Promise<any>;
}

async function getProjects() {
  const response = await jiraService.makeRequest("/board/1/project");
  return response;
}

async function getProject(projectId: string) {
  // const response = await getJiraInstance().projects.getProject({
  //   projectIdOrKey: projectId,
  // });
  const response = await jiraService.makeRequest(`project/${projectId}`);
  return response;
}

export const projectService: ProjectService = {
  getProjects,
  getProject,
};
