import { VFC } from 'react';
import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

type Props = {};

export const Contacts: VFC<Props> = () => {
  return (
    <>
      <Box sx={{ overflow: 'auto' }}>
        <Header />
        <Sidebar />
      </Box>
    </>
  );
}
