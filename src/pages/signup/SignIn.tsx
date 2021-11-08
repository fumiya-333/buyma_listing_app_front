import React from 'react';
import Box from '@mui/material/Box';
import { Header } from '../../components/Header';
import { SignInContents } from './SignInContents';

export function SignIn() {
  return (
    <React.Fragment>
      <Box sx={{ overflow: 'auto' }}>
        <Header />
        <SignInContents />
      </Box>
    </React.Fragment>
  );
}
