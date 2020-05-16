import React from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    color: "#3b5998",
  },
});

export default () => {
  const classes = useStyles();
  return (
    <Box component="span" m={1}>
      <Card>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            ECAD-7533 As a Super-Admin i want to impersonate other trainees
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
