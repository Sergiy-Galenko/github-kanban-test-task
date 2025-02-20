import React from 'react';
import { Typography } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import IssueCard from './IssueCard';
import { IIssue } from '../types';

const { Title } = Typography;

interface IssueColumnProps {
  columnId: string;
  title: string;
  issues: IIssue[];
}

const IssueColumn: React.FC<IssueColumnProps> = ({ columnId, title, issues }) => {
  return (
    <div className="column">
      <Title level={4} className="column-title">{title}</Title>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="column-droppable"
          >
            {issues.map((issue, index) => (
              <Draggable key={issue.id.toString()} draggableId={issue.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`draggable-item ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    <IssueCard issue={issue} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default IssueColumn;
