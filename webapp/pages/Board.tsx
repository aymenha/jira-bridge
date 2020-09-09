import React, { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_CURRENT_SPRINT, MOVE_ISSUE } from '../gqls';
import SprintBoard from '../components/SprintBoard/SprintBoard';
import { DragDataType } from '../components/SprintBoard/BoardBody';

const Board = function () {
  const { loading, error, data } = useQuery(GET_CURRENT_SPRINT);

  const [mutate] = useMutation(MOVE_ISSUE);

  const columns = useMemo(() => {
    if (data?.getCurrentSprint) {
      return data.getCurrentSprint.configuration.columns.map(column => {
        return {
          id: column,
          title: column,
          list: data.getCurrentSprint.issues.filter(issue => issue.status === column)
        };
      });
    }
    return [];
  }, [data?.getCurrentSprint]);

  const issueByKey = useMemo(() => {
    if (data?.getCurrentSprint) {
      return data.getCurrentSprint.issues.reduce((prev, current) => {
        prev[current.id] = current;
        return prev;
      }, {});
    }
    return [];
  }, [data?.getCurrentSprint]);

  const getTransitionIdFromIssue = useCallback((issue: any, transitionName: string) => {
    const transition = issue.transitions.find(transition => transition.name === transitionName);
    return transition.id;
  }, []);

  const moveIssue = useCallback(
    (data: DragDataType) => {
      const transitionId = getTransitionIdFromIssue(issueByKey[data.cardId], data.destination.id);

      mutate({ variables: { issueId: data.cardId, transitionId } }).catch(console.log);
    },
    [mutate, issueByKey]
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <SprintBoard
      columnsList={columns}
      projectMembers={[]}
      onDragEnd={moveIssue}
      sprintId={data.getCurrentSprint.id}
      projectId={data.getCurrentSprint.board.location.id}
    />
  );
};

export default Board;
