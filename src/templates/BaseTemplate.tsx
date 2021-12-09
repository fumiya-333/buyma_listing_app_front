import { VFC, ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: ReactNode
};

/**
 * ベーステンプレートコンポーネント
 * 
 * @returns ベーステンプレート
 */
export const BaseTemplate: VFC<Props> = ({ children }) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {children}
      </Box>
    </>
  );
  
}
