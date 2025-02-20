export interface IIssue {
    id: number;
    number: number;        
    title: string;
    state: string;
    assignee: {
      login: string;
    } | null;
    user?: {
      login: string;
    };
    created_at?: string;
    comments?: number;
  }
  