// import fetch from "node-fetch";
// import JiraClient from "jira-connector";
// import JiraClient from "jira-client";
import { Client } from "jira.js";

let jiraClientInstance: Client;
function getJiraInstance(): Client {
  if (!jiraClientInstance) {
    jiraClientInstance = new Client({
      host: "https://amiiine.atlassian.net",
      authentication: {
        basic: {
          username: "mouhamedaymenhammami@gmail.com",
          apiToken: "zg7QZVxdvFuF6QqKuGP5D381",
        },
      },
    });
  }
  return jiraClientInstance;
}

export const jiraService = getJiraInstance();

// interface JiraServiceParams {
//   email: string;
//   apiToken: string;
//   host: string;
// }

// class JiraService implements IJiraService {
//   private params: JiraServiceParams;

//   constructor(params: JiraServiceParams) {
//     this.params = params;
//   }

//   private buildAuthorization(email: string, apiToken: string): string {
//     const authString = `${email}:${apiToken}`;
//     const buff = new Buffer(authString);
//     return `Basic ${buff.toString("base64")}`;
//   }

//   async makeRequest(path: string, method: string = "GET"): Promise<any> {
//     const { email, apiToken } = this.params;
//     const headers = {
//       Authorization: this.buildAuthorization(email, apiToken),
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     };
//     const response = await fetch(`${this.params.host}/rest/agile/1.0/${path}`, {
//       method,
//       headers,
//     });
//     return await response.json();
//   }
// }

// interface IJiraService {
//   makeRequest(method: string): Promise<any>;
// }

// export const jiraService = new JiraService({
//   host: "https://amiiine.atlassian.net",
//   email: "mouhamedaymenhammami@gmail.com",
//   apiToken: "zg7QZVxdvFuF6QqKuGP5D381",
// });
