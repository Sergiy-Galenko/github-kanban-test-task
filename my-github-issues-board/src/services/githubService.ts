import { IIssue } from '../types';

export const fetchIssuesFromGitHub = async (owner: string, repo: string): Promise<IIssue[]> => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all`);
  if (!response.ok) {
    throw new Error('Error fetching issues');
  }
  const data = await response.json();
  // Фільтруємо pull requests
  const issues: IIssue[] = data
    .filter((issue: any) => !issue.pull_request)
    .map((issue: any) => ({
      ...issue,
      id: issue.number,
    }));
  return issues;
};

export const fetchRepoInfo = async (owner: string, repo: string) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!response.ok) {
    throw new Error('Error fetching repo info');
  }
  return response.json();
};
