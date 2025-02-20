import React from 'react';
import { StarFilled } from '@ant-design/icons';
import type { Repo, RepoDetails } from '../store/issuesSlice';

interface TopBarProps {
  repo: Repo | null;
  repoDetails: RepoDetails | null;
}

const TopBar: React.FC<TopBarProps> = ({ repo, repoDetails }) => {
  if (!repo || !repoDetails) {
    return (
      <div className="topbar-container">
        <h2 style={{ color: '#fff', margin: 0 }}>Enter repo URL</h2>
      </div>
    );
  }

  const { owner, name } = repo;
  const { stargazers_count } = repoDetails;

  return (
    <div className="topbar-container">
      <h2 style={{ color: '#fff', margin: 0 }}>
        {owner} &gt; {name}
        <span style={{ marginLeft: 20, fontSize: 16 }}>
          <StarFilled style={{ color: '#ffd700', marginRight: 6 }} />
          {stargazers_count?.toLocaleString()} stars
        </span>
      </h2>
    </div>
  );
};

export default TopBar;
