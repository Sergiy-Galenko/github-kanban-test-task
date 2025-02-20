import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import RepoInput from './components/RepoInput';
import DragDropContextWrapper from './components/DragDropContextWrapper';
import TopBar from './components/TopBar';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchIssues, selectRepoIssues, fetchRepoDetails } from './store/issuesSlice';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>('');
  const dispatch = useAppDispatch();
  const { issues, status, repo, repoDetails } = useAppSelector(selectRepoIssues);

  useEffect(() => {
    if (repoUrl) {
      // Очікуємо URL типу https://github.com/owner/repo
      const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) {
        const owner = match[1];
        const repoName = match[2];
        // Завантажуємо issues
        dispatch(fetchIssues({ owner, repo: repoName }))
          .unwrap()
          .then(() => {
            // Завантажуємо додаткові дані про репозиторій (зірки, повна назва)
            dispatch(fetchRepoDetails({ owner, repo: repoName }));
          })
          .catch(() => {
            message.error('Не вдалося завантажити issues');
          });
      } else {
        message.error('Невірний URL репозиторію');
      }
    }
  }, [repoUrl, dispatch]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Верхня панель з назвою репо та кількістю зірок */}
      <Header className="header-container">
        <TopBar repo={repo} repoDetails={repoDetails} />
      </Header>

      {/* Панель для введення URL */}
      <div className="input-bar">
        <RepoInput onLoadRepo={(url) => setRepoUrl(url)} repo={repo} />
      </div>

      <Content style={{ padding: '20px' }}>
        {status === 'loading' && <div>Завантаження...</div>}
        {status === 'succeeded' && issues.length > 0 && (
          <DragDropContextWrapper />
        )}
        {status === 'succeeded' && issues.length === 0 && (
          <div>Немає issues для цього репозиторію.</div>
        )}
        {status === 'failed' && <div>Сталася помилка при завантаженні.</div>}
      </Content>
    </Layout>
  );
};

export default App;
