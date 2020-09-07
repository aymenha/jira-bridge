import React, { useState, useCallback } from 'react';
import { Card, Typography, CardContent, makeStyles, Avatar, capitalize, TextField } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import { useMutation } from '@apollo/client';

import { UPDATE_ISSUE } from '../../gqls/mutation';
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

interface Task {
  summary: string;
  author: Member;
  isCompleted: boolean;
}

export interface IssueCardType {
  id: string;
  summary: string;
  description: string | null;
  tags?: string[];
  createdAt: string;
  dueDate: string | null;
  authorName: string;
  reporterName?: string;
  assignedTo?: Member[];
  subTasks?: Task[];
  projectMembers?: Member[];
}

interface IssueCardProps extends IssueCardType {
  onClick: () => void;
  key?: string;
  index?: number;
  setNewIssueSummary: (summary: string) => void;
}

export default ({
  id,
  summary,
  description,
  index,
  tags = [],
  assignedTo = [],
  createdAt,
  dueDate,
  authorName,
  reporterName,
  subTasks = [],
  projectMembers,
  setNewIssueSummary
}: IssueCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();

  const onSummaryValidation = useCallback(
    e => {
      if (e.keyCode == 13 || e.type === 'blur') {
        setNewIssueSummary(e.target.value);
      }
    },
    [setNewIssueSummary]
  );

  const onCompleted = useCallback(() => {
    console.log('issue updated');
  }, []);

  const onError = useCallback(error => {
    console.log(error);
  }, []);

  const [mutate] = useMutation(UPDATE_ISSUE, { onCompleted, onError });

  const onClick = useCallback(() => {
    setIsModalOpen(true);
  }, [isModalOpen]);

  const updateIssue = useCallback(data => {
    const { id, summary, description, dueDate } = data;

    setIsModalOpen(false);
    mutate({ variables: { issueId: id, input: { summary, description, dueDate } } });
  }, []);

  return (
    <>
      <Draggable draggableId={`draggable-${id}`} index={index} type="ISSUE">
        {provided => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Card className={classes.cardContainer} onClick={onClick}>
              <CardContent>
                {summary ? (
                  <Typography className={classes.title} color="textSecondary" gutterBottom variant="h6">
                    {capitalize(summary)}
                  </Typography>
                ) : (
                  <TextField
                    autoFocus
                    onKeyDown={onSummaryValidation}
                    placeholder="issue name"
                    onBlur={onSummaryValidation}
                  />
                )}
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
        projectMembers={projectMembers || []}
        onUpdate={updateIssue}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        issue={{ id, summary, description, authorName, reporterName, createdAt, dueDate, subTasks }}
      />
    </>
  );
};
