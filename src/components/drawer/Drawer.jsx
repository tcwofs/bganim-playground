import { IconButton, Drawer, ListItemText, Fade } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './Drawer.style';

const DrawerComponent = () => {
  const classes = useStyles();

  const [checked, setChecked] = useState(true);
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const handleChange = (value) => {
    setChecked(value);
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

  useEffect(() => {
    setTimeout(() => {
      setChecked(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className={classes.menu} onMouseOver={() => handleChange(true)} onMouseOut={() => handleChange(false)}>
        <Fade in={checked}>
          <IconButton onClick={toggleDrawer(true)} disableRipple disableFocusRipple disableTouchRipple style={{ backgroundColor: 'transparent' }}>
            <MenuIcon />
          </IconButton>
        </Fade>
      </div>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
