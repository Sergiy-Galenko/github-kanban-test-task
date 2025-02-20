import React from 'react';
import { Card } from 'antd';
import { IIssue } from '../types';

interface IssueCardProps {
  issue: IIssue;
}

function timeSince(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const days = Math.floor(seconds / 86400);
  if (days === 0) {
    return 'today';
  }
  if (days === 1) {
    return '1 day ago';
  }
  return `${days} days ago`;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  // Якщо потрібно відобразити автора issue (user), беремо issue.user.login
  const author = issue.assignee?.login || issue?.user?.login || 'unknown';
  // Для прикладу беремо created_at та comments (з API GitHub)
  // Можливо, треба оновити тип IIssue, щоб ці поля були доступні
  const issueNumber = `#${issue.id}`;
  const commentsCount = (issue as any).comments ?? 0;
  const createdAt = (issue as any).created_at;

  return (
    <Card size="small" className="issue-card">
      <div className="issue-title">{issue.title}</div>
      <div className="issue-meta">
        <span className="issue-number">{issueNumber}</span>
        <span className="issue-opened">
          {createdAt ? ` opened ${timeSince(createdAt)}` : ''}
        </span>
      </div>
      <div className="issue-info">
        <span className="issue-author">{author}</span> |{' '}
        <span className="issue-comments">Comments: {commentsCount}</span>
      </div>
    </Card>
  );
};

export default IssueCard;
