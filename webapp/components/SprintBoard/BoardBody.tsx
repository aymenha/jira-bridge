import React, { useCallback, useState, useEffect } from 'react';
import IssueCardsColumn, { CardsColumnType } from '../IssueCardsColumn/IssueCardsColumn';
import { DragDropContext } from 'react-beautiful-dnd';

interface BoardBodyProps {
  columnsList: CardsColumnType[];
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

export default ({ columnsList }: BoardBodyProps) => {
  const [list, setList] = useState(columnsList);
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
  const onDragEnd = useCallback(
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
        const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);
        const newList = list.map(column => {
          if (`droppable-${column.id}` === source.droppableId) return { ...column, list: result[source.droppableId] };
          else if (`droppable-${column.id}` === destination.droppableId)
            return { ...column, list: result[destination.droppableId] };
          else return column;
        });
        setList(newList);
      }
    },
    [list]
  );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
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
