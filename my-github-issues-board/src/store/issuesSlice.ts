import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IIssue } from '../types';
import { fetchIssuesFromGitHub } from '../services/githubService';

interface Repo {
  owner: string;
  name: string;
}

interface BoardState {
  [columnId: string]: string[];
}

interface IssuesState {
  repo: Repo | null;
  issues: IIssue[];
  board: BoardState;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const LOCAL_STORAGE_KEY = 'issuesBoardState';


const loadPersistedState = (): BoardState | null => {
  const state = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (state) {
    return JSON.parse(state);
  }
  return null;
};

const saveState = (board: BoardState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(board));
};

const initialState: IssuesState = {
  repo: null,
  issues: [],
  board: {
    todo: [],
    inProgress: [],
    done: [],
  },
  status: 'idle',
  error: null,
};

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async ({ owner, repo }: { owner: string; repo: string }) => {
    const issues = await fetchIssuesFromGitHub(owner, repo);
    return { issues, repo: { owner, name: repo } };
  }
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    moveIssue: (
      state,
      action: PayloadAction<{
        issueId: string;
        sourceColumn: string;
        destColumn: string;
        sourceIndex: number;
        destIndex: number;
      }>
    ) => {
      const { issueId, sourceColumn, destColumn, sourceIndex, destIndex } = action.payload;
      state.board[sourceColumn].splice(sourceIndex, 1);
      state.board[destColumn].splice(destIndex, 0, issueId);
      saveState(state.board);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.issues = action.payload.issues;
      state.repo = action.payload.repo;
      const persisted = loadPersistedState();
      if (persisted) {
        state.board = persisted;
      } else {
        // Ініціалізація колонок на основі стану issue
        const todo: string[] = [];
        const inProgress: string[] = [];
        const done: string[] = [];
        action.payload.issues.forEach((issue) => {
          if (issue.state === 'closed') {
            done.push(issue.id.toString());
          } else if (issue.state === 'open') {
            if (issue.assignee) {
              inProgress.push(issue.id.toString());
            } else {
              todo.push(issue.id.toString());
            }
          }
        });
        state.board = { todo, inProgress, done };
        saveState(state.board);
      }
    });
    builder.addCase(fetchIssues.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Помилка завантаження';
    });
  },
});

export const { moveIssue } = issuesSlice.actions;
export const selectRepoIssues = (state: { issues: IssuesState }) => state.issues;
export default issuesSlice.reducer;
