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
    <div style={{ margin: '0 8px', flex: 1 }}>
      <Title level={4}>{title}</Title>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: '500px',
              background: '#f0f2f5',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            {issues.map((issue, index) => (
              <Draggable key={issue.id.toString()} draggableId={issue.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      marginBottom: '8px',
                      ...provided.draggableProps.style,
                    }}
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
