import React from "react";

import {
  Box,
  ButtonBase,
  Card,
  Typography,
  CardContent,
  makeStyles,
  Avatar,
  capitalize
} from "@material-ui/core";

import TagsContainer from "../TagsContainer/TagsContainer";
import MemberAvatarGroup, {
  Member
} from "../MemberAvatarGroup/MemberAvatarGroup";

const useStyles = makeStyles({
  title: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 10
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center"
  },
  cardContainer: {
    boxShadow: "2px 21px 19px -4px rgba(138,138,138,0.79)",
    borderRadius: 12
  },
  buttonRoot: {
    display: "block",
    textAlign: "inherit",
    width: "100%",
    justifyContent: "flex-start"
  }
});

export interface IssueCardType {
  title: string;
  tags?: string[];
  assignedTo?: Member[];
}
interface IssueCardProps extends IssueCardType {
  onClick: () => void;
}

export default ({ title, tags, assignedTo, onClick }: IssueCardProps) => {
  const classes = useStyles();
  return (
    <Box component="span" m={1}>
      <ButtonBase
        onClick={onClick}
        classes={{
          root: classes.buttonRoot
        }}
      >
        <Card className={classes.cardContainer}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {capitalize(title)}
            </Typography>
            <div
              className={classes.actionsContainer}
              style={{
                justifyContent:
                  tags && tags.length > 0 ? "space-between" : "flex-end"
              }}
            >
              {tags && <TagsContainer list={tags} />}
              {assignedTo && assignedTo.length > 0 ? (
                <MemberAvatarGroup list={assignedTo} />
              ) : (
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
              )}
            </div>
          </CardContent>
        </Card>
      </ButtonBase>
    </Box>
  );
};
