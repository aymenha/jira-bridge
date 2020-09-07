import React from 'react';

import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  size?: 'large' | 'small';
}

export default ({ name, picture, size = 'small' }: MemberAvatarProps) => {
  const classes = useStyles();
  if (picture)
    return (
      <React.Fragment>
        <Avatar alt={name} src={picture} className={classes[size]} />
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <Avatar className={classes[size]}>{name[0].toUpperCase()}</Avatar>
      </React.Fragment>
    );
};
