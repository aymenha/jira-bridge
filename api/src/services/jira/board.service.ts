import { getInstance } from './jira.service';

interface BoardService {
  getBoards(): Promise<Board[]>;
  getBoard(boardId: string): Promise<Board>;
  getBoardSprints(boardId: string): Promise<any[]>;
  getBoardIssues(boardId: string): Promise<Issue[]>;
}

// todo: support pagination (partially supported already by getAllBoards)
async function getBoards(): Promise<Board[]> {
  const { values } = await getInstance().board.getAllBoards();
  return values;
}

async function getBoard(boardId: string): Promise<Board> {
  const res = await getInstance().board.getBoard({ boardId });
  console.log('!!!', Object.keys(res));
  return res;
}

async function getBoardSprints(boardId: string): Promise<any> {
  const res = await getInstance().board.getAllSprints({
    boardId,
  });
  return res;
}

async function getBoardIssues(boardId: string): Promise<Issue[]> {
  const { total, issues } = await getInstance().board.getIssuesForBoard({
    boardId,
  });
  return issues.map(issue => {
    return {
      id: issue.id,
      key: issue.key,
      type: mapType(issue.fields.issuetype),
      project: mapProject(issue.fields.project),
      lastViewed: issue.fields.lastViewed,
      watches: issue.fields.watches,
      createdAt: new Date(issue.fields.created).valueOf(),
      priority: mapPriority(issue.fields.priority),
      labels: issue.fields.labels,
      assignee: mapUser(issue.fields.assignee),
      creator: mapUser(issue.fields.creator),
      reporter: mapUser(issue.fields.reporter),
      attachments: issue.fields.attachments,
      status: mapStatus(issue.fields.status),
      description: issue.fields.description,
      title: issue.fields.summary,
    } as Issue;
  });
}

function mapType(value): IssueType {
  return value
    ? {
        id: value.id,
        description: value.description,
        iconUrl: value.iconUrl,
        name: value.name,
        subtask: value.subtask,
        avatarId: value.avatarId,
      }
    : null;
}

function mapProject(value): Project {
  return value
    ? {
        id: value.id,
        key: value.key,
        name: value.name,
        projectTypeKey: value.projectTypeKey,
        avatarUrls: mapAvatarUrl(value.avatarUrls),
      }
    : null;
}

function mapPriority(value): Priority {
  return value
    ? {
        iconUrl: value.iconUrl,
        name: value.name,
        id: value.id,
      }
    : null;
}

function mapUser(value): User {
  return value
    ? {
        accountId: value.accountId,
        emailAddress: value.emailAddress,
        avatarUrls: mapAvatarUrl(value.avatarUrls),
        displayName: value.displayName,
        active: value.active,
        timeZone: value.timeZone,
        accountType: value.accountType,
      }
    : null;
}

function mapAvatarUrl(value): string {
  return value ? value['48x48'] : null;
}

function mapStatus(value): IssueStatus {
  return value
    ? {
        description: value.description,
        iconUrl: value.iconUrl,
        name: value.name,
        id: value.id,
        statusCategory: {
          id: value.statusCategory.id,
          key: value.statusCategory.key,
          colorName: value.statusCategory.colorName,
          name: value.statusCategory.name,
        },
      }
    : null;
}

export const boardService: BoardService = {
  getBoards,
  getBoard,
  getBoardSprints,
  getBoardIssues,
};
