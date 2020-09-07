import React, { useCallback, useState } from 'react';

import { Button, Typography, makeStyles, MenuItem, IconButton, Menu, Chip, capitalize } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Droppable } from 'react-beautiful-dnd';

import IssueCard from '../IssueCard/IssueCard';

const useStyles = makeStyles({
  columnBody: {
    minHeight: 400,
    minWidth: 220,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  cardsContainer: {
    flex: 1
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  headerText: {
    color: '#444547',
    marginRight: 5
  },
  moreIconContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
  },
  moreIcon: {
    color: '#9d9ea2'
  },
  createButton: {
    width: '100%',
    textTransform: 'none',
    color: 'grey',
    padding: 10,
    marginTop: 35,
    borderRadius: 10
  },
  emptyList: {
    margin: 0,
    marginTop: 20,
    padding: '60px 0px',
    width: '100%',
    textAlign: 'center',
    border: '1px dashed ',
    backgroundColor: '#dfe6e9',
    color: '#444547'
  }
});
export interface CardsColumnType {
  id: number;
  title: string;
  list?: any[];
  index?: number;
}
interface IssueCardsColumnProps extends CardsColumnType {
  onCreate: () => void;
  setNewIssueSummary: (summary: string) => void;
}

export default ({ title, list, onCreate, setNewIssueSummary }: IssueCardsColumnProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const classes = useStyles();
  const onCardClick = useCallback(() => {}, []);
  const handleMenuButtonClick = useCallback(
    e => {
      setAnchorEl(e.currentTarget);
      setIsMenuOpen(true);
    },
    [isMenuOpen, anchorEl]
  );
  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, [isMenuOpen]);
  return (
    <div>
      <div className={classes.headerContainer}>
        <Typography variant="h5" className={classes.headerText}>
          {capitalize(title)}
        </Typography>
        {list && <Chip size="medium" label={list.length} />}
        <div className={classes.moreIconContainer}>
          <IconButton aria-label="more" component="span" onClick={handleMenuButtonClick}>
            <MoreHorizIcon className={classes.moreIcon} />
          </IconButton>
          {isMenuOpen && (
            <Menu
              anchorEl={anchorEl}
              id="simple-menu"
              keepMounted
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}>
              <MenuItem onClick={handleMenuClose}>item 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>item 2</MenuItem>
              <MenuItem onClick={handleMenuClose}>item 3</MenuItem>
            </Menu>
          )}
        </div>
      </div>
      <Droppable droppableId={`droppable-${title}`} type="ISSUE">
        {provided => (
          <div className={classes.columnBody} ref={provided.innerRef} {...provided.droppableProps}>
            <div className={classes.cardsContainer}>
              {list && list.length > 0 ? (
                list.map((issue, index) => (
                  <IssueCard
                    index={index}
                    id={issue.id}
                    key={issue.id}
                    summary={issue.summary}
                    description={issue.description}
                    tags={issue.tags}
                    onClick={onCardClick}
                    assignedTo={issue.assignedTo}
                    authorName={issue.author.displayName}
                    reporterName={issue.reporter?.displayName}
                    createdAt={issue.createdAt}
                    dueDate={issue.dueDate}
                    subTasks={issue.subTasks}
                    setNewIssueSummary={setNewIssueSummary}
                  />
                ))
              ) : (
                <p className={classes.emptyList}>Drop new issues here</p>
              )}
            </div>
            <Button
              className={classes.createButton}
              variant="contained"
              color="default"
              onClick={onCreate}
              startIcon={<AddIcon />}>
              Create
            </Button>
          </div>
        )}
      </Droppable>
    </div>
  );
};
