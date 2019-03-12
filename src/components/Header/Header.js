import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
// Components
import Navigation from './Navigation';

const Header = () => (
  <AppBar color="default">
    <Toolbar variant="dense" disableGutters>
      <IconButton aria-label="Open drawer">
        <MenuIcon />
      </IconButton>
      <Navigation />
      <IconButton aria-label="Larivaar Assist">
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;
