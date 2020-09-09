import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles, Typography, Button, Checkbox, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  subTaskContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  listItemsStyle: {
    padding: 0,
    listStyle: 'none'
  },
  title: {
    color: '#979797',
    fontWeight: 'bold'
  }
});

export default ({ subTasks }) => {
  const classes = useStyles();
  const [tasksList, setTasksList] = useState(subTasks);
  const [newTaskSummary, setNewTaskSummary]: [string, Function] = useState('');

  useEffect(() => {
    if (subTasks && subTasks.length > 0) {
      setTasksList(subTasks);
    }
  }, [subTasks]);

  const addSubtTask = useCallback(() => {
    setTasksList([...tasksList, { summary: newTaskSummary, status: 'To Do', id: `${tasksList.length + 1}` }]);
    setNewTaskSummary('');
  }, [tasksList, newTaskSummary, subTasks]);

  const onCheck = useCallback(
    (event, id) => {
      setTasksList(
        [...tasksList].map(task => {
          if (task.id === id) return { ...task, status: event.target.checked ? 'Done' : 'To Do' };
          else return task;
        })
      );
    },
    [tasksList]
  );

  return (
    <div>
      <Typography variant="overline" className={classes.title}>
        Checklist
      </Typography>
      <ul className={classes.listItemsStyle}>
        {tasksList &&
          tasksList.map((task, index) => {
            const id = task.id || index.toString();
            return (
              <li key={id} className={classes.subTaskContainer}>
                <Checkbox checked={task.status === 'Done'} onChange={event => onCheck(event, id)} />
                <Typography> {task.summary}</Typography>
              </li>
            );
          })}
        <li>
          <TextField
            placeholder=" New task"
            value={newTaskSummary}
            onChange={event => setNewTaskSummary(event.target.value)}
          />
          <Button color="primary" variant="outlined" disabled={!newTaskSummary} onClick={addSubtTask}>
            Add
          </Button>
        </li>
      </ul>
    </div>
  );
};
