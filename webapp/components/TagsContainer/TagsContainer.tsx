import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Tag from "../Tag/Tag";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex"
  }
}));

interface TagsContainerProps {
  list: string[];
}
export default ({ list }: TagsContainerProps) => {
  const [colors, setColors] = useState({});
  const classes = useStyles();
  // Generate random colors
  useEffect(() => {
    const generatedColors = list.reduce((prev, acc) => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return { ...prev, [acc]: "#" + randomColor };
    }, {});
    setColors(generatedColors);
  }, [list]);

  return (
    <div className={classes.container}>
      {colors &&
        list.map(tagName => <Tag name={tagName} color={colors[tagName]} />)}
    </div>
  );
};
