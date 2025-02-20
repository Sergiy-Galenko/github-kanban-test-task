import React from 'react';
import { Card } from 'antd';
import { IIssue } from '../types';

interface IssueCardProps {
  issue: IIssue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <Card title={issue.title} size="small">
      <p>ID: {issue.id}</p>
      <p>Стан: {issue.state}</p>
      {issue.assignee && <p>Assignee: {issue.assignee.login}</p>}
    </Card>
  );
};

export default IssueCard;
