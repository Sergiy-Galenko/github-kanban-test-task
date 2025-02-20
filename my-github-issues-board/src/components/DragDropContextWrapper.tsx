import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import IssueColumn from './IssueColumn';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { moveIssue } from '../store/issuesSlice';

const DragDropContextWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { board, issues } = useAppSelector((state) => state.issues);

  const getIssuesForColumn = (columnId: string) => {
    const issueIds = board[columnId] || [];
    return issueIds
      .map((id) => issues.find((issue) => issue.id.toString() === id))
      .filter((issue) => issue !== undefined) as any[];
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    dispatch(
      moveIssue({
        issueId: draggableId,
        sourceColumn: source.droppableId,
        destColumn: destination.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        <IssueColumn
          columnId="todo"
          title="ToDo"
          issues={getIssuesForColumn('todo')}
        />
        <IssueColumn
          columnId="inProgress"
          title="In Progress"
          issues={getIssuesForColumn('inProgress')}
        />
        <IssueColumn
          columnId="done"
          title="Done"
          issues={getIssuesForColumn('done')}
        />
      </div>
    </DragDropContext>
  );
};

export default DragDropContextWrapper;
