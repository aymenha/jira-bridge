import React from 'react';
import { Modal, makeStyles, IconButton, Grid, Checkbox, Typography, Button } from '@material-ui/core';
import { Close as CloseIcon, Add as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  container: {
    color: 'black',
    backgroundColor: 'white',
    margin: 'auto'
  },
  settingsContainer: {
    backgroundColor: '#f0f2f1',
    color: '#707070',
    padding: 10
  },
  informationContainer: {
    padding: 10
  },
  subTaskContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  listItemsStyle: {}
});

const Assignees = ({ assignedTo }) => {
  const classes = useStyles();

  return (
    <div>
      <p>Assignees</p>
      <ul className={classes.listItemsStyle}>
        <li>
          <Button variant="contained" color="default" startIcon={<AddIcon />}>
            Add assignee
          </Button>
        </li>
        {assignedTo &&
          assignedTo.map(assignee => (
            <li>
              <div>
                <img alt="" />
              </div>
              <div>{assignee.name}</div>
              <div>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

const IssueSubTasks = ({ subTasks }) => {
  const classes = useStyles();

  if (!subTasks?.length) {
    return null;
  }

  return (
    <div>
      <p>Checklist</p>
      <ul>
        {subTasks.map(task => (
          <li key={task.id} className={classes.subTaskContainer}>
            <Checkbox checked={task.isCompleted} /> <Typography> {task.summary}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ({ isOpen, issue, handleClose }) => {
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="issue-card-details"
      aria-describedby="issue-card-details-description">
      <Grid container className={classes.container} spacing={0}>
        <Grid item xs={8} className={classes.informationContainer}>
          <h2>{issue.summary}</h2>
          <p>{issue.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Typography>Due date</Typography>
              <Typography>{issue.dueDate || 'N/A'}</Typography>
            </div>
            <div>
              <Typography>Author</Typography>
              <Typography>{issue.authorName}</Typography>

              <Typography>Reporter</Typography>
              <Typography>{issue.reporterName}</Typography>
            </div>
          </div>
          <IssueSubTasks subTasks={issue.subTasks} />
        </Grid>
        <Grid item xs={4} className={classes.settingsContainer}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Assignees assignedTo={issue.assignedTo} />
        </Grid>
      </Grid>
    </Modal>
  );
};
