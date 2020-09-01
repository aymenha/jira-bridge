import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class JiraApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.JIRA_BASE_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', process.env.JIRA_TOKEN);
  }

  async getSprints(): Promise<any[]> {
    return this.get('board/2/sprint');
  }
}

export default JiraApi;
