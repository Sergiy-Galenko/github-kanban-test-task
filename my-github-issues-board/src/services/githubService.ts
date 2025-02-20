import { IIssue } from "../types";

export const fetchIssuesFromGitHub = async (
    owner: string,
    repo: string
): Promise<IIssue[]> => {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=all`
    );
    if (!response.ok) {
        throw new Error("Error fetching issues");
    }
    const data = await response.json();
    const issues: IIssue[] = data.filter((issue: any) => !issue.pull_request);
    return issues;
};
