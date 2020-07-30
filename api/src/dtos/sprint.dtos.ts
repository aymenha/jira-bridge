export interface Sprint {
  id: number;
  state: "future" | "active" | "closed";
  name: string;
  originBoardId: number;
}
