import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Box
      component={Container}
      className={classes.root}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div>Welcome</div>
    </Box>
  );
};

export default Home;
