import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class JiraApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.JIRA_BASE_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', process.env.JIRA_TOKEN);
  }

  async getBoardConfiguration(boardId: number) {
    return this.get(`rest/agile/1.0/board/${boardId}/configuration`);
  }

  async getSprints(): Promise<any> {
    return this.get('rest/agile/1.0/board/2/sprint');
  }

  async getSprintIssues(sprintId: number): Promise<any> {
    return this.get(`rest/agile/1.0/sprint/${sprintId}/issue`);
  }

  async getIssue(issueId: number): Promise<any> {
    return this.get(`/rest/api/2/issue/${issueId}`);
  }

  async getTransitions(issueId: number): Promise<any> {
    return this.get(`rest/api/3/issue/${issueId}/transitions`);
  }

  async moveIssue(issueId: number, transitionId: string): Promise<any> {
    const body = { transition: { id: parseInt(transitionId, 10) } };

    return this.post(`rest/api/3/issue/${issueId}/transitions`, body);
  }

  async updateIssue(issueId: number, data: any): Promise<any> {
    return this.put(`rest/api/2/issue/${issueId}`, data);
  }
}

export default JiraApi;
