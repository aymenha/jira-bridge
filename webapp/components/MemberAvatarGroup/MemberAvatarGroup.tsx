import React from "react";

import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";

import MemberAvatar from "../MemberAvatar/MemberAvatar";

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 16
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

export interface Member {
  id: number;
  name: string;
  picture?: string;
}
interface AvatarsContainerProps {
  list: Member[];
  maxItems?: number;
  avatarSize?: "small" | "large";
  style?: React.CSSProperties;
}

export default ({
  list,
  maxItems = 4,
  avatarSize = "small",
  style
}: AvatarsContainerProps) => {
  const classes = useStyles();
  return (
    <AvatarGroup
      max={maxItems}
      classes={{
        avatar: classes[avatarSize]
      }}
      style={style}
    >
      {list.map(member =>
        member.picture ? (
          <MemberAvatar
            name={member.name}
            picture={member.picture}
            size={avatarSize}
          />
        ) : (
          <MemberAvatar name={member.name} />
        )
      )}
    </AvatarGroup>
  );
};
