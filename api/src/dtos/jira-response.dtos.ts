export interface JiraResponseArray<T> {
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: T[];
}
