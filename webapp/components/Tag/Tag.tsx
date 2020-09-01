import React, { useCallback } from "react";

import { lighten, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  tagStyle: {
    fontWeight: "bold",
    border: "none",
    marginRight: 5
  }
}));

interface TagProps {
  name: string;
  color?: string; // Hex
  size?: "small" | "medium";
}

export default ({ name, color, size = "small" }: TagProps) => {
  const classes = useStyles();
  return (
    <Chip
      size={size}
      label={name}
      variant="outlined"
      className={classes.tagStyle}
      style={{
        backgroundColor:
          color && color.startsWith("#")
            ? lighten(color, 60)
            : color
            ? color
            : "grey",
        color: color && color.startsWith("#") ? color : "white"
      }}
    />
  );
};
