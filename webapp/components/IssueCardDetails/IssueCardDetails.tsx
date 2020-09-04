import React, { useState, useCallback } from 'react';

import {
  Modal,
  makeStyles,
  IconButton,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core';
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import IssueSubtasks from './IssueSubtasks';
import Assignees from './Assignees';
import { Member } from '../MemberAvatarGroup/MemberAvatarGroup';
import { IssueCardType } from '../IssueCard/IssueCard';

const useStyles = makeStyles({
  modalContainer: {
    height: '100%',
    border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    color: 'black',
    width: '90%',
    border: 'none'
  },
  informationContainer: {
    backgroundColor: 'white',
    padding: 10
  },
  summaryContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  settingsContainer: {
    backgroundColor: '#f0f2f1',
    color: '#707070',
    padding: 10
  },

  title: {
    color: '#979797',
    fontWeight: 'bold'
  },
  closeIcon: {
    color: '#979797'
  }
});

interface IssueCardDetailsProps {
  isOpen: boolean;
  issue: IssueCardType;
  handleClose: () => void;
  projectMembers: Member[];
  onUpdate: (updatedIssue: IssueCardType) => void;
}

export default ({ isOpen, issue, handleClose, projectMembers, onUpdate }: IssueCardDetailsProps) => {
  const [issueDetails, setIssueDetails] = useState(issue);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(Date.now());

  const handleDateChange = useCallback(
    date => {
      setIssueDetails({ ...issueDetails, dueDate: date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() });
      setSelectedDate(date);
    },
    [issueDetails, selectedDate]
  );

  const update = useCallback(() => {
    setIsEditing(false);
    onUpdate && onUpdate(issueDetails);
  }, [isEditing, issueDetails]);

  const classes = useStyles();
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modalContainer}
      aria-labelledby="issue-card-details"
      aria-describedby="issue-card-details-description">
      <Grid container className={classes.container} direction="row">
        <Grid item xs={8} className={classes.informationContainer}>
          <div className={classes.summaryContainer}>
            {isEditing ? (
              <TextField
                value={issueDetails.summary}
                onChange={e => setIssueDetails({ ...issue, summary: e.target.value })}
              />
            ) : (
              <h1>{issueDetails.summary}</h1>
            )}
            <IconButton color="primary" aria-label="Edit" component="span" onClick={() => setIsEditing(!isEditing)}>
              <EditIcon className={classes.closeIcon} />
            </IconButton>
          </div>
          {isEditing ? (
            <TextField
              multiline
              value={issueDetails.description}
              onChange={e => setIssueDetails({ ...issueDetails, description: e.target.value })}
            />
          ) : (
            <p>{issueDetails.description}</p>
          )}
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <div>
                <Typography variant="overline" className={classes.title}>
                  Due date
                </Typography>
              </div>
              {isEditing ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
              ) : (
                <Typography>{issueDetails.dueDate || 'N/A'}</Typography>
              )}
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Typography variant="overline" className={classes.title}>
                Author
              </Typography>
              <Typography>{issueDetails.authorName}</Typography>
              <Typography variant="overline" className={classes.title}>
                Reporter
              </Typography>
              {isEditing ? (
                <div>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={issueDetails.reporterName}
                    onChange={event =>
                      setIssueDetails({ ...issueDetails, reporterName: event.target.value as string })
                    }>
                    <MenuItem value={issueDetails.reporterName}>{issueDetails.reporterName}</MenuItem>
                    {projectMembers &&
                      projectMembers.map((member, index) => (
                        <MenuItem key={index.toString()} value={member.name}>
                          {member.name}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              ) : (
                <Typography>{issueDetails.reporterName}</Typography>
              )}
            </Grid>
          </Grid>
          <IssueSubtasks subTasks={issue.subTasks} />
          {isEditing && (
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={update}>
                Update
              </Button>
            </div>
          )}
        </Grid>
        <Grid item xs={4} className={classes.settingsContainer}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClose}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </div>
          <Assignees assignedTo={issue.assignedTo} />
        </Grid>
      </Grid>
    </Modal>
  );
};
