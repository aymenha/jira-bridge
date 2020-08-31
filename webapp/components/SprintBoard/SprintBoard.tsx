import React, { useState, useEffect, useCallback } from "react";
import { Member } from "../MemberAvatarGroup/MemberAvatarGroup";
import { CardsColumnType } from "../IssueCardsColumn/IssueCardsColumn";
import BoardHeader from "./BoardHeader";
import BoardBody from "./BoardBody";

interface SprintBoardProps {
  columnsList: CardsColumnType[];
  projectMembers: Member[];
}
export default ({ columnsList, projectMembers }: SprintBoardProps) => {
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
      <BoardHeader
        onSearch={searchText => console.log(searchText)}
        projectMembers={members}
        onAddMember={addMember}
        onRemoveMember={removeMember}
      />
      <BoardBody columnsList={columnsList} />
    </React.Fragment>
  );
};
