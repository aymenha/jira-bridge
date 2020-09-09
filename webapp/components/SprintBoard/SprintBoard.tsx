import React, { useState, useCallback } from 'react';
import { Member } from '../MemberAvatarGroup/MemberAvatarGroup';
import { CardsColumnType } from '../IssueCardsColumn/IssueCardsColumn';
import BoardHeader from './BoardHeader';
import BoardBody, { onDragEndEvent } from './BoardBody';

interface SprintBoardProps {
  sprintId: number;
  projectId: number;
  columnsList: CardsColumnType[];
  projectMembers: Member[];
  onDragEnd?: onDragEndEvent;
}

export default ({ columnsList, projectMembers, onDragEnd, sprintId, projectId }: SprintBoardProps) => {
  const [members, setMembers] = useState(projectMembers);

  const addMember = useCallback(
    newMember => {
      setMembers([...members, newMember]);
    },
    [projectMembers]
  );
  const removeMember = useCallback(
    id => {
      const index = members.findIndex(item => item.id === id);
      setMembers([...members.splice(index, 1)]);
    },
    [projectMembers]
  );

  return (
    <React.Fragment>
      <BoardHeader columnsList={columnsList} projectMembers={members} />
      <BoardBody columnsList={columnsList} onDragEnd={onDragEnd} sprintId={sprintId} projectId={projectId} />
    </React.Fragment>
  );
};
