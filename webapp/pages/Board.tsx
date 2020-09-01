import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { GET_CURRENT_SPRINT } from '../gqls/queries';
import SprintBoard from '../components/SprintBoard/SprintBoard';

const Board = function () {
  const { loading, error, data } = useQuery(GET_CURRENT_SPRINT);

  const issuesByStatusKey = useMemo(() => {
    return (data?.getCurrentSprint.issues || [])
      .filter(issue => issue.type !== 'Sub-task')
      .reduce(
        (accumulator, current) => {
          accumulator[current.status].push(current);
          return accumulator;
        },
        { 'To Do': [], 'In Progress': [], Done: [] }
      );
  }, [data?.getCurrentSprint]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <SprintBoard
      columnsList={[
        { id: 1, title: 'To Do', list: issuesByStatusKey['To Do'] },
        { id: 2, title: 'In Progress', list: issuesByStatusKey['In Progress'] },
        { id: 3, title: 'Done', list: issuesByStatusKey['Done'] }
      ]}
      projectMembers={[]}
    />
  );
};

export default Board;
