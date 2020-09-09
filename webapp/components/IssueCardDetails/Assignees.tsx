import React from 'react';
import { makeStyles, IconButton, Typography, Button } from '@material-ui/core';
import { Close as CloseIcon, Add as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  listItemsStyle: {
    padding: 0,
    listStyle: 'none'
  },
  addAssigneeButton: {
    width: '100%',
    backgroundColor: 'white',
    color: '#979797'
  }
});

export default ({ assignedTo }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="overline">Assignees</Typography>
      <ul className={classes.listItemsStyle}>
        <li>
          <Button variant="contained" color="default" startIcon={<AddIcon />} className={classes.addAssigneeButton}>
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
