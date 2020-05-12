import { Divider, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './Home.styles';

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.homeArea}>
      <div className={classes.homeText}>
        <Typography variant="h3" color="error">
          about
        </Typography>
        <Divider variant="middle" />
        <Typography className={classes.mainText} color="primary">
          this is small project where i put my ideas for background animations
        </Typography>
      </div>
    </div>
  );
};

export default Home;
