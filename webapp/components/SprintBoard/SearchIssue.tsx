import React, { useState, useEffect, useCallback } from 'react';

import {
  IconButton,
  makeStyles,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Typography,
  Tabs,
  Tab,
  Grid,
  Modal
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import { CardsColumnType } from '../IssueCardsColumn/IssueCardsColumn';
import { IssueCardType } from '../IssueCard/IssueCard';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
    textAlign: 'center'
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  searchIcon: {
    color: 'gray'
  }
}));

interface SearchModalProps {
  columnsList: CardsColumnType[];
}

interface AllIssuesType extends IssueCardType {
  status: string;
}
export default ({ columnsList }: SearchModalProps) => {
  const classes = useStyles();
  const [issuesList, setIssuesList]: [AllIssuesType[] | [], Function] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = React.useState('All');
  useEffect(() => {
    if (columnsList && columnsList.length > 0) {
      const allIssues = columnsList.reduce((prev: any[], curr) => {
        if (curr.list) return [...prev, ...curr.list.map(item => ({ ...item, status: curr.title }))];
        else return [prev];
      }, []);
      if (allIssues.length > 0) {
        setIssuesList(allIssues);
      }
    }
  }, [columnsList]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filtredIssuesList = useCallback(() => {
    if (tabValue != 'All')
      return issuesList
        .filter(item => item.status === tabValue)
        .filter(item => item.summary.toUpperCase().includes(searchText.toUpperCase()));
    else return issuesList.filter(item => item.summary.toUpperCase().includes(searchText.toUpperCase()));
  }, [issuesList, tabValue, searchText]);

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen}>
        <SearchIcon></SearchIcon>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.container}>
          <Grid container>
            <Grid item xs={6} className={classes.searchContainer}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                autoFocus
                value={searchText}
                placeholder="Search by name …"
                inputProps={{ 'aria-label': 'search' }}
                onChange={event => setSearchText(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
              <Tab label="All" value="All" />
              {columnsList.map((column, index) => (
                <Tab key={index.toString()} label={column.title} value={column.title} />
              ))}
            </Tabs>
          </Paper>
          <List style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {issuesList &&
              filtredIssuesList().map(issue => {
                return (
                  <ListItem key={issue.id} alignItems="flex-start" style={{ width: '50%' }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={issue.summary}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="caption" color="textPrimary">
                            {issue.status}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
          </List>
        </div>
      </Modal>
    </React.Fragment>
  );
};
