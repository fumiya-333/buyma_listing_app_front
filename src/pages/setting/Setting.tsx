import React from 'react';
import Box from '@mui/material/Box';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

export function Setting() {
  return (
    <React.Fragment>
      <Box sx={{ overflow: 'auto' }}>
        <Header />
        <Sidebar />
      </Box>
    </React.Fragment>
  );
}
