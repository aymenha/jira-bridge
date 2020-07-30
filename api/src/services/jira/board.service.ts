import { getJiraInstance } from "./jira.service";
import { Sprint, JiraResponseArray, Board, Issue } from "../../dtos";

interface BoardService {
  getBoards(): Promise<Board[]>;
  getBoard(boardId: number): Promise<Board>;
  getBoardSprints(boardId: number): Promise<any[]>;
  // getBoardIssues(boardId: string): Promise<Issue[]>;
  // getIssuesByBoardAndSprint(boardId: string, sprintId: string): Promise<any>;
}

// todo: support pagination (partially supported already by getAllBoards)
async function getBoards(): Promise<Board[]> {
  const response = await getJiraInstance().board.getAllBoards();
  // const { values } = response as JiraResponseArray<Board>;
  return response;
}

async function getBoard(boardId: number): Promise<Board> {
  const response = await getJiraInstance().board.getBoard({ boardId });
  return response as Board;
}

async function getBoardSprints(boardId: number): Promise<Sprint[]> {
  const response = await getJiraInstance().board.getAllSprints({ boardId: 1 });
  // const { values } = response as JiraResponseArray<Sprint>;
  return response;
}

// async function getBoardIssues(boardId: string): Promise<any[]> {
//   // const { total, issues } = await getInstance().getIssuesForBoard(boardId);
//   const response = await getJiraInstance().getIssuesForBoard(boardId);
//   console.log(response);
//   return response as any;

//   // return issues.map((issue) => {
//   //   return {
//   //     id: issue.id,
//   //     key: issue.key,
//   //     type: mapType(issue.fields.issuetype),
//   //     project: mapProject(issue.fields.project),
//   //     lastViewed: issue.fields.lastViewed,
//   //     watches: issue.fields.watches,
//   //     createdAt: new Date(issue.fields.created).valueOf(),
//   //     priority: mapPriority(issue.fields.priority),
//   //     labels: issue.fields.labels,
//   //     assignee: mapUser(issue.fields.assignee),
//   //     creator: mapUser(issue.fields.creator),
//   //     reporter: mapUser(issue.fields.reporter),
//   //     attachments: issue.fields.attachments,
//   //     status: mapStatus(issue.fields.status),
//   //     description: issue.fields.description,
//   //     title: issue.fields.summary,
//   //   } as Issue;
//   // });
// }

// function mapType(value): IssueType {
//   return value
//     ? {
//         id: value.id,
//         description: value.description,
//         iconUrl: value.iconUrl,
//         name: value.name,
//         subtask: value.subtask,
//         avatarId: value.avatarId,
//       }
//     : null;
// }

// function mapProject(value): Project {
//   return value
//     ? {
//         id: value.id,
//         key: value.key,
//         name: value.name,
//         projectTypeKey: value.projectTypeKey,
//         avatarUrls: mapAvatarUrl(value.avatarUrls),
//       }
//     : null;
// }

// function mapPriority(value): Priority {
//   return value
//     ? {
//         iconUrl: value.iconUrl,
//         name: value.name,
//         id: value.id,
//       }
//     : null;
// }

// function mapUser(value): User {
//   return value
//     ? {
//         accountId: value.accountId,
//         emailAddress: value.emailAddress,
//         avatarUrls: mapAvatarUrl(value.avatarUrls),
//         displayName: value.displayName,
//         active: value.active,
//         timeZone: value.timeZone,
//         accountType: value.accountType,
//       }
//     : null;
// }

// function mapAvatarUrl(value): string {
//   return value ? value["48x48"] : null;
// }

// function mapStatus(value): IssueStatus {
//   return value
//     ? {
//         description: value.description,
//         iconUrl: value.iconUrl,
//         name: value.name,
//         id: value.id,
//         statusCategory: {
//           id: value.statusCategory.id,
//           key: value.statusCategory.key,
//           colorName: value.statusCategory.colorName,
//           name: value.statusCategory.name,
//         },
//       }
//     : null;
// }

export const boardService: BoardService = {
  getBoards,
  getBoard,
  getBoardSprints,
  // getBoardIssues,
  // getIssuesByBoardAndSprint,
};
