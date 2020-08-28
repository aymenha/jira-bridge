import React, { useCallback } from "react";

import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

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
  //Make the background color lighter than the text color
  const lightenColor = useCallback(
    (color, present) => {
      const num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * present),
        R = (num >> 16) + amt,
        B = ((num >> 8) & 0x00ff) + amt,
        G = (num & 0x0000ff) + amt;
      const result =
        "#" +
        (
          0x1000000 +
          (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
          (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
          (G < 255 ? (G < 1 ? 0 : G) : 255)
        )
          .toString(16)
          .slice(1);
      return result;
    },
    [color]
  );
  return (
    <Chip
      size={size}
      label={name}
      variant="outlined"
      className={classes.tagStyle}
      style={{
        backgroundColor:
          color && color.startsWith("#")
            ? lightenColor(color, 60)
            : color
            ? color
            : "grey",
        color: color && color.startsWith("#") ? color : "white"
      }}
    />
  );
};
