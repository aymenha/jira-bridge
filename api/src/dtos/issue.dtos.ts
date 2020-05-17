interface Issue {
  id: string;
  key: string;
  type: IssueType; // issuetype
  project: Project;
  lastViewed: Date;
  watches: Watches;
  createdAt: number; // created
  priority: Priority;
  labels: string[]; // todo: fix type
  assignee: User;
  creator: User;
  reporter: User;
  attachments: Attachment[];
  status: IssueStatus;
  description: string; // [markdown content]
  title: string; // summary
  // components
  // subtasks
  // aggregateprogress
  // progress
  // comment
  // votes
  // worklog
}

interface IssueStatus {
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: IssueStatusCategory;
}

interface IssueStatusCategory {
  id: number;
  key: string;
  colorName: string;
  name: string;
}

interface IssueType {
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
}

interface Attachment {
  id: string;
  filename: string;
  author: User;
  created: Date;
  sizeInBytes: number; // size
  mimeType: string;
  content: string;
  thumbnail: string;
}

interface User {
  accountId: string;
  emailAddress: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: true;
  timeZone: string;
  accountType: string;
}

interface Project {
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  avatarUrls: AvatarUrls;
}

type AvatarUrls = string;
// interface AvatarUrls {
//   "48x48"?: string;
//   "24x24"?: string;
//   "16x16"?: string;
//   "32x32"?: string;
// }

interface Watches {
  watchCount: number;
  isWatching: boolean;
}

interface Priority {
  iconUrl: string;
  name: string;
  id: string;
}
