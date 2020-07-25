import { Button, Drawer, ListItemText } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './Drawer.style';

const DrawerComponent = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: false,
      })}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to='/'>
          <ListItemText primary='/home/' />
        </ListItem>
        <ListItem button component={Link} to='/particles'>
          <ListItemText primary='/particles/' />
        </ListItem>
        <ListItem button component={Link} to='/simple-cube'>
          <ListItemText primary='/simplecube/' />
        </ListItem>
        <ListItem button component={Link} to='/nebula'>
          <ListItemText primary='/nebula/' />
        </ListItem>
        <ListItem button component={Link} to='/rain'>
          <ListItemText primary='/rain/' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <div className={classes.menu}>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
      </div>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerComponent;
