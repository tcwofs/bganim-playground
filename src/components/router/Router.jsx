import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Cube, Home, Particles } from '../../pages';
import Drawer from '../drawer/Drawer';
import { useStyles } from './Router.styles';

const RouterComponent = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.content}>
        <Drawer />
        <Switch>
          <Route path="/simple-cube" component={Cube} exact />
          <Route path="/particles" component={Particles} exact />
          <Route component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default RouterComponent;
