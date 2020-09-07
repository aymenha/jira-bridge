import JiraClient from 'jira-connector';

let jiraClientInstance: JiraClient;

export function getInstance(): JiraClient {
  if (!jiraClientInstance) {
    jiraClientInstance = new JiraClient({
      protocol: 'https',
      host: 'amiiine.atlassian.net',
      basic_auth: {
        email: 'mouhamedaymenhammami@gmail.com',
        api_token: 'zg7QZVxdvFuF6QqKuGP5D381',
      },
    });
  }
  return jiraClientInstance;
}
