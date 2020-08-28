import React from "react";

import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

interface MemberAvatarProps {
  name: string;
  picture?: string;
  size?: "large" | "small";
}

export default ({ name, picture, size = "small" }: MemberAvatarProps) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {picture ? (
        <Avatar
          alt={name}
          src={picture}
          className={size === "large" ? classes.large : classes.small}
        />
      ) : (
        <Avatar className={size === "large" ? classes.large : classes.small}>
          {name[0].toUpperCase()}
        </Avatar>
      )}
    </React.Fragment>
  );
};
