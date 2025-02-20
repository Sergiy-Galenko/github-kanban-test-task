export interface IIssue {
    id: number;
    title: string;
    state: string;
    assignee: {
      login: string;
    } | null;
  }
  