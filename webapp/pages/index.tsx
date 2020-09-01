import React from 'react';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';

import client from '../apolloClient';
import Board from './Board';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh'
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <Box component={Container} className={classes.root} display="flex" alignItems="center" justifyContent="center">
        <Board />
      </Box>
    </ApolloProvider>
  );
};

export default Home;
