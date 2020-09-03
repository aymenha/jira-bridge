import React, { useState, useCallback } from 'react';
import { Card, Typography, CardContent, makeStyles, Avatar, capitalize } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

import TagsContainer from '../TagsContainer/TagsContainer';
import MemberAvatarGroup, { Member } from '../MemberAvatarGroup/MemberAvatarGroup';
import IssueCardDetails from '../IssueCardDetails/IssueCardDetails';

const useStyles = makeStyles({
  title: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  cardContainer: {
    boxShadow: '2px 21px 19px -4px rgba(138,138,138,0.79)',
    borderRadius: 12
  },
  buttonRoot: {
    display: 'block',
    textAlign: 'inherit',
    width: '100%',
    justifyContent: 'flex-start'
  }
});
interface SubTask {
  title: string;
  onwer: Member;
  isCompleted: boolean;
}
export interface IssueCardType {
  id: number;
  summary: string;
  tags?: string[];
  assignedTo?: Member[];
  subTasks?: SubTask[];
}
interface IssueCardProps extends IssueCardType {
  onClick: () => void;
  key?: string;
  index?: number;
}

export default ({ summary, id, index, tags = [], assignedTo = [], subTasks = [] }: IssueCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();

  const onClick = useCallback(() => {
    setIsModalOpen(true);
  }, [isModalOpen]);
  return (
    <>
      <Draggable draggableId={`draggable-${id}`} index={index} type="ISSUE">
        {provided => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Card className={classes.cardContainer} onClick={onClick}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom variant="h6">
                  {capitalize(summary)}
                </Typography>
                <div
                  className={classes.actionsContainer}
                  style={{
                    justifyContent: tags && tags.length > 0 ? 'space-between' : 'flex-end'
                  }}>
                  {tags && <TagsContainer list={tags} />}
                  {assignedTo && assignedTo.length > 0 ? (
                    <MemberAvatarGroup list={assignedTo} />
                  ) : (
                    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
      <IssueCardDetails
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        issue={{ summary, id, assignedTo, subTasks }}
      />
    </>
  );
};
