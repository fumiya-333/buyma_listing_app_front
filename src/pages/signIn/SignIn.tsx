import { VFC } from 'react';
import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { SignInContents } from './SignInContents';

type Props = {};

/**
 * ログイン画面用コンポーネント
 * 
 * @returns ログイン画面
 */
export const SignIn: VFC<Props> = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Header/>
        <SignInContents />
      </Box>
    </>
  );
}
