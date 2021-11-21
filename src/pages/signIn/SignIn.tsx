import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { SignInContents } from './SignInContents';

/**
 * ログイン画面用コンポーネント
 * 
 * @returns ログイン画面
 */
export const SignIn = () => {
  return (
    <>
      <Box sx={{ overflow: 'auto' }}>
        <Header />
        <SignInContents />
      </Box>
    </>
  );
}
