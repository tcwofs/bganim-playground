import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Routes, { Home } from '../../pages';
import Drawer from '../drawer/Drawer';
import { useStyles } from './Router.styles';

const RouterComponent = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.content}>
        <Drawer />
        <Switch>
          {Object.entries(Routes).map(([key, value]) => (
            <Route path={`/${key.toLowerCase()}`} component={value} exact key={key} />
          ))}
          <Route component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default RouterComponent;
