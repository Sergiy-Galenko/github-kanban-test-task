import React, { useState } from 'react';
import { Input, Button, Space, Typography } from 'antd';

const { Link } = Typography;

interface Repo {
  owner: string;
  name: string;
}

interface RepoInputProps {
  onLoadRepo: (url: string) => void;
  repo: Repo | null;
}

const RepoInput: React.FC<RepoInputProps> = ({ onLoadRepo, repo }) => {
  const [url, setUrl] = useState('');

  const handleLoad = () => {
    if (url) {
      onLoadRepo(url);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Space>
        <Input
          placeholder="Введіть URL репозиторію (наприклад, https://github.com/facebook/react)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: 400 }}
        />
        <Button type="primary" onClick={handleLoad}>
          Load
        </Button>
      </Space>
      {repo && (
        <div style={{ marginLeft: '20px' }}>
          <Space direction="vertical">
            <Link href={`https://github.com/${repo.owner}`} target="_blank">
              Профіль власника
            </Link>
            <Link
              href={`https://github.com/${repo.owner}/${repo.name}`}
              target="_blank"
            >
              Сторінка репозиторію
            </Link>
          </Space>
        </div>
      )}
    </div>
  );
};

export default RepoInput;
