import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function Header() {
  return (
    <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
                外注管理システム
            </Typography>
        </Toolbar>
    </AppBar>
  );
}
