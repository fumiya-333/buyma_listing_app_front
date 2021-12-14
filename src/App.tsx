import { VFC } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { ReactRoutes } from './ReactRoutes';
import { CssBaseline } from '@mui/material';

type Props = {};

export const App: VFC<Props> = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ReactRoutes/>
    </BrowserRouter>
  );
}