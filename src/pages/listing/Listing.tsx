import { VFC } from 'react';
import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { ListingContents } from './ListingContents';

type Props = {};

/**
 * 出品リスト画面用コンポーネント
 * 
 * @returns 出品リスト画面
 */
export const Listing: VFC<Props> = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Sidebar />
        <ListingContents />
      </Box>
    </>
  );
}
