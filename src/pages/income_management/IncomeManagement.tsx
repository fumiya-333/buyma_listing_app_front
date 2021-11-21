import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

export const IncomeManagement = () => {
  return (
    <>
      <Box sx={{ overflow: 'auto' }}>
        <Header />
        <Sidebar />
      </Box>
    </>
  );
}
