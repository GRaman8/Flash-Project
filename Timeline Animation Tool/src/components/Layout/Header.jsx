import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Timeline Animation Tool
        </Typography>
        <Typography variant="caption" sx={{ mr: 2 }}>
          Phase 1 & 2: Canvas Editor + Timeline System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;