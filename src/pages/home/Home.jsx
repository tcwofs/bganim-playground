import { Divider, Link, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './Home.styles';

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.homeArea}>
      <div className={classes.homeText}>
        <Typography variant='h3' color='error'>
          about
        </Typography>
        <Divider variant='middle' />
        <Typography className={classes.mainText} color='primary'>
          this is small project where i put my ideas or tutorials for background animations.
          <br />
          <br />
          <Link href='https://codepen.io/LeonGr/pen/yginI' target='_blank' color='secondary'>
            /particles/
          </Link>
          <br />
          <Link href='https://redstapler.co/cool-nebula-background-effect-three-js/' target='_blank' color='secondary'>
            /nebula/
          </Link>
          <br />
          <Link href='https://redstapler.co/three-js-realistic-rain-tutorial/' target='_blank' color='secondary'>
            /rain/
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Home;
