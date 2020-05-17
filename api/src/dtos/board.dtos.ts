interface Board {
  id: number;
  name: string;
  type: string;
  location: BoardProject;
}

interface BoardProject {
  projectId: number;
  displayName: string;
  projectName: string;
  projectKey: string;
  projectTypeKey: string;
  avatarURI: string;
  name: string;
}
