import { VFC } from 'react';
import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

type Props = {};

export const Listing: VFC<Props> = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Sidebar />
      </Box>
    </>
  );
}
