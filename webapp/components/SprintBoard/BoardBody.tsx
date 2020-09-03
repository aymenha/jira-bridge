import React, { useCallback, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';

import IssueCardsColumn, { CardsColumnType } from '../IssueCardsColumn/IssueCardsColumn';

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

export default ({ columnsList, onDragEnd }: BoardBodyProps) => {
  const [list, setList]: [CardsColumnType[], Function] = useState(columnsList);
  const classes = useStyles();

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
  return (
    <DragDropContext onDragEnd={onIssueDragEnd}>
      <div className={classes.container}>
        {list.map(column => (
          <IssueCardsColumn
            key={column.id}
            id={column.id}
            list={column.list || []}
            title={column.title}
            onCreate={() => console.log('create card')}
          />
        ))}
      </div>
    </DragDropContext>
  );
};
