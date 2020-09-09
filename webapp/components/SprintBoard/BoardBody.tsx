import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { useMutation } from '@apollo/client';

import IssueCardsColumn, { CardsColumnType } from '../IssueCardsColumn/IssueCardsColumn';
import { GET_CURRENT_SPRINT, CREATE_ISSUE } from '../../gqls';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

interface DroppableColumn {
  id: string;
  index: number;
}

export interface DragDataType {
  cardId: string;
  source: DroppableColumn;
  destination: DroppableColumn;
}

export type onDragEndEvent = (data: DragDataType) => void;

interface BoardBodyProps {
  sprintId: number;
  projectId: number;
  columnsList: CardsColumnType[];
  onDragEnd?: onDragEndEvent;
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default ({ columnsList, onDragEnd, sprintId, projectId }: BoardBodyProps) => {
  const [list, setList]: [CardsColumnType[], Function] = useState(columnsList);
  const classes = useStyles();

  const update = useCallback((cache, { data: { createIssue } }) => {
    const { getCurrentSprint } = cache.readQuery({ query: GET_CURRENT_SPRINT });
    const currentSprint = { ...getCurrentSprint, issues: [...getCurrentSprint.issues, createIssue] };

    cache.writeQuery({ query: GET_CURRENT_SPRINT, data: { getCurrentSprint: currentSprint } });

    return cache;
  }, []);

  const [mutate] = useMutation(CREATE_ISSUE, { update });

  useEffect(() => {
    setList(columnsList);
  }, [columnsList]);

  const getList = useCallback(
    id => {
      const column = list.find(column => `droppable-${column.id}` === id);
      if (column) return column.list;
    },
    [list]
  );
  const onIssueDragEnd = useCallback(
    result => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        if (source.index === destination.index) {
          return;
        } else {
          const items = reorder(getList(source.droppableId), source.index, destination.index);
          const newList = list.map(column => {
            if (`droppable-${column.id}` === source.droppableId) return { ...column, list: items };
            else return column;
          });
          setList(newList);
        }
      } else {
        const moveResult = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
        const newList = list.map(column => {
          if (`droppable-${column.id}` === source.droppableId)
            return { ...column, list: moveResult[source.droppableId] };
          else if (`droppable-${column.id}` === destination.droppableId)
            return { ...column, list: moveResult[destination.droppableId] };
          else return column;
        });
        setList(newList);

        const dragData: DragDataType = {
          cardId: result.draggableId.replace('draggable-', ''),
          source: {
            id: result.source.droppableId.replace('droppable-', ''),
            index: result.source.index
          },
          destination: {
            id: result.destination.droppableId.replace('droppable-', ''),
            index: result.destination?.index
          }
        };

        onDragEnd && onDragEnd(dragData);
      }
    },
    [list]
  );
  const onCreate = useCallback(
    index => {
      setList(
        list.map((column, i) => {
          if (i === index && column.list) {
            const tempID = Date.now().toString();
            return { ...column, list: [...column.list, { id: tempID, summary: '' }] };
          } else return column;
        })
      );
    },
    [list]
  );

  const setNewIssueSummary = useCallback(
    (summary, index) => {
      let columnsList = [...list];
      let issuesList = columnsList[index].list;
      if (issuesList) {
        const lastIndex = issuesList.length - 1;
        if (summary) {
          //Add summary to new created card
          issuesList[lastIndex] = { ...issuesList[lastIndex], summary };

          mutate({
            variables: {
              input: {
                summary,
                projectId,
                sprintId,
                issueTypeName: 'Task',
                statusName: columnsList[index].id
              }
            }
          }).catch(console.log);
        } else {
          //delete new created card when summary is empty
          issuesList.splice(lastIndex, 1);
        }
        columnsList[index].list = [...issuesList];
        setList(columnsList);
      }
    },
    [list]
  );

  return (
    <DragDropContext onDragEnd={onIssueDragEnd}>
      <div className={classes.container}>
        {list.map((column, index) => (
          <IssueCardsColumn
            key={column.id}
            id={column.id}
            list={column.list || []}
            title={column.title}
            onCreate={() => onCreate(index)}
            setNewIssueSummary={summary => setNewIssueSummary(summary, index)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};
